class PotentialPoint extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	selectPoint() {
		this.protocol.selectPoint(this);
	}
	
}
