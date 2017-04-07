	class Protocol extends Base {

		constructor(propertyValues) {
			super(propertyValues);
		}

		createColumn() {
			var tempPlayers = this.players;
			for (let i = 0; i < this.players.length; i++) {
				$('table').find('thead').each(function () {
					$(this).find('th').last().after('<th class="bold">' + tempPlayers[i] + '</th>');
				});

				let j = 0;
				$('table').find('tr').each(function () {
					if (j !== 7 && j !== 8 && j !== 18) {
						$(this).find('td').last().after('<td class="' + tempPlayers[i] + ' ' + j + ' green"  locked=false></td>');
					} else {
						$(this).find('td').last().after('<td class="' + tempPlayers[i] + ' ' + j + ' bold"  locked=false>0</td>');
					}
					j++;
				});
			}
		}

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

		selectPoint(point) {
			let tempPlayers = this.players;
			let currentPlayer = this.currentPlayer;
			$('.' + tempPlayers[currentPlayer]).each(function () {
				if (point.id === $(this).attr("class").split(' ')[1]) {
					console.log(point.points);
					$(this).empty();
					$(this).append(point.points);
					$(this).addClass('success');
					$(this).attr('locked', 'true');
				}
			});
			this.clearPotentialPoints();
			this.gameboard.switchPlayer();
		}

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
