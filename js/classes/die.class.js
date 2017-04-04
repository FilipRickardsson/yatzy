class Die extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		this.enabled = true;
		this.dots = "\u2680";
		this.dieFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
		this.counter=0;
	}

	rollTheDice() {
		if (this.enabled) {
			this.dots = Math.floor(Math.random() * 6 + 1);
			$('#die' + this.id).html(this.dieFaces[this.dots - 1]);
		}
		this.counter++; //Calculate how many times we roll the dice to make it impossible to lock dice without rolling at least once
	}

	getDots() {
		return this.dots;
	}

	toggleDie() {
		if (this.counter===0) {
		console.log('You have to roll at least once!!');
		 $('body').append('<div style="color: red">You have to roll the dice at least once!!<div>'); 
		}
		else{
		this.enabled = !this.enabled;
		$('.die' + this.id).toggleClass("dieDisabled");
		}
	}

}
