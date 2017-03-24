package nquire.websocket

import org.springframework.web.socket.WebSocketSession

class Student {
    private WebSocketSession session;
    private int id;
    private Date lastFeedback = new Date(0);

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

    public Date getLastFeedback() {
        return lastFeedback
    }

    public void setLastFeedback(Date date) {
        lastFeedback = date
    }
}
