class Die extends Base {

    constructor(propertyValues) {
        super(propertyValues);
    }

    rollTheDice() {
        this.dots = Math.floor(Math.random() * 6) + 1;

        if (this.dots === 1) {
            this.setUtfDots("\u2680");
        }
        if (this.dots === 2) {
            this.setUtfDots("\u2681");
        }
        if (this.dots === 3) {
            this.setUtfDots("\u2682");
        }
        if (this.dots === 4) {
            this.setUtfDots("\u2683");
        }
        if (this.dots === 5) {
            this.setUtfDots("\u2684");
        }
        if (this.dots === 6) {
            this.setUtfDots("\u2685");
        }
        console.log(this.dots);
    }
    setUtfDots(utfCode) {
        $('#die' + this.id).html(utfCode);

    }
}
