class Protocol extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	createColumn() {
		var tempPlayers = this.players;
		let j = 0;
		for (let i = 0; i < this.players.length; i++) {
			$('table').find('thead').each(function () {
				$(this).find('th').last().after('<th>' + tempPlayers[i] + '</th>');
			});

			$('table').find('tr').each(function () {
				$(this).find('td').last().after('<td class="' + tempPlayers[i] + ' ' + j + '"></td>');
				j++;
			});
		}
	}

	insertPotentialPoints(points, currentPlayer) {
		let tempPlayers = this.players;
		let protocol = this;
		this.currentPlayer = currentPlayer;

		let i = 0;
		$('.' + tempPlayers[currentPlayer]).each(function () {
			if (i < points.length) {
				$(this).empty();
				var potentialPoint = new PotentialPoint({
					id: $(this).attr("class").split(' ')[1],
					points: points[i]
				});
				potentialPoint.protocol = protocol;
				potentialPoint.display(this);
				//$(this).append('<a href="#" data-click="selectPoints">' + points[i] + '</a>');
				i++;
			}
		});
	}

	selectPoint(point) {
		let tempPlayers = this.players;
		let currentPlayer = this.currentPlayer;
		$('.' + tempPlayers[currentPlayer]).each(function () {
//			console.log(point.id);
//			console.log($(this).attr("class").split(' ')[1]);
			if(point.id === $(this).attr("class").split(' ')[1]) {
				console.log(point.points);
			}
		});
	}

}
