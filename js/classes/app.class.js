class App {

	// Starts the game by creating a lobby object
	constructor() {
		var lobby = new Lobby();
		lobby.display('body');
		lobby.createInputFields();
	}

}
