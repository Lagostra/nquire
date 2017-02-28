package nquire.websocket

import groovy.json.JsonSlurper

import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.CloseStatus

class LectureHandler {

    private List<WebSocketSession> students;
    private List<WebSocketSession> lecturers;

    private int id;
    private String lecturerToken;

    LectureHandler(int id, String lecturerToken) {
        this.id = id
        this.lecturerToken = lecturerToken
    }

    public boolean addLecturer(WebSocketSession lecturer, String token) {
        if(token == lecturerToken) {
            lecturers.add(lecturer)
            return true
        }
        return false
    }

    public void addStudent(WebSocketSession student) {
        students.add(student)
    }

    public void onMessage(String message, WebSocketSession userSession) {
        def mObject = new JsonSlurper().parseText(message)

        if(lecturers.contains(userSession)) {
            // The message was sent by a lecturer

            if(mObject.type == "pageChange") {
                sendToAllStudents(message)
            }
        } else {

        }
    }

    private sendToAllStudents(String message) {
        for(WebSocketSession student : students) {
            student.sendText(new TextMessage(message))
        }
    }

    private sendToAllLecturers(String message) {
        for(WebSocketSession lecturer : lecturers) {
            lecturer.sendText(new TextMessage(message))
        }
    }

    private sendToAll(String message) {
        sendToAllStudents(message)
        sendToAllLecturers(message)
    }

    public List getAllUsers() {
        List<WebSocketSession> result = new ArrayList<>(students)
        result.addAll(lecturers)
        return result
    }

    /**
     * Closes all connections to this lecture.
     * */
    public void close() {
        for (WebSocketSession student : students) {
            student.close(CloseStatus.GOING_AWAY)
        }

        for (WebSocketSession lecturer : lecturers) {
            lecturer.close(CloseStatus.GOING_AWAY)
        }
    }

}
