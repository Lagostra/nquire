package nquire.pace;

import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 */
public class Feedback {

    public Date timestamp = new Date();
    public boolean fast;

    public Feedback(Date timestamp, boolean fast) {
        this.timestamp = timestamp;
        this.fast = fast;
    }


}
