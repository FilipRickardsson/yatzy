class PotentialPoint extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	// Calls a function in the Protocol class if this 
	// potential point was chosen in the protocol
	selectPoint() {
		this.protocol.selectPoint(this);
	}
	
}
