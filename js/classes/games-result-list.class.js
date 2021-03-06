class GamesResultList extends List {

	constructor(items) {
		super(GamesResult, items);
	}

	/* Fetches a list of all the gameresults */
	readGamesResult(callback) {
		this.db.readGamesResult((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readGamesResult: `
				SELECT id, date, players_userName, points 
				FROM games
				JOIN games_has_players
				ON id = games_id
				ORDER BY points DESC
      		`
		}
	}
}
