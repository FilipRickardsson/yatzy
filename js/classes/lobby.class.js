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
        $('.error').addClass('hidden');
    }

    startGame() {
        var temp = this.checkInputFields();
        console.log(temp);
        if (temp) {
            var players = [];

            $("input").each(function () {
                players.push($(this).val());
            });

            //			console.log(players);

            $('body').empty();
            var gameBoard = new GameBoard({
                players: players
            });
            gameBoard.display('body');
            gameBoard.createDice();
            gameBoard.createProtocol();
        } else {
            $('.error').removeClass('hidden');
        }
    }

    showStatistics() {
        $('body').empty();
        var statistics = new Statistics();
        statistics.display('body');
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
