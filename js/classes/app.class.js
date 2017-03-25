class App {

    constructor() {
        var die = new Die({
            id: 1
        });

        var lobby = new Lobby();
        lobby.display('body');
        lobby.groupSize();

        die.display('body');
        die.rollTheDice();
        var protocol = new Protocol();
        protocol.display('body')
    }

}
