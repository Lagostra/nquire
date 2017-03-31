package nquire.pace;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.List;
import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 * tid brukt så langt: 6.5 timer
 */
public class Pace implements PaceInterface {

    private static Log log = LogFactory.getLog(Pace.class);

    @Override
    public double calculateCurrentPace(List<Feedback> feedbackList, int numStudents) {
        if (feedbackList == null || feedbackList.isEmpty())
            return 50.0;
        if (numStudents < 0)
            throw new IllegalArgumentException("numStudents is negative");



        double base = 50.0;
        double feedback = 0.0;

        double sizeConstant = calculateSizeConstant(numStudents);

        for (Feedback fb : feedbackList){
            if (fb.getFast()) {
                feedback += calculateTime(fb.getTimestamp())
                        * 50.0 * sizeConstant;
            } else {
                feedback -= calculateTime(fb.getTimestamp())
                        * 50.0 * sizeConstant;
            }
        }
        if (feedback > 50.0)
            feedback = 50.0;
        else if (feedback < -50.0)
            feedback = -50.0;
        return base + feedback;
    }


    private double calculateTime(Date timestamp) {
        double deltaTime = compareTime(timestamp);
        if (deltaTime > 300) return 0.0;
        //27 mill er 300^3, altså er feedback gyldig i 5 min
        double a = 1 - (Math.pow(deltaTime, 3) / 27000000);

        if (a > 1.0) a = 1.0;
        else if (a < 0.0) a = 0.0;
        return a;
    }


    //Hvor lang tid mellom 5 minutter siden og timestamp
    private double compareTime(Date timestamp) {
        return (System.currentTimeMillis() - timestamp.getTime()) / 1000;
    }

    double calculateSizeConstant(int numStudents) {
        return (10.0/numStudents < 1.0) ? 10.0/numStudents : 1.0;
    }
}
