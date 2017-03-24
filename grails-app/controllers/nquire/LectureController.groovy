package nquire

import grails.plugin.springsecurity.annotation.Secured
import nquire.websocket.LectureEndpoint
import nquire.websocket.LectureHandler

import java.security.SecureRandom

@Secured('ROLE_LECTURER')
class LectureController {

    def springSecurityService;

    static allowedMethods = [present: 'GET', create_lecture: 'POST', close_lecture: 'POST'];

    @Secured('permitAll')
    def index() {
        boolean invalidLecture = session['invalidLecture'];
        session['invalidLecture'] = false;
        render(view: '/frontPage', model: [status: invalidLecture])
    }

    def present() {
        if(authenticatedUser.currentLecture == 0 || !LectureEndpoint.isAlive(principal.currentLecture)) {
            // The lecturer does not have a running lecture
            redirect(controller: 'lecture', action: 'create')
            return
        }

        render(view: 'present')
    }

    def questions() {
        if(authenticatedUser.currentLecture == 0 || !LectureEndpoint.isAlive(principal.currentLecture)) {
            // The lecturer does not have a running lecture
            redirect(controller: 'lecture', action: 'create')
            return
        }

        render(view: 'questions')
    }

    @Secured('permitAll')
    def connect() {
        if(params.id == null) {
            // No lecture id given
            redirect(action: index)
            // TODO Redirect to form for lecture connection
        }

        int id = params.int('id')

        if(!LectureEndpoint.isAlive(id)) {
            // Lecture does not exist
            session['invalidLecture'] = true;
            redirect(action: 'index')
        }

        render(view: 'student', model: [lectureId: id])
    }

    def create() {
        if(principal.currentLecture != 0 && LectureEndpoint.isAlive(principal.currentLecture)) {
            // TODO Send message that a lecture is already running
            redirect(action: 'present')
            return
        }
        render(view: 'create', model: [presentations: authenticatedUser.presentations])
    }

    def create_lecture() {
        if(principal.currentLecture != 0 && LectureEndpoint.isAlive(principal.currentLecture)) {
            // TODO Send message that a lecture is already running
            redirect(action: 'present')
            return
        }

        Presentation pres = Presentation.findById(params.int('presentationId'));
        String filePath = null;
        if(pres != null)
            filePath = grailsApplication.config.getProperty('presentationRoot') + pres.fileName + ".pdf";

        int id = 0
        String token = new BigInteger(130, new SecureRandom()).toString()

        boolean isAdded = false
        while(!isAdded) {
            id = new Random().nextInt(8999) + 1000

            if(filePath == null)
                isAdded = LectureEndpoint.addLecture(new LectureHandler(token), id)
            else
                isAdded = LectureEndpoint.addLecture(new LectureHandler(token, filePath), id)
        }

        authenticatedUser.currentLecture = id
        authenticatedUser.lectureToken = token
        authenticatedUser.save(flush: true)
        springSecurityService.reauthenticate(authenticatedUser.username)

        if(pres != null)
            redirect(action: 'present')
        else
            redirect(action: 'questions')
    }

    def close_lecture() {
        LectureEndpoint.closeLecture(authenticatedUser.currentLecture)
        authenticatedUser.currentLecture = 0
        authenticatedUser.lectureToken = ""
        authenticatedUser.save(flush: true)
        springSecurityService.reauthenticate(authenticatedUser.username)

        redirect(controller: 'lecture', action: 'create')
    }
}
