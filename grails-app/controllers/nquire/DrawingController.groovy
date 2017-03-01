package nquire

class DrawingController {

    def index() {
        render(view: 'draw.gsp')
    }
    def markings(){
        render(view: 'markings.gsp')
    }
}
