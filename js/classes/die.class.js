class Die extends Base {

    constructor(propertyValues) {
        super(propertyValues);
        this.enabled = true;
        this.dots = "\u2680";
        this.dieFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
    }

    rollTheDice() {
        $('.hidden').removeClass('hidden');
        if (this.enabled) {
            this.dots = Math.floor(Math.random() * 6 + 1);
            $('#die' + this.id).html(this.dieFaces[this.dots - 1]);
        }
    }

    getDots() {
        return this.dots;
    }

    toggleDie() {
        this.enabled = !this.enabled;
        $('.die' + this.id).toggleClass("dieDisabled");

    }

}
