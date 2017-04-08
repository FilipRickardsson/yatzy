class LatestGameList extends List {

	constructor(items) {
		super(LatestGame, items);
	}

	readLatestGame(callback) {
		this.db.readLatestGame((data) => {
			this.push.apply(this, data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			readLatestGame: `
			SELECT id FROM games
			ORDER BY id DESC
			LIMIT 1
			`
		}
	}

}
