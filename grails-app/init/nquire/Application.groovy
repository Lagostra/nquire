package nquire

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.handler.PerConnectionWebSocketHandler
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor

import nquire.websocket.LectureEndpoint

@Configuration
@EnableWebSocket
class Application extends GrailsAutoConfiguration implements WebSocketConfigurer{

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        HttpSessionHandshakeInterceptor interceptor = new HttpSessionHandshakeInterceptor()
        registry.addHandler(aWebSocketHandler(), "/lectureStream").addInterceptors(interceptor)
    }

    @Bean
    public WebSocketHandler aWebSocketHandler() {
        return new PerConnectionWebSocketHandler(LectureEndpoint.class)
    }


    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }
}