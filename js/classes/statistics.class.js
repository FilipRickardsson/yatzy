class Statistics extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		var playerResultList = new PlayerResultList();
		playerResultList.readPlayerResult(() => {
			playerResultList.display('#playerResult')
		});
	}

	backToLobby() {
		$('body').empty();
		var lobby = new Lobby();
		lobby.display('body');
		lobby.groupSize();
	}

}
