class Die extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		this.locked = true;
		this.dots = "\u2680";
		this.dieFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
		this.counter = 0;
	}

	// Rolls the die and shows a random number of dots
	rollTheDie() {
		$('.die' + this.id).removeClass("dieDisabled");

		if (this.locked) {
			this.dots = Math.floor(Math.random() * 6 + 1);
			$('#die' + this.id).html(this.dieFaces[this.dots - 1]);
		}
		this.counter++; //Calculate how many times we roll the dice to make it impossible to lock dice without rolling at least once
	}

	// Returns the current number of dots
	getDots() {
		return this.dots;
	}

	// Toggles if the die is locked or not
	toggleDie() {
		if (this.counter !== 0) {
			this.locked = !this.locked;
			$('.die' + this.id).toggleClass("dieLocked");
		}
	}

	// Resets the die to a default state
	resetDie() {
		this.counter = 0;
		$('.die' + this.id).removeClass("dieLocked");
		$('.die' + this.id).addClass("dieDisabled");

		this.locked = true;
	}

}
