class PlayerResultList extends List {

	constructor(items) {
		super(PlayerResult, items);
	}

	/* Fetches the result by the current user */
	readPlayerResult(callback) {
		this.db.readPlayerResult((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readPlayerResult: `
				SELECT *
				FROM players
				ORDER BY nbrOfWins DESC
      		`
		}
	}
	
}
