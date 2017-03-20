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

        double timeConstant = 0.975;
        double base = 50.0;
        double feedback = 0.0;

        Date first =  feedbackList.get(0).getTimestamp();
        Date last = first;

        if (first == null || last == null){
            throw new IllegalStateException
                    ("No timestamp could be gathered from list");
        }

        for (Feedback fb : feedbackList){
            Date time = fb.getTimestamp();
            if (time.getTime() <= first.getTime()){
                first = time;
            }
            if (time.getTime() >= last.getTime()){
                last = time;
            }
        }

        for (Feedback fb : feedbackList){
            if (fb.getFast()) feedback +=
                    (1.0 * Math.pow(timeConstant, ));
            else feedback -= 1.0;
        }



        return 0.0;
    }

}
