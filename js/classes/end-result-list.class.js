class EndResultList extends List {

	constructor(items) {
		super(EndResult, items);
	}

	/* Fetches the result by the current user */
	readEndResult(callback) {
		this.db.readEndResult((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readGamesResult: `
				SELECT DATE_FORMAT(date, '%y-%m-%d') date , games_id , username 
				FROM games
				JOIN games_has_players
				ON games.id = games_id
				JOIN players 
				ON players_id = players.id

				
				
      	`
		}
	}
}
