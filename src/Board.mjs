import { shapeToString } from "./shape.mjs";

const EMPTY = ".";

class Block {
  #letter;
  constructor(letter) {
    this.#letter = letter;
  }
  blockAt(row, col) {
    return this.#letter;
  }
  letter() {
    return this.#letter;
  }

  width() {
    return 1;
  }

  height() {
    return 1;
  }
}

class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }
  blockAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }

  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }

  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }

  moveRight() {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }

  rotateRight() {
    return new MovableShape(this.#shape.rotateRight(), this.#row, this.#col);
  }

  nonEmptyBlock() {
    const points = [];
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EMPTY) {
          points.push({ row: row, col: col });
        }
      }
    }
    return points;
  }
}

export class Board {
  #width;
  #height;
  #falling = null;
  #immobile;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++)
      this.#immobile[row] = new Array(width).fill(EMPTY);
  }

  loadFromString(boardString) {
    const rows = boardString.replaceAll(" ", "").trim().split('\n');

    if (rows.length !== this.#height){
      throw new Error(`the number of rows does not match the height of the board`);
    }

    for (let row = 0; row < this.#height; row++) {
      const cells = rows[row].trim().split("");
      if (cells.length !== this.#width) {
        throw new Error(`the number of columns does not match the width of the board`);
      }
      for (let col = 0; col < this.#width; col++) {
        this.#immobile[row][col] = cells[col];
      }
    }
  }
  
  hasFalling() {
    return this.#falling !== null;
  }

  height() {
    return this.#height;
  }

  width() {
    return this.#width;
  }

  blockAt(row, col) {
    if (this.hasFalling()) {
      const block = this.#falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return this.#immobile[row][col];
  }

  drop(piece) {
    if (typeof piece === "string") {
      piece = new Block(piece);
    }
    if (this.hasFalling()) {
      throw new Error("another piece is already falling");
    }
    this.#falling = new MovableShape(
      piece,
      0,
      Math.floor((this.width() - piece.width()) / 2),
    );
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
      this.#stopFalling();
    } else {
      this.#falling = attempt;
    }
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveLeft();
    if (
      this.#hitsLeft(attempt) === false &&
      this.#hitsImmobile(attempt) === false
    ) {
      this.#falling = attempt;
    }
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveRight();
    if (!this.#hitsRight(attempt) && !this.#hitsImmobile(attempt))
      this.#falling = attempt;
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
      this.#stopFalling();
    } else {
      this.#falling = attempt;
    }
  }

  rotateRight() {
    this.#falling = this.#falling.rotateRight();
  }

  #hitsLeft(falling) {
    for (const block of falling.nonEmptyBlock()) {
      if (block.col < 0) {
        return true;
      }
    }
    return false;
  }

  #hitsRight(falling) {
    for (const block of falling.nonEmptyBlock()) {
      if (block.col >= this.width()) {
        return true;
      }
    }
    return false;
  }

  #hitsFloor(falling) {
    for (const block of falling.nonEmptyBlock()) {
      if (block.row >= this.height()) {
        return true;
      }
    }
    return false;
  }

  #hitsImmobile(falling) {
    for (const block of falling.nonEmptyBlock()) {
      if (this.#immobile[block.row][block.col] != EMPTY) {
        return true;
      }
    }
    return false;
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#falling = null;
  }

  toString() {
    return shapeToString(this);
  }
}
