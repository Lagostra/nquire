package nquire

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.*

import org.springframework.security.core.GrantedAuthority;

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class MyUserDetailsSpec extends Specification {

    MyUserDetails userDetails
    String fullName = "User Userson"
    int currentLecture = 8018
    String lectureToken = "akjgjka834jtqwngjbadtu92ng"

    def setup() {
        userDetails = new MyUserDetails("user", "password", true, true, true, true, new ArrayList<GrantedAuthority>(),
                                            1, fullName, currentLecture, lectureToken)
    }

    def cleanup() {
    }

    void "test MyUserDetails()"() {
        expect:
        userDetails.fullName == fullName
        userDetails.currentLecture == currentLecture
        userDetails.lectureToken == lectureToken
    }
}