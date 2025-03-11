import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	
	static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`
  );

	#shape;

	constructor(initialShape) {
			this.#shape = initialShape;
	}

	fromString(initialShape){
		const shape = RotatingShape.fromString(initialShape);
		return new Tetromino(shape);
	}
	rotateRight() {

	}
	
	rotateLeft() {

	}

	blockAt() {}
	
	toString() {}
	
}
