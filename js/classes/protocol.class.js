class Protocol extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	createColumn(players) {
		console.log('Protocol:', players);
		for (let i = 0; i < players.length; i++) {
			$('#tjo').find('thead').each(function () {
				$(this).find('th').last().after('<th>' + players[i] + '</th>');
			});

			$('#tjo').find('tr').each(function () {
				$(this).find('td').last().after('<td></td>');
			});
		}
	}

}
