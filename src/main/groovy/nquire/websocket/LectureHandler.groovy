package nquire.websocket

import groovy.json.JsonSlurper

import javax.websocket.CloseReason
import javax.websocket.Session

class LectureHandler {

    private List<Session> students;
    private List<Session> lecturers;

    private int id;
    private String lecturerToken;

    LectureHandler(int id, String lecturerToken) {
        this.id = id
        this.lecturerToken = lecturerToken
    }

    public boolean addLecturer(Session lecturer, String token) {
        if(token == lecturerToken) {
            lecturers.add(lecturer)
            return true
        }
        return false
    }

    public void addStudent(Session student) {
        students.add(student)
    }

    public void onMessage(String message, Session userSession) {
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
        for(Session student : students) {
            student.getAsyncRemote().sendText(message)
        }
    }

    private sendToAllLecturers(String message) {
        for(Session lecturer : lecturers) {
            lecturer.getAsyncRemote().sendText(message)
        }
    }

    private sendToAll(String message) {
        sendToAllStudents(message)
        sendToAllLecturers(message)
    }

    public List getAllUsers() {
        List result = new ArrayList(students)
        result.addAll(lecturers)
        return result
    }

    /**
     * Closes all connections to this lecture.
     * */
    public void close() {
        for (Session student : students) {
            student.close(new CloseReason(CloseReason.CloseCodes.GOING_AWAY, "Lecture has been closed."))
        }

        for (Session lecturer : lecturers) {
            lecturer.close(new CloseReason(CloseReason.CloseCodes.GOING_AWAY, "Lecture has been closed."))
        }
    }

}
