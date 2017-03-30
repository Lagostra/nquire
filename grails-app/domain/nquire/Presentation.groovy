package nquire

import nquire.User

import java.nio.file.FileSystemException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths;

class Presentation {

    String title;
    String fileName;

    def grailsApplication

    static belongsTo = [owner: User]

    static mapping = {
        owner column: 'Owner_Id'
    }

    static constraints = {
        title size: 3..100, blank: false
        fileName blank: false
    }

    def beforeDelete() {
        try {
            // Delete presentation
            Path file = Paths.get(grailsApplication.config.getProperty('presentationRoot') + fileName + ".pdf")
            Files.delete(file)
            // Delete thumbnail
            file = Path file = Paths.get(grailsApplication.config.getProperty('presentationRoot') + "thumbnails/" + fileName + ".pdf")
            Files.delete(file)
        } catch(FileSystemException e) {
            log.error(e.message)
            return false
        }
    }

}
