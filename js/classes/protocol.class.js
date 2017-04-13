class Protocol extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}
	
	// Creates columns for all the players
	createColumns() {
		var tempPlayers = this.players;
		for (let i = 0; i < this.players.length; i++) {
			$('table').find('thead').each(function () {
				$(this).find('th').last().after('<th class="bold">' + tempPlayers[i] + '</th>');
			});

			let j = 0;
			$('table').find('tr').each(function () {
				if (j !== 7 && j !== 8 && j !== 18) {
					$(this).find('td').last().after('<td class="' + tempPlayers[i] + ' ' + j + ' blue nopadding"  locked=false></td>');
				} else {
					$(this).find('td').last().after('<td class="' + tempPlayers[i] + ' ' + j + ' bold"  locked=false>0</td>');
				}
				j++;
			});
		}
	}

	// Inserts potential points in the column of the current player
	insertPotentialPoints(points, currentPlayer) {
		let tempPlayers = this.players;
		let protocol = this;
		this.currentPlayer = currentPlayer;
		let gameboard = this.gameboard;

		let i = 0;
		$('.' + tempPlayers[currentPlayer]).each(function () {
			if ($(this).attr('locked') == 'false' && i !== 6 && i !== 17 && i !== 7) {
				$(this).empty();
				var potentialPoint = new PotentialPoint({
					id: $(this).attr("class").split(' ')[1],
					points: points[i]
				});
				potentialPoint.protocol = protocol;
				potentialPoint.display(this);
			}
			i++;
		});
	}

	// Inserts the sums and bonus in the column of the current player
	insertSumsAndBonus(pointsFirstHalf, totalSum) {
		$('.' + this.players[this.currentPlayer] + '.7').empty();
		$('.' + this.players[this.currentPlayer] + '.7').append(pointsFirstHalf[0]);
		$('.' + this.players[this.currentPlayer] + '.8').empty();
		$('.' + this.players[this.currentPlayer] + '.8').append(pointsFirstHalf[1]);

		$('.' + this.players[this.currentPlayer] + '.18').empty();
		$('.' + this.players[this.currentPlayer] + '.18').append(totalSum);
	}

	// Finds the selected point and removes converts it from a potential points
	// to a locked point
	selectPoint(point) {
		let tempPlayers = this.players;
		let currentPlayer = this.currentPlayer;
		$('.' + tempPlayers[currentPlayer]).each(function () {
			if (point.id === $(this).attr("class").split(' ')[1]) {
				$(this).empty();
				$(this).append(point.points);
				$(this).addClass('success');
				$(this).removeClass('nopadding');
				$(this).attr('locked', 'true');
			}
		});
		this.clearPotentialPoints();
		this.gameboard.switchPlayer();
	}

	// Removes all other potential points when one was chosen
	clearPotentialPoints() {
		let tempPlayers = this.players;
		let currentPlayer = this.currentPlayer;
		let i = 0;

		$('.' + tempPlayers[currentPlayer]).each(function () {
			if ($(this).attr('locked') == 'false' && i !== 6 && i !== 17 && i !== 7) {
				$(this).empty();
			}
			i++;
		});
	}

}
