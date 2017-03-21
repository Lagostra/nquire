package nquire.similarity

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import spock.lang.*

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class WordCounterSpec extends Specification {

    WordCounter wc;

    def setup() {
        wc = new WordCounter(2)
    }

    def cleanup() {
    }

    def "test WordCounter.listify()"() {
        when:
        String s = "This is a test"
        List<String> expectedResult = new ArrayList<>(Arrays.asList(
                'This',
                'is',
                'a',
                'test'
            ))

        then:
        wc.listify(s).equals(expectedResult)
    }

    def "test WordCounter.makeNGrams()"() {
        when:
        List<String> s = new ArrayList<>(Arrays.asList('Hello', 'world'))
        List<String> expectedResult = new ArrayList<>(Arrays.asList('Hello', 'world', 'Hello_world'))
        wc.makeNGrams(s, 2)

        then:
        s.equals(expectedResult)
    }

    def "test WordCounter.removeStopWords()"() {
        when:
        wc.stopWords = new ArrayList<>(Arrays.asList("this", "a", "the"))
        List<String> s = new ArrayList<>(Arrays.asList("this", "a", "the", "onomatopoeticon"))
        List<String> expectedResult = new ArrayList<>(Arrays.asList("onomatopoeticon"))
        wc.removeStopWords(s)

        then:
        s.equals(expectedResult)
    }

    def "test WordCounter.removeDuplicates()"() {
        when:
        List<String> s = new ArrayList<>(Arrays.asList("hi", "hi", "ha", "ha", "ho", "ho"))
        List<String> expectedResult = new ArrayList<>(Arrays.asList("hi", "ha", "ho"))
        s = wc.removeDuplicates(s)

        then:
        s.equals(expectedResult)
    }

    def "test WordCounter.calculateSimilarity()"() {
        when:
        List<String> s1 = new ArrayList<>(Arrays.asList("banana", "trampoline", "parachute", "boat"))
        List<String> s2 = new ArrayList<>(Arrays.asList("banana", "trampoline", "kite"))

        then:
        wc.calculateSimilarity(s1, s2) == 0.5
    }

    def "test WordCounter with equal strings"() {
        when:
        String s = "I have a question"

        then:
        wc.calculate(s, s) == 1.0
    }

    def "test WordCounter with totally unequal strings"() {
        when:
        String s1 = "I have a question"
        String s2 = "My banana is green"

        then:
        wc.calculate(s1, s2) == 0.0
    }

}