class Die extends Base {

    constructor(propertyValues) {
        super(propertyValues);
    }

    rollTheDice() {
        var dieFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
        this.dots = Math.floor(Math.random() * 6 + 1);
        $('#die' + this.id).html(dieFaces[this.dots - 1]);

        console.log(this.dots);
    }

    getDots() {
        return this.dots;
    }
    
}
