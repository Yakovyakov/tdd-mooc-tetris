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

  toString() {
    let s = '';
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.immobile[row][col]
      }
      s += "\n";
    }
    return s;
  }
}
