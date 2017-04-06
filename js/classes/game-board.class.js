class GameBoard extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		this.currentPlayer = 0;
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

		points.splice(6, 0, "Not implemented");
		points.splice(7, 0, "Not implemented");
		points.push("Not implemented");

		console.log('Points: ', points);
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

	switchPlayer() {
		this.turns = 0;
		$('.btn').prop('disabled', false);
		
		for(let i = 0; i < this.dice.length; i++) {
			this.dice[i].resetDie();
		}

		if (this.currentPlayer + 1 === this.players.length) {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer++;
		}
	}

	scorePlayers(id, userName, points) {
		var testArr = [1, 1337, 250];
		this.db.scorePlayers({

			id: testArr[0],
			userName: testArr[1],
			points: testArr[2]

		})
	}

	scoreGames(id, date) {
		this.db.scoreGames({
			id: id,
			date: date
		})
	}

	scoreEndGames(userName, point) {
		var endArr = [];
		endArr.push(userName);
		endArr.push(point);
		console.log(endArr);
	}

	gamesHasPlayers(games_id, players_id) {
		this.db.gamesHasPlayers({
			games_id: games_id,
			players_id: players_id
		})
	}

	static get sqlQueries() {
		return {
			scorePlayers: `
				INSERT players SET ?
				`,
			scoreGames: `
				INSERT games SET ? `,

			gamesHasPlayers: `
				INSERT games_has_players SET ? `
		}
	}

}
