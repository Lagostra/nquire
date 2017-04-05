package nquire;

import java.util.Comparator;

/**
 * Created by ela49 on 05.04.2017.
 */
public class PresentationComparator implements Comparator<Presentation> {
    @Override
    public int compare(Presentation o1, Presentation o2) {
        return -o1.getCreated_at().compareTo(o2.getCreated_at());
    }
}
