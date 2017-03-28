class EndResult extends Base {

	constructor(propertyValues) {
		super(propertyValues);

		var endResultList = new EndResultList();
		endResultList.readPlayerResult(() => {
			endResultList.display('#endPlayer')
		});


		



	}


	backToLobby() {
		$('body').empty();
		var lobby = new Lobby();
		lobby.display('body');
		lobby.groupSize();
	}

}
