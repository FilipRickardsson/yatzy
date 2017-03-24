class Lobby extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	groupSize() {
		var selectedChoice = selectPlayer.selectedIndex;
		console.log(selectedChoice);
		$(".inputFields").empty();
		for (let i = 0; i < selectedChoice; i++) {
			$(".inputFields").append(`
			<div class="input-group">
			<input type="text" class="form-control" placeholder="Player: " aria-describedby="basic-addon1" >
			</div>`);
		}
	}
	startGame() {
		console.log("startGame()");
		console.log(this.checkInputFields());
	}

	showStatistics() {
		console.log("showStatistics()");
	}

	checkInputFields() {
		var filled = true;
		$('input').each(function () {
			if ($(this).val().length === 0) {
				filled = false;
				return filled;
			}
		});
		return filled;
	}
}
