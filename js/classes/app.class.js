class App {

    constructor() {
        var die = new Die({
            id: 1
        });

        var lobby = new Lobby();
        lobby.display('body');
        
        die.display('body');
        die.rollTheDice();
    }
    
}
