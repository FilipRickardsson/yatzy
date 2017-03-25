class GameBoard extends Base {

    constructor(propertyValues) {
        super(propertyValues);
    }

    createDice() {
        this.dice = [];
        for (let i = 0; i < 5; i++) {
            let die = new Die({
                id: i + 1
            });
            die.display('#dice');
            this.dice.push(die);
        }

        console.log('debug 1');
        console.log('Dice:', this.dice);
    }

}
