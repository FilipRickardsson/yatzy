class PlayerEndResultList extends List {

	constructor(items) {
		super(PlayerEndResult, items);
	}

	/* Fetches the result by the current user */
	readPlayerEndResult(callback) {
		this.db.readPlayerEndResult((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readPlayerEndResult: `
				SELECT date, games_id, username, points
				FROM games
				JOIN games_has_players
				ON games.id = games_id
				JOIN players 
				ON players_id = players.id
      	`
		}
	}
}
