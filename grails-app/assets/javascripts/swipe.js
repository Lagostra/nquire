function Swipe() {
    this.onswipeleft = null;
    this.onswiperight = null;
    this.onswipeup = null;
    this.onswipedown = null;

    this.disabled = false;

    this.xDown = null;
    this.yDown = null;

    this.setOnSwipeLeft = function(handler) {
        this.onswipeleft = handler;
    }

    this.handleTouchStart = function(e) {
        if(this.disabled)
            return;

        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
    }.bind(this);

    this.handleTouchMove = function(e) {
        if(this.disabled)
            return;
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                if(this.onswipeleft instanceof Function)
                    this.onswipeleft.call();
            } else {
                if(this.onswiperight instanceof Function)
                    this.onswiperight.call();
            }
        } else {
            if ( yDiff > 0 ) {
                if(this.onswipeup instanceof Function)
                    this.onswipeup.call();
            } else {
                if(this.onswipedown instanceof Function)
                    this.onswipedown.call();
            }
        }
        /* reset values */
        this.xDown = null;
        this.yDown = null;
    }.bind(this);

    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);
};