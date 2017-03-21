package nquire.pace;

import java.util.List;
import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 * tid brukt så langt: 4.5 timer
 */
public class Pace implements PaceInterface {

    @Override
    public double calculateCurrentPace(List<Feedback> feedbackList) {
        if (feedbackList == null || feedbackList.isEmpty())
            return 50.0;

        double base = 50.0;
        double feedback = 0.0;

        double sizeConstant = 2 - Math.pow(1.014, feedbackList.size());

        for (Feedback fb : feedbackList){
            if (fb.getFast())
                feedback += calculateTime(fb.getTimestamp(), sizeConstant);
            else
                feedback -= calculateTime(fb.getTimestamp(), sizeConstant);
        }
        return base + feedback;
    }


    private double calculateTime(Date timestamp, double sizeConstant) {

        double a = 0.8 * Math.pow(compareTime(timestamp),0.45)* sizeConstant;
        if (a > 1.0) a = 1.0;
        else if (a < -1.0) a = -1.0;
        return a;
    }


    //Hvor lang tid mellom 5 minutter siden og timestamp
    private double compareTime(Date timestamp) {
        double a = ((timestamp.getTime() -
                new Date(System.currentTimeMillis()+5*60*1000).getTime()
                    )/1000);
        if (a < 0.0 ) return 0.0;
        return a;
    }

}
