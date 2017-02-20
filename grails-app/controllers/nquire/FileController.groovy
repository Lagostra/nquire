package nquire

import grails.plugin.springsecurity.annotation.Secured;
import java.util.UUID;

import nquire.Presentation;
import nquire.User;

@Secured('ROLE_LECTURER')
class FileController {

    static allowedMethods = [index: 'GET', upload: 'GET', save: 'POST', get: 'GET'];

    def index() {
        render(view: 'list', model: [presentations: authenticatedUser.presentations]);
    }

    def upload() {
        render(view: 'upload');
    }

    def save() {
        def f = request.getFile('file');
        String title = params.title;

        if(f.empty) {
            flash.message = 'File cannot be empty';
            render(view: 'upload');
            return;
        }

        String filename = UUID.randomUUID().toString();

        //f.transferTo(new File("D:\\Eivind\\workspaces\\Java2\\presentations\\test.pdf"));
        f.transferTo(new File(grailsApplication.config.getProperty('presentationRoot') + filename + ".pdf"));

        User user = authenticatedUser;
        Presentation pres = new Presentation(title: title, fileName: filename, owner: user).save(flush: true);

        redirect(action: 'index');
    }

    def get() {
        Presentation pres = Presentation.findById(params.id);

        if(pres == null) {
            // Presentation does not exist
            response.sendError(404);
            return;
        }

        if(pres.owner != authenticatedUser) {
            // Presentation is not owned by signed in user
            response.sendError(403);
            return;
        }

        render(file: new File(grailsApplication.config.getProperty('presentationRoot') + pres.fileName + ".pdf"),
                fileName: pres.title + ".pdf");
    }

}
