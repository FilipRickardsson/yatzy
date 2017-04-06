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
