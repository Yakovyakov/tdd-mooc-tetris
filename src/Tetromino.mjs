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

	static O_SHAPE = Tetromino.fromString(
    `.OO
    .OO
    ...`,
		0,
		1
	);

	static S_SHAPE = Tetromino.fromString(
    `.SS
    SS.
    S..`,
		0,
		2
	);

	#currentOrintation;
	#orientations;

	static fromString(initialShape, currentOrientation, orientationCount = 4) {
		const shape = RotatingShape.fromString(initialShape);
		const orientations=[shape,
			shape.rotateRight(),
			shape.rotateRight().rotateRight(),
			shape.rotateRight().rotateRight().rotateRight()
		].slice(0,orientationCount);
		return new Tetromino(currentOrientation, orientations);
	}

	constructor(currentOrientation, orientations) {
			this.#currentOrintation = (currentOrientation + orientations.length) % orientations.length;;
			this.#orientations = orientations;

	}

	#shape() {
		return this.#orientations[this.#currentOrintation]
	}
	rotateRight() {
		return new Tetromino(this.#currentOrintation + 1, this.#orientations);
	}
	
	rotateLeft() {
		return new Tetromino(this.#currentOrintation - 1, this.#orientations);
	}

	blockAt() {}
	
	toString() {
		return this.#shape().toString();
	}
	
}
