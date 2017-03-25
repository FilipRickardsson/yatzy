class GameBoard extends Base {

	constructor(propertyValues) {
		super(propertyValues);
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

		console.log('debug 1');
		console.log('Dice:', this.dice);
	}

	rollTheDice() {
		for (let i = 0; i < this.dice.length; i++) {
			this.dice[i].rollTheDice();
		}
		this.calcPotentialPoints();
	}

	calcPotentialPoints() {
		var points = [];
		points = points.concat(this.calcFirstHalf());
		console.log('Points: ', points);
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

}