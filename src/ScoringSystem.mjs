export class ScoringSystem {
  score = 0;
  level = 0;
  #rowsCleared = 0;

  update(rowsCleared) {

    switch (rowsCleared){
      case 1:
        this.score += (this.level + 1)*40;
        break;
      case 2:
        this.score += (this.level + 1)*100;
        break;
      case 3:
        this.score += (this.level + 1)*300;
        break;
      case 4:
        this.score += (this.level + 1)*1200;
        break;
      default:
        return;
    }
    this.#rowsCleared += rowsCleared;
    this.level = Math.floor(this.#rowsCleared / 10);

  }
}