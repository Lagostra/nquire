package nquire

import nquire.User;

class Presentation {

    String title;
    String fileName;

    static belongsTo = [owner: User]

    static mapping = {
        owner column: 'Owner_Id'
    }

    static constraints = {
        title size: 3..100, blank: false
        fileName blank: false
    }

    def beforeDelete() {
        // Delete the file that this object references
        File file = new File(grailsApplication.config.getProperty('presentationRoot') + filename + ".pdf");
        file.delete();
    }

}
