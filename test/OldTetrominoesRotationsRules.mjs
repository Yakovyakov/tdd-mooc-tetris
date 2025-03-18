import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


class TetrominoFactory {
  constructor(rotationStrategy) {
    this.rotationStrategy = rotationStrategy;
  }

  createFromString(initialShape, currentOrientation, orientationCount) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }
}

const tetrominoFactory = new TetrominoFactory('old Rotations Rules')
export class OldTetrominoesRotationsRules {

  static T_SHAPE = tetrominoFactory.createFromString(
    `.T.
     TTT
     ...`,
    0,
    4,
  );

  static I_SHAPE = tetrominoFactory.createFromString(
    `.....
     .....
     IIII.
     .....
     .....`,
    0,
    2,
  );

  static O_SHAPE = tetrominoFactory.createFromString(
    `.OO
     .OO
     ...`,
    0,
    1,
  );

  static S_SHAPE = tetrominoFactory.createFromString(
    `.SS
     SS.
     ...`,
    0,
    2,
  );

  static Z_SHAPE = tetrominoFactory.createFromString(
    `ZZ.
    .ZZ
    ...`,
    0,
    2,
  );

  static L_SHAPE = tetrominoFactory.createFromString(
    `.L.
    .L.
    .LL`,
    0,
    4,
  );

  static J_SHAPE = tetrominoFactory.createFromString(
    `.J.
    .J.
    JJ.`,
    0,
    4,
  );
}
