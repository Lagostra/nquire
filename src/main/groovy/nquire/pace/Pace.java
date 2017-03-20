package nquire.pace;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 * tid brukt så langt: 4 timer
 */
public class Pace implements PaceInterface {

    @Override
    public double calculateCurrentPace(ArrayList<Feedback> feedbackList) {
        if (feedbackList.isEmpty())
            return 50.0;

        double base = 50.0;
        double feedback = 0.0;

        double sizeConstant = 2 - Math.pow(1.014, feedbackList.size());

        for (Feedback fb : feedbackList){
            if (fb.getFast()) feedback += calculateTime(fb.getTimestamp(), sizeConstant);
            else feedback -= calculateTime(fb.getTimestamp(), sizeConstant);
        }
        return base + feedback;
    }


    private double calculateTime (Date timestamp, double sizeConstant){
        double a = (2 -
                Math.pow(1.00025, (8 * compareTime(timestamp))))*sizeConstant;
        if (a > 1.0) a = 1.0;
        else if (a < -1.0) a = -1.0;
        return a;
    }


    //Hvor lang tid mellom 5 minutter siden og timestamp
    private double compareTime(Date timestamp) {
        double a = (timestamp.getTime() -
                new Date(System.currentTimeMillis()+5*60*1000).getTime());
        if (a < 0.0 ) return 0;
        return a;
    }

} // Thanks author
