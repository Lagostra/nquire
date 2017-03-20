package nquire.pace;

import java.util.ArrayList;

/**
 * Created by lars on 13.03.2017.
 */
public class Pace implements PaceInterface {

    @Override
    public double calculateCurrentPace(ArrayList<Feedback> feedbackList) {
        double base = 50.0;
        double feedback = 0.0;
        for (Feedback fb : feedbackList){
            if (fb.getFast()) feedback += 1.0;
            else feedback -= 1.0;
        }

        

        return 0.0;
    }

}
