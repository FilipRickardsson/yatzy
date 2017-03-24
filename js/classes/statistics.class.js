class Statistics extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		var playerResultList = new PlayerResultList();
		playerResultList.readPlayerResult(() => {
			playerResultList.display('#playerResult')
		});
	}


}
