package nquire.websocket

import grails.util.Environment
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.servlet.ServletContext
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.annotation.WebListener
import javax.websocket.CloseReason
import javax.websocket.OnClose
import javax.websocket.OnError
import javax.websocket.OnMessage
import javax.websocket.OnOpen
import javax.websocket.Session
import javax.websocket.server.ServerContainer
import javax.websocket.server.ServerEndpoint

@ServerEndpoint("/lecture")
@WebListener
class LectureEndpoint implements ServletContextListener {

    private static Map<Integer, LectureHandler> lectures = new HashMap<>()
    private static Map<Session, LectureHandler> lecturesByUser = new HashMap<>()
    private static List<Session> unassignedUsers = new ArrayList<>()

    @Override
    void contextInitialized(ServletContextEvent sce) {
        ServletContext servletContext = sce.servletContext
        ServerContainer serverContainer = servletContext.getAttribute("javax.websocket.server.ServerContainer")

        try {
            // Necessary to make Grails add endpoint in development
            if(Environment.current == Environment.DEVELOPMENT)
                serverContainer.addEndpoint(LectureEndpoint)
        } catch(IOException e) {
            // TODO Print error in some way
        }
    }

    @Override
    void contextDestroyed(ServletContextEvent sce) {
    }

    @OnOpen
    public void onOpen(Session userSession) {
        unassignedUsers.add(userSession)
    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
        if(unassignedUsers.contains(userSession)) {
            // User is not assigned to a lecture - check if this is a connect message
            def mObject = new JsonSlurper().parseText(message)

            if(mObject.type == "connect") {
                if(!lectures.containsKey(mObject.lectureId)) {
                    // Lecture does not exist
                    String msg = JsonOutput.toJson([type: 'error',
                                                    code: 404,
                                                    message: 'No lecture with the provided ID exists!'])
                    userSession.getBasicRemote().sendText(msg)
                    return
                }

                if(mObject.role == "student") {
                    lectures.get(mObject.lectureId).addStudent(userSession)
                } else if(mObject.role == "lecturer") {
                    if(!lectures.get(mObject.lectureId).addLecturer(userSession, mObject.token)) {
                        String msg = JsonOutput.toJson([type: 'error',
                                                        code: 403,
                                                        message: 'The provided token did not authenticate against the lecture.'])
                        userSession.getBasicRemote().sendText(msg)
                    }
                }
            }

        } else {
            lecturesByUser.get(userSession).onMessage(message, userSession)
        }
    }

    @OnClose
    public void onClose(Session userSession, CloseReason closeReason) {
        lecturesByUser.remove(userSession)
        unassignedUsers.remove(userSession)
    }

    @OnError
    public void onError(Throwable t) {
        // TODO Print error in some way
    }

    public void closeLecture(int id) {
        for(Session user : lectures.get(id)) {
            lecturesByUser.remove(user)
        }
        lectures.get(id).close()
        lectures.remove(id)
    }

    public boolean isAlive(int id) {
        return lectures.containsKey(id)
    }
}
