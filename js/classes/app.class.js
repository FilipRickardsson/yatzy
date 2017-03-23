class App {

    constructor() {
        var die = new Die({
            id: 1
        });
        window.die = die;

        die.display('body');
        die.rollTheDice();
    }

    start() {

    }

}
