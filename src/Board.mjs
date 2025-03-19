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

  rotateLeft() {
    return new MovableShape(this.#shape.rotateLeft(), this.#row, this.#col);
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
  onClearLine = null;

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
  
  #firstNonEmptyRow(piece){
    for (let row = 0; row < piece.height(); row++) {
      for (let col = 0; col < piece.width(); col++) {
        if (piece.blockAt(row, col) !== EMPTY) return row;
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
      0 - this.#firstNonEmptyRow(piece),
      Math.floor((this.width() - piece.width()) / 2),
    );
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (!this.#isAllowedMove(attempt)) {
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
    if (this.#isAllowedMove(attempt)) {
      this.#falling = attempt;
    }
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveRight();
    if (this.#isAllowedMove(attempt))
      this.#falling = attempt;
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (!this.#isAllowedMove(attempt)) {
      this.#stopFalling();
    } else {
      this.#falling = attempt;
    }
  }

  rotateRight() {
    if (!this.hasFalling()) {
      return;
    }
    this.#tryRotate(this.#falling.rotateRight());
  }

  rotateLeft() {
    if (!this.hasFalling()) {
      return;
    }
    this.#tryRotate(this.#falling.rotateLeft());
  }

  #tryRotate(attempt) {

    const candidates = [
      attempt,
      attempt.moveLeft(),
      attempt.moveRight(),
      attempt.moveRight().moveRight()
    ];
    for (let candidate of candidates ) {
      if (this.#isAllowedMove(candidate)){
        this.#falling = candidate;
        return;
      }
    }
  }

  #isOutsideBoard(falling) {
    for (const block of falling.nonEmptyBlock()) {
      if (block.row < 0 || block.row >= this.height() || block.col < 0 || block.col >= this.width()) {
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

  #isAllowedMove(falling) {
    return (!this.#isOutsideBoard(falling) && !this.#hitsImmobile(falling));
  }
  
  _clearLines() {
    let linesCleared = 0;
    for (let row = this.height() - 1; row >= 0; row--)
      if (this.#isNonEmptyFullRow(row)){
        this.#removeRow(row);
        row++;
        linesCleared++;
      }

      if (linesCleared && this.onClearLine) {
        this.onClearLine(linesCleared);
      }
  
  }

  #isNonEmptyFullRow(row) {
    return !this.#immobile[row].includes(EMPTY);
  }

  #removeRow(row) {

    // Delete the row by moving all the rows above it down
    for (let r = row; r > 0; r--) {
      this.#immobile[r] = [...this.#immobile[r - 1]];
    }
    // The top row is filled with empty cells
    this.#immobile[0] = new Array(this.#width).fill(EMPTY);

  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    
    this._clearLines();
    
    this.#falling = null;
  }

  toString() {
    return shapeToString(this);
  }
}
