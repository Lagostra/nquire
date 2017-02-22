package nquire

import grails.plugin.springsecurity.annotation.Secured

import javax.imageio.ImageIO
import java.awt.image.BufferedImage;
import java.util.UUID;

import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.rendering.PDFRenderer

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
        File pdfDocument = new File(grailsApplication.config.getProperty('presentationRoot') + filename + ".pdf");
        f.transferTo(pdfDocument);
        BufferedImage thumbnail = createThumbnail(pdfDocument);
        if(thumbnail != null) {
            File imgFile = new File(grailsApplication.config.getProperty('presentationRoot') + "thumbnails/" + filename + ".jpg")
            ImageIO.write(thumbnail, "jpg", imgFile);
        }

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

    def get_thumbnail() {
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

        render(file: new File(grailsApplication.config.getProperty('presentationRoot') + "thumbnails/" + pres.fileName + ".jpg"),
                contentType: 'image/jpg');
    }

    private BufferedImage createThumbnail(File pdfDocument) {
        try {
            PDDocument pdDocument = PDDocument.load(pdfDocument);
        } catch(FileNotFoundException e) {
            // Can't find the specified pdf. 
            return null;
        }

        log.error(Integer.toString(pdDocument.getNumberOfPages()))

        PDFRenderer renderer = new PDFRenderer(pdDocument);

        // Renders the first page
        // The second argument is the DPI of the rendered image
        BufferedImage image = renderer.renderImageWithDPI(0, 15.0);

        return image;
    }

}
