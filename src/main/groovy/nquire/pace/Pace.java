package nquire.pace;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 */
public class Pace implements PaceInterface {

    @Override
    public double calculateCurrentPace(ArrayList<Feedback> feedbackList) {
        if (feedbackList.isEmpty())
            throw new IllegalArgumentException("Invalid feedback list");

        double base = 50.0;
        double feedback = 0.0;
        double timeElapsed = getTimeElapsed(feedbackList);

        double sizeConstant = 2 - Math.pow(1.014, feedbackList.size());

        for (Feedback fb : feedbackList){
            if (fb.getFast()) feedback += calculateTime(timeElapsed, sizeConstant);
            else feedback -= calculateTime(timeElapsed, sizeConstant);
        }

        return base + feedback;
    }


    private double calculateTime (double timeElapsed, double sizeConstant){
        double a = (2 - Math.pow(1.00025, (8 * timeElapsed)))*sizeConstant;
        if (a > 1.0) a = 1.0;
        else if (a < -1.0) a = -1.0;
        return a;
    }

    private double getTimeElapsed(ArrayList<Feedback> feedbackList) {
        Date first =  feedbackList.get(0).getTimestamp();

        if (first == null){
            throw new IllegalStateException
                    ("No timestamp could be gathered from list");
        }

        for (Feedback fb : feedbackList){
            Date time = fb.getTimestamp();
            if (time.before(first)){
                first = time;
            }
        }

        //returns seconds since the first question was timestamped
        return (System.currentTimeMillis() - first.getTime()) / 1000;
    }

}
