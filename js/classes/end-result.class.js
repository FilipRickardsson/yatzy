class EndResult extends Base {

	constructor(propertyValues) {
		super(propertyValues);


	}

	showResult(endArr) {
		for (let i = 0; i < endArr.length; i += 2) {
			$('#result').append('<p>Player: ' + endArr[i] + '  -> Points: ' + endArr[i + 1] +
				'</p>');
		}
	}
}
