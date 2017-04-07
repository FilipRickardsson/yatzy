class EndResult extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	showResult(players, points) {
		for (let i = 0; i < players.length; i++) {
			$('#result').append('<p>Player: ' + players[i] + ' Points: ' + points[i] + '</p>');
		}
	}
	
}
