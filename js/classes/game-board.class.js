class GameBoard extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		this.currentPlayer = 0;
		this.totalGameTurns = this.players.length * 15;
		console.log('debug 3', this.totalGameTurns);
		this.currentTurn = 0;
		this.turns = 0; //A global variable to calculate the number of tens and check if they are three
	}

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

	rollTheDice() {
		for (let i = 0; i < this.dice.length; i++) {
			this.dice[i].rollTheDice();
		}
		var points = this.calcPotentialPoints();
		this.protocol.insertPotentialPoints(points, this.currentPlayer);
		this.turns++;

		if (this.turns === 3) {
			$('.btn').prop('disabled', true);
		}
	}

	createProtocol() {
		var protocol = new Protocol({
			players: this.players,
			gameboard: this
		});
		this.protocol = protocol;
		protocol.display('#protocolContainer');
		protocol.createColumn();
	}

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

		let sumFirstHalf = this.summerizeFirstHalf();
		points.splice(6, 0, 0);
		points.splice(7, 0, 0);
		points.push(0);

		return points;
	}

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
				console.log('Threes:', threes, 'Pair:	', pair);
				return threes * 3 + pair * 2;
			}
		}

		return 0;
	}

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

	calcChance() {
		var points = 0;
		for (let i = 0; i < this.dice.length; i++) {
			points += this.dice[i].getDots();
		}
		return points;
	}

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

		if (sum >= 63) {
			bonus = 50;
		}

		return [sum, bonus];
	}

	summerizeColumn() {
		let sum = 0;
		let i = 0;
		$('.' + this.players[this.currentPlayer]).each(function () {
			if (i !== 6 && i !== 17 && $(this).attr('locked') == 'true') {
				sum += parseInt($(this).text());
			}
			i++;
		});
		return sum;
	}

	switchPlayer() {
		this.turns = 0;

		$('.btn').prop('disabled', false);

		let pointsFirstHalf = this.summerizeFirstHalf();
		$('.' + this.players[this.currentPlayer] + '.7').empty();
		$('.' + this.players[this.currentPlayer] + '.7').append(pointsFirstHalf[0]);
		$('.' + this.players[this.currentPlayer] + '.8').empty();
		$('.' + this.players[this.currentPlayer] + '.8').append(pointsFirstHalf[1]);

		$('.' + this.players[this.currentPlayer] + '.18').empty();
		$('.' + this.players[this.currentPlayer] + '.18').append(this.summerizeColumn());

		this.currentTurn++;
		console.log('debug 2 current turn', this.currentTurn);
		if (this.currentTurn >= this.totalGameTurns) {
			this.endGame();
		} else {

			for (let i = 0; i < this.dice.length; i++) {
				this.dice[i].resetDie();
			}

			if (this.currentPlayer + 1 === this.players.length) {
				this.currentPlayer = 0;
			} else {
				this.currentPlayer++;
			}
		}

	}

	endGame() {
		let points = [];
		for (let i = 0; i < this.players.length; i++) {
			points.push(parseInt($('.' + this.players[i] + '.18').text()));
		}
		console.log('debug 1', points);
		console.log('debug 4', this.players);

		let endResult = new EndResult();
		$('body').empty();
		endResult.display('body');
		endResult.showResult(this.players, points);

		var dt = new Date();
		var currentTimeAndDate = dt.getDay() + '-' + dt.getMonth() + '-' + dt.getFullYear() + ' ' + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
		this.insertGame(currentTimeAndDate);

		for (let i = 0; i < this.players.length; i++) {
			//console.log(this.players[i]);
			this.insertPlayer(this.players[i]);
		}

		let latestGameList = new LatestGameList();
		latestGameList.readLatestGame(() => {
			let latestGameId = latestGameList[0].id;
			console.log('debug 5', latestGameList[0]);

			for (let i = 0; i < this.players.length; i++) {
				console.log('debug 6', latestGameId, this.players[i], points[i]);
				this.insertGamesHasPlayers(latestGameId, this.players[i], points[i])
			}
		});
	}

	insertPlayer(userName, callback) {
		this.db.insertPlayer({
			userName: userName,
			nbrOfWins: 0
		}, callback);
	}

	insertGame(date, callback) {
		this.db.insertGame({
			date: date
		}, callback);
	}

	insertGamesHasPlayers(gameId, username, points, callback) {
		this.db.insertGamesHasPlayers({
			games_id: gameId,
			players_userName: username,
			points: points
		}, callback);
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
			`
		}
	}

}
