class GameBoard extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		this.currentPlayer = 0;
		this.totalGameTurns = this.players.length * 15;
		this.currentTurn = 0;
		this.diceThrow = 0;
	}

	// Creates five dice
	createDice() {
		this.dice = [];
		for (let i = 0; i < 5; i++) {
			let die = new Die({
				id: i + 1
			});
			die.display('#dice');
			this.dice.push(die);
			die.resetDie();
		}
	}

	// Rolls all five dice
	rollTheDice() {
		for (let i = 0; i < this.dice.length; i++) {
			this.dice[i].rollTheDie();
		}
		var points = this.calcPotentialPoints();
		this.protocol.insertPotentialPoints(points, this.currentPlayer);
		this.diceThrow++;

		if (this.diceThrow === 3) {
			$('.btn').prop('disabled', true);
		}
	}

	// Creates the protocol
	createProtocol() {
		var protocol = new Protocol({
			players: this.players,
			gameboard: this
		});
		this.protocol = protocol;
		protocol.display('#protocolContainer');
		protocol.createColumns();
	}

	// Gathers all the potential points and returns them in an array
	calcPotentialPoints() {
		var points = [];
		points = points.concat(this.calcFirstHalf());
		points.push(this.checkOccurences(2));
		points.push(this.checkDoublePair());
		points.push(this.checkOccurences(3));
		points.push(this.checkOccurences(4));
		points.push(this.checkStraight(true));
		points.push(this.checkStraight(false));
		points.push(this.checkFullHouse());
		points.push(this.calcChance());
		points.push(this.checkYatzy());

		points.splice(6, 0, 0);
		points.splice(7, 0, 0);
		points.push(0);

		return points;
	}

	// Calculated the potential points in the first half of the protocol
	// and returns them in an array
	calcFirstHalf() {
		var firstHalfPoints = [];
		var points = 0;
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < this.dice.length; j++) {
				if (this.dice[j].getDots() == i + 1) {
					points += this.dice[j].getDots();
				}
			}
			firstHalfPoints.push(points);
			points = 0;
		}
		return firstHalfPoints;
	}

	// Checks if there is a particular number of a die face and if found returns the potential points
	checkOccurences(nbrOfOccurences) {
		var points = 0;
		var occurences = 0;
		for (let i = 6; i > 0; i--) {
			for (let j = 0; j < this.dice.length; j++) {
				if (this.dice[j].getDots() == i) {
					occurences++;
				}
			}
			if (occurences >= nbrOfOccurences) {
				points = i * nbrOfOccurences;
				break;
			}
			occurences = 0;
		}
		return points;
	}

	// Checks if the dice contains a double pair
	checkDoublePair() {
		var occurences = [0, 0, 0, 0, 0, 0];
		var pair1, pair2;
		for (let i = 0; i < this.dice.length; i++) {
			occurences[this.dice[i].getDots() - 1]++;
		}
		for (let i = this.dice.length; i >= 0; i--) {
			if (occurences[i] >= 2 && pair1 === undefined) {
				pair1 = i + 1;
			} else if (occurences[i] >= 2) {
				pair2 = i + 1;
				return pair1 * 2 + pair2 * 2;
			}
		}
		return 0;
	}

	// Checks if the dice contains a small or big straight
	checkStraight(smallStraight) {
		var sortedDots = [];
		for (let i = 0; i < this.dice.length; i++) {
			sortedDots.push(this.dice[i].getDots());
		}
		sortedDots.sort();

		if (smallStraight) {
			if (sortedDots[0] === 1 && sortedDots[1] === 2 && sortedDots[2] === 3 && sortedDots[3] === 4 && sortedDots[4] === 5) {
				return 15;
			}
		} else {
			if (sortedDots[0] === 2 && sortedDots[1] === 3 && sortedDots[2] === 4 && sortedDots[3] === 5 && sortedDots[4] === 6) {
				return 20;
			}
		}
		return 0;
	}

	// Checks if the dice contains a full house
	checkFullHouse() {
		var occurences = [0, 0, 0, 0, 0, 0];
		var threes, pair;
		for (let i = 0; i < this.dice.length; i++) {
			occurences[this.dice[i].getDots() - 1]++;
		}

		for (let i = this.dice.length; i >= 0; i--) {
			if (occurences[i] >= 3) {
				threes = i + 1;
			}
		}

		for (let i = this.dice.length; i >= 0; i--) {
			if (occurences[i] >= 3) {
				threes = i + 1;
			}
		}

		for (let i = this.dice.length; i >= 0; i--) {
			if (threes && occurences[i] >= 2 && i != threes - 1) {
				pair = i + 1;
				return threes * 3 + pair * 2;
			}
		}

		return 0;
	}

	// Checks if the dice contains a yatzy
	checkYatzy() {
		var yatzy = false;
		var occurences = 0;
		for (let i = 6; i > 0; i--) {
			for (let j = 0; j < this.dice.length; j++) {
				if (this.dice[j].getDots() == i) {
					occurences++;
				}
			}
			if (occurences === 5) {
				return 50;
			}
			occurences = 0;
		}
		return 0;
	}

	// Summerize all the dots of the dice
	calcChance() {
		var points = 0;
		for (let i = 0; i < this.dice.length; i++) {
			points += this.dice[i].getDots();
		}
		return points;
	}

	// Summerizes the points of the first half of the column
	summerizeFirstHalf() {
		let sum = 0;
		let bonus = 0;
		let i = 0;
		$('.' + this.players[this.currentPlayer]).each(function () {
			if (i > 6) {
				return false;
			}
			if ($(this).attr('locked') == 'true') {
				sum += parseInt($(this).text());
			}
			i++;
		});

		// If the number of points is equal or greater than 63 a bonus is added
		if (sum >= 63) {
			bonus = 50;
		}

		return [sum, bonus];
	}

	// Summerizes all the points in a column
	summerizeWholeColumn() {
		let sum = 0;
		let i = 0;
		$('.' + this.players[this.currentPlayer]).each(function () {
			if ($(this).attr('locked') == 'true' || i == 7) {
				sum += parseInt($(this).text());
			}
			i++;
		});
		return sum;
	}

	// Switches the player by resetting number of dice throws, enabled all the dice,
	// inserts sum of the points, advances the current turn and checks if the game is over
	switchPlayer() {
		this.diceThrow = 0;

		$('.btn').prop('disabled', false);

		let pointsFirstHalf = this.summerizeFirstHalf();
		let totalSum = this.summerizeWholeColumn();
		this.protocol.insertSumsAndBonus(pointsFirstHalf, totalSum);

		this.currentTurn++;
		if (this.currentTurn >= this.totalGameTurns) {
			this.endGame();
		} else {
			this.resetDice();

			if (this.currentPlayer + 1 === this.players.length) {
				this.currentPlayer = 0;
			} else {
				this.currentPlayer++;
			}
		}

	}

	// Resets all the dice
	resetDice() {
		for (let i = 0; i < this.dice.length; i++) {
			this.dice[i].resetDie();
		}
	}

	// If the game is over all the points are collected, presented to the player(s) and inserted into the DB
	endGame() {
		let points = [];
		for (let i = 0; i < this.players.length; i++) {
			points.push(parseInt($('.' + this.players[i] + '.18').text()));
		}

		let endResult = new EndResult();
		$('body').empty();
		endResult.display('body');
		endResult.showResult(this.players, points);

		var date = new Date();
		var currentTimeAndDate = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		this.insertGame(currentTimeAndDate);

		for (let i = 0; i < this.players.length; i++) {
			this.insertPlayer(this.players[i]);
		}

		let latestGameList = new LatestGameList();
		latestGameList.readLatestGame(() => {
			let latestGameId = latestGameList[0].id;

			for (let i = 0; i < this.players.length; i++) {
				this.insertGamesHasPlayers(latestGameId, this.players[i], points[i])
			}

			if (this.players.length > 1) {
				
				console.log(points);
				
				let highestPointsPos = 0;
				for (let i = 0; i < points.length; i++) {
					if (points[i] > points[highestPointsPos]) {
						highestPointsPos = i;
					}
				}
				console.log(highestPointsPos);
				console.log(this.players[highestPointsPos]);
				this.incrementWins(this.players[highestPointsPos]);
			}
		});
	}

	// Inserts a player into the DB
	insertPlayer(userName, callback) {
		this.db.insertPlayer({
			userName: userName,
			nbrOfWins: 0
		}, callback);
	}

	// Inserts a game into the DB
	insertGame(date, callback) {
		this.db.insertGame({
			date: date
		}, callback);
	}

	// Links players and games
	insertGamesHasPlayers(gameId, username, points, callback) {
		this.db.insertGamesHasPlayers({
			games_id: gameId,
			players_userName: username,
			points: points
		}, callback);
	}

	// Increments the number of wins for a player if number of players is greater than one
	incrementWins(player, callback) {
		this.db.incrementWins([player], {}, callback);
	}

	static get sqlQueries() {
		return {
			insertPlayer: `
				INSERT players SET ?
			`,
			insertGame: `
				INSERT games SET ? 
			`,
			insertGamesHasPlayers: `
				INSERT games_has_players SET ? 
			`,
			incrementWins: `
				UPDATE players 
				SET nbrOfWins = nbrOfWins + 1 
				WHERE userName = ?
			`
		}
	}

}
