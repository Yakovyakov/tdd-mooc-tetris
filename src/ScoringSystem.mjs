export class ScoringSystem {
  score = 0;
  level = 0;
  #rowsCleared = 0;

  update(rowsCleared) {

    switch (rowsCleared){
      case 1:
        this.score += (this.level + 1)*40;
        break;
      default:
        break;
    }
  }
}