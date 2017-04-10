class Statistics extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		this.readStatistics();
	}
	
	readStatistics() {
		var playerWinsList = new PlayerWinsList();
		playerWinsList.readPlayerWins(() => {
			playerWinsList.display('#playerResult');

			var gamesResultList = new GamesResultList();
			gamesResultList.readGamesResult(() => {
				let games = [];
				for (let i = 0; i < gamesResultList.length; i++) {
					let found = false;
					for (let j = 0; j < games.length; j++) {
						if (gamesResultList[i].id === games[j]) {
							found = true;
						}
					}
					if (!found) {
						games.push(gamesResultList[i].id);
					}
				}

				games = games.sort(function (a, b) {
					return b - a;
				});
				for (let i = 0; i < games.length; i++) {
					$('#gamesResult').append('<div id="game' + games[i] + '"><h3>Game ' + games[i] + '</h3></div>');
				}
				for (let i = 0; i < gamesResultList.length; i++) {
					gamesResultList[i].display('#game' + gamesResultList[i].id);
				}
			});

		});
	}

	backToLobby() {
		$('body').empty();
		var lobby = new Lobby();
		lobby.display('body');
		lobby.createInputFields();
	}

}
