package nquire

class Presentation {

    String title;
    String fileName;
    int owner;

    static constraints = {
        title size: 5..100, blank: false
        fileName blank: false
        owner blank: false
    }

}
