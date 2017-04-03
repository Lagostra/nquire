package nquire

import grails.test.mixin.TestFor
import spock.lang.Specification

import java.nio.file.Files

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Presentation)
class PresentationSpec extends Specification {

    Presentation pres

    def setup() {
        pres = new Presentation();
    }

    def cleanup() {
    }

    def "test Presentation.beforeDelete()"() {
        given:
        GroovySpy(Files, global: true, useObjenesis: true)

        when:
        pres.fileName = "file"
        pres.beforeDelete()

        then:
        1 * Files.delete(_)
    }
}
