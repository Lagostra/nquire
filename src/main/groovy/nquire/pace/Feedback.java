package nquire.pace;

import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 */
public class Feedback {

    private Date timestamp = new Date();
    private boolean fast;

    public Feedback(Date timestamp, boolean fast) {
        this.timestamp = timestamp;
        this.fast = fast;
    }

    public boolean getFast() {
        return this.fast;
    }
    public Date getTimestamp() {
        return this.timestamp;
    }

}