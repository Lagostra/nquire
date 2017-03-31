package nquire.pace

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.*

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 *  3 timer
 */
@TestMixin(GrailsUnitTestMixin)
class PaceSpec extends Specification {

    List<Feedback> feedbackList
    Pace pace = new Pace()
    Date date = new Date()

    def setup() {
        feedbackList = new ArrayList<>()
    }

    def cleanup() {
    }

    void "test 10 positives"() {
        when:
            for (int i = 0; i < 10; i++){
                feedbackList.add(new Feedback(date, true))
            }
            double a = pace.calculateCurrentPace(feedbackList, 10)
        then:
            a > 50
            a <= 100
            feedbackList.size() == 10
    }

    void "test 50 positives"() {
        when:
            for (int i = 0; i < 50; i++){
                feedbackList.add(new Feedback(date, true))
            }
            double a = pace.calculateCurrentPace(feedbackList, 50)
        then:
            a == 100
            feedbackList.size() == 50
    }

    void "test cancellout 1+ 1-"() {
        when:
            feedbackList.add(new Feedback(date,true))
            feedbackList.add(new Feedback(date, false))
        then:
            pace.calculateCurrentPace(feedbackList,10) == 50
    }

    void "test null list input"() {
        when:
            double a = pace.calculateCurrentPace(null,1)
            double b = 50
        then:
            a == b
    }

    void "test 0 numStudents"() {
        when:
        feedbackList.add(new Feedback(date,true))
        double a = pace.calculateCurrentPace(feedbackList,0)
        double b = 100.0
        then:
        a == b

    }

    void "test negative numStudents"() {
        when:
        feedbackList.add(new Feedback(date,true))

        boolean flag = false

        try{
            pace.calculateCurrentPace(feedbackList,-10)
        }
        catch(IllegalArgumentException e){
            System.out.print(e)
            flag = true
        }

        then:
        flag
    }


}