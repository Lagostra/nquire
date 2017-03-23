package nquire.pace

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.*

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 *
 */
@TestMixin(GrailsUnitTestMixin)
class PaceSpec extends Specification {

    List<Feedback> feedbackList;
    Pace pace = new Pace();

    def setup() {
        feedbackList = new ArrayList<>();
    }

    def cleanup() {
    }

    void "test 10 positives"() {
        when:
            for (int i = 0; i < 10; i++){
                feedbackList.add(new Feedback(new Date(), true));
            }
            double a = pace.calculateCurrentPace(feedbackList, 10);
        then:
            a > 50
            a <= 100
            feedbackList.size() == 10
    }

    void "test 50 positives"() {
        when:
            for (int i = 0; i < 50; i++){
                feedbackList.add(new Feedback(new Date(), true))
            }
            double a = pace.calculateCurrentPace(feedbackList, 50)
        then:
            a == 100
            feedbackList.size() == 50
    }

    /*void "test feedback C"() {
        when:
        then:
        true
    }*/


}