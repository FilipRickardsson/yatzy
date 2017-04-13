class PlayerWinsList extends List {

	constructor(items) {
		super(PlayerWins, items);
	}

	/* Fetches a list with the players name and number of wins */
	readPlayerWins(callback) {
		this.db.readPlayerWins((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readPlayerWins: `
				SELECT *
				FROM players
				ORDER BY nbrOfWins DESC
      		`
		}
	}
	
}
