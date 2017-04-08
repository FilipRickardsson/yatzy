class PlayerWinsList extends List {

	constructor(items) {
		super(PlayerWins, items);
	}

	/* Fetches the result by the current user */
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
