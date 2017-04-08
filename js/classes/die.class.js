class Die extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		this.locked = true;
		this.dots = "\u2680";
		this.dieFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
		this.counter = 0;
	}

	rollTheDie() {
		$('.die' + this.id).removeClass("dieDisabled");
		
		$('#errorMessage').remove(); //to delete the error message if the user rolls the dice so it is not shown anymore
		if (this.locked) {
			this.dots = Math.floor(Math.random() * 6 + 1);
			$('#die' + this.id).html(this.dieFaces[this.dots - 1]);
		}
		this.counter++; //Calculate how many times we roll the dice to make it impossible to lock dice without rolling at least once
	}

	getDots() {
		return this.dots;
	}

	toggleDie() {
		if (this.counter === 0) {
			$('#errorMessage').remove();
		} else {
			this.locked = !this.locked;
			$('.die' + this.id).toggleClass("dieLocked");
		}
	}
	
	resetDie() {
		this.counter = 0;
		$('.die' + this.id).removeClass("dieLocked");
		$('.die' + this.id).addClass("dieDisabled");
		
		this.locked = true;
	}

}
