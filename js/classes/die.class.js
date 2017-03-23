class Die extends Base {

    constructor(propertyValues) {
        super(propertyValues);
    }

    rollTheDice() {
        this.dots = Math.floor(Math.random() * 6) + 1;

        if (this.dots === 1) {
            setUtfDots(U + 2680);
        }
        if (this.dots === 2) {

        }
        if (this.dots === 3) {

        }
        if (this.dots === 4) {

        }
        if (this.dots === 5) {

        }
        if (this.dots === 6) {

        }
    }
    setUtfDots(utfCode) {
        $('die' + this.id).html(utfCode);

    }
}
