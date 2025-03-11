export class RotatingShape {
  #shape;

  static fromString(shape) {
    return new RotatingShape(
      shape.split("\n").map((row) => row.split(""))
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

}