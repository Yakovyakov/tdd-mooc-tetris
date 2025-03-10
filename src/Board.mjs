class Block {
  letter;
  constructor(letter) {
    this.letter = letter;
  }
}

class MovableShape {
  row;
  col;

  constructor(row, col) {
     this.row = row;
    this.col = col;
  }
}

export class Board {
  width;
  height;
  immobile;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.immobile = new Array(height);
    for (let row = 0; row < height; row ++) 
      this.immobile[row] = new Array(width).fill('.');
  }

  blockAt (row,col) {
    return (this.immobile[row][col])
  }
  toString() {
    let s = '';
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.blockAt(row,col)
      }
      s += "\n";
    }
    return s;
  }
}
