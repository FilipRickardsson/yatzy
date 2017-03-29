class Protocol extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	createColumn() {
		var tempPlayers = this.players;
		for (let i = 0; i < this.players.length; i++) {
			$('table').find('thead').each(function () {
				$(this).find('th').last().after('<th>' + tempPlayers[i] + '</th>');
			});

			$('table').find('tr').each(function () {
				$(this).find('td').last().after('<td class="' + tempPlayers[i] + '"></td>');
			});
		}
	}

	insertPotentialPoints(points, currentPlayer) {
		var tempPlayers = this.players;
		var i = 0;
		$('.' + tempPlayers[currentPlayer]).each(function () {
			if (i < points.length) {
				$(this).empty();
				$(this).append('<a href="#" data-click="selectPoints">' + points[i] + '</a>');
				i++;
			}
		});
	}
	
	selectPoints() {
		consol.log('selectPoints');
	}

}
