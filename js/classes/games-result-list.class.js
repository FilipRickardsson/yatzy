class GamesResultList extends List {

	constructor(items) {
		super(GamesResult, items);
	}

	/* Fetches the result by the current user */
	readGamesResult(callback) {
		this.db.readGamesResult((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readGamesResult: `
				SELECT id ,  DATE_FORMAT(date, '%y-%m-%d') date 
				FROM games
				
      	

				
				
      	`
		}
	}
}
