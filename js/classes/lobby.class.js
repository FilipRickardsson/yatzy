class Lobby extends Base {

    constructor(propertyValues) {
        super(propertyValues);
    }

    groupSize() {
        var selectedChoice = $('#selectPlayer').find(":selected").text();
        console.log('selectedChoice:', selectedChoice);
        $(".inputFields").empty();
        for (let i = 0; i < selectedChoice; i++) {
            $(".inputFields").append(`
			     <div class="input-group">
			         <input type="text" class="form-control" placeholder="Player: " aria-describedby="basic-addon1" >
			     </div>`);
        }
    }

    startGame() {
        var temp = this.checkInputFields();
        console.log(temp);
        if (temp) {
            console.log("Start the bloody game!");
        } else {
            console.log("Error msg!");
        }
    }

    showStatistics() {
        console.log("showStatistics()");
    }

    checkInputFields() {
        var filled = true;
        $('input').each(function () {
            if ($(this).val().length === 0) {
                filled = false;
            }
        });
        return filled;
    }
}
