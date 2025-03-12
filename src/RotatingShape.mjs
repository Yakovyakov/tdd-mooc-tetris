import { shapeToString } from "./shape.mjs";

function newSquareArray(size) {
  const newArray = new Array(size);
  for (let row = 0; row < size; row++) {
    newArray[row] = new Array(size);
  }
  return newArray;
}
export class RotatingShape {
  #shape;

  static fromString(shape) {
    return new RotatingShape(
      shape.replaceAll(' ', '').trim().split('\n').map((row) => row.split(""))
    );
  }

  constructor(shape) {
    this.#shape = shape;
  }
  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

  rotateRight(){
    const size = this.#shape.length;
    const shapeRotated = newSquareArray(size);
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        shapeRotated[row][column] = this.#shape[size - 1 - column][row];
      }
    }
    return new RotatingShape(shapeRotated);
  }
  
  rotateLeft(){
    const size = this.#shape.length;
    const shapeRotated = newSquareArray(size);
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        shapeRotated[size - 1 - column][row] = this.#shape[row][column];
      }
    }
    return new RotatingShape(shapeRotated);
  }
  blockAt(row,col){
    return this.#shape[row][col];
  }

  toString() {
    return shapeToString(this);
  }

}