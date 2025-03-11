import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	
	static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
		 0,
		 4
  );

	static I_SHAPE = Tetromino.fromString(
    `.....
    .....
    IIII.
    .....
    .....`,
		0,
		2
	);

	#currentOrintation;
	#orientations;
	#shape;
	static fromString(initialShape, currentOrientation = 0, orientationCount = 4) {
		const shape = RotatingShape.fromString(initialShape);
		const orientations=[shape,
			shape.rotateRight(),
			shape.rotateRight().rotateRight(),
			shape.rotateRight().rotateRight().rotateRight()
		].slice(0,4);
		return new Tetromino(shape);
	}

	constructor(initialShape, currentOrientations, orientations) {
			this.#shape = initialShape;
	}

	rotateRight() {
		return new Tetromino(this.#shape.rotateRight());
	}
	
	rotateLeft() {
		return new Tetromino(this.#shape.rotateLeft());
	}

	blockAt() {}
	
	toString() {
		return this.#shape.toString();
	}
	
}
