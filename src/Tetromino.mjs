import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
    0,
    4,
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`,
    0,
    2,
  );

  static O_SHAPE = Tetromino.fromString(
    `.OO
     .OO
     ...`,
    0,
    1,
  );

  static S_SHAPE = Tetromino.fromString(
    `.SS
     SS.
     ...`,
    0,
    2,
  );

  static Z_SHAPE = Tetromino.fromString(
    `ZZ.
    .ZZ
    ...`,
    0,
    2,
  );

  static L_SHAPE = Tetromino.fromString(
    `.L.
    .L.
    .LL`,
    0,
    4,
  );

  static J_SHAPE = Tetromino.fromString(
    `.J.
    .J.
    JJ.`,
    0,
    4,
  );

  #currentOrintation;
  #orientations;

  static fromString(initialShape, currentOrientation, orientationCount = 4) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }

  constructor(currentOrientation, orientations) {
    this.#currentOrintation =
      (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
    for (let i = 0; i < this.#orientations.length; i++)
      console.log(this.#orientations[i].toString());
  }

  #shape() {
    return this.#orientations[this.#currentOrintation];
  }
  rotateRight() {
    return new Tetromino(this.#currentOrintation + 1, this.#orientations);
  }

  rotateLeft() {
    return new Tetromino(this.#currentOrintation - 1, this.#orientations);
  }

  width() {
    return this.#shape().width();
  }

  height() {
    return this.#shape().height();
  }

  blockAt(row, col) {
    return this.#orientations[this.#currentOrintation].blockAt(row, col);
  }

  toString() {
    return this.#shape().toString();
  }
}
