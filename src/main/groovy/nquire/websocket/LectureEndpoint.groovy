package nquire.websocket

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.WebSocketMessage
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.CloseStatus

import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

class LectureEndpoint implements WebSocketHandler {

    private static Log log = LogFactory.getLog(getClass())

    private static scheduler;

    private static Map<Integer, LectureHandler> lectures = new HashMap<>()
    private static Map<WebSocketSession, LectureHandler> lecturesByUser = new HashMap<>()
    private static List<WebSocketSession> unassignedUsers = new ArrayList<>()


    static {
        scheduler = Executors.newScheduledThreadPool(1)
        scheduler.scheduleAtFixedRate(new Runnable() {
                @Override
                public void run() {
                    closeInactiveLectures()
                }
            }, 5, 5, TimeUnit.MINUTES)
    }


    @Override
    public void afterConnectionEstablished(final WebSocketSession session) throws Exception {
        unassignedUsers.add(session);
    }

    @Override
    void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String msg = message?.payload;

        if(unassignedUsers.contains(session)) {
            // User is not assigned to a lecture - check if this is a connect message
            def mObject = new JsonSlurper().parseText(msg)

            if(mObject.type == "connect") {
                if(!lectures.containsKey(mObject.lectureId)) {
                    // Lecture does not exist
                    String errorMessage = JsonOutput.toJson([type   : 'error',
                                                    code   : 404,
                                                    message: 'No lecture with the provided ID exists!'])
                    session.sendMessage(new TextMessage(errorMessage))
                    session.close()
                    return
                }

                if(mObject.role == "student") {
                    lectures.get(mObject.lectureId).addStudent(session)
                    lecturesByUser.put(session, lectures.get(mObject.lectureId))
                    unassignedUsers.remove(session)
                } else if(mObject.role == "lecturer") {
                    if(!lectures.get(mObject.lectureId).addLecturer(session, mObject.token)) {
                        String errorMsg = JsonOutput.toJson([type: 'error',
                                                        code: 403,
                                                        message: 'The provided token did not authenticate against the lecture.'])
                        session.sendMessage(new TextMessage(errorMsg))
                        session.close()
                    } else {
                        lecturesByUser.put(session, lectures.get(mObject.lectureId))
                        unassignedUsers.remove(session)
                    }
                }
            }

        } else {
            lecturesByUser.get(session).onMessage(msg, session)
        }
    }

    @Override
    void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error(exception.message)
    }

    @Override
    void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        if(lecturesByUser.containsKey(session))
            lecturesByUser.get(session).removeUser(session)
        lecturesByUser.remove(session)
        unassignedUsers.remove(session)
    }

    @Override
    boolean supportsPartialMessages() {
        return false
    }

    static boolean addLecture(LectureHandler lecture, int id) {
        if(lectures.containsKey(id)) {
            return false
        }
        lectures.put(id, lecture)
        lecture.setId(id)
        return true
    }

    static LectureHandler getLecture(int id) {
        if(!lectures.containsKey(id))
            return null;
        return lectures.get(id);
    }

    static void closeLecture(int id) {
        LectureHandler lecture = lectures.get(id)
        closeLecture(lecture)
    }

    static void closeLecture(LectureHandler lecture) {
        lectures.remove(lecture.getId())
        for(WebSocketSession user : lecture.getAllUsers()) {
            lecturesByUser.remove(user)
        }
        lecture.close()
    }

    private static void closeInactiveLectures() {
        for(LectureHandler lecture : lectures.values()) {
            if(lecture.shouldClose())
                closeLecture(lecture)
        }
    }

    static boolean isAlive(int id) {
        return lectures.containsKey(id)
    }

}
