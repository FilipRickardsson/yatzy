class EndResult extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		var playerResultList = new PlayerResultList();
		playerResultList.readPlayerResult(() => {
			playerResultList.display('#playerResult')
		});


		var gamesResultList = new GamesResultList();
		gamesResultList.readGamesResult(() => {
			gamesResultList.display('#gamesResult')
		});



	}


	backToLobby() {
		$('body').empty();
		var lobby = new Lobby();
		lobby.display('body');
		lobby.groupSize();
	}

}
