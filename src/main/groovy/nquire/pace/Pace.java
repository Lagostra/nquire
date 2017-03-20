package nquire.pace;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by lars on 13.03.2017.
 */
public class Pace implements PaceInterface {

    @Override
    public double calculateCurrentPace(ArrayList<Feedback> feedbackList) {
        double timeConstant = 0.965;
        double base = 50.0;
        double feedback = 0.0;
        Date first, last = feedbackList.get(0).getTimestamp();
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
