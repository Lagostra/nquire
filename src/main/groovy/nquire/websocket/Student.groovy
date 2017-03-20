package nquire.websocket

import org.springframework.web.socket.WebSocketSession

class Student {
    private WebSocketSession session;
    private int id;

    Student(session, id) {
        this.session = session;
        this.id = id;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public int getId() {
        return id;
    }
}
