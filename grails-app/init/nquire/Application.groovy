package nquire

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import nquire.websocket.LectureEndpoint
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.annotation.Bean

class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }

    @Bean
    public LectureEndpoint lecture() {
        return new LectureEndpoint()
    }
}