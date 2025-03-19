import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";

import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveToRightWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Notify Cleared Lines", () => {
  let board;
  let lineCount;
  
  beforeEach(() => {
    board = new Board(10, 6);
    board.onClearLines = (clearLines) => {
        lineCount = clearLines;
    }

  });
  test('a board can clear Full non empty rows', () => {

    board.loadFromString(
      `..........
       5........5
       4444444444
       3333333333
       2222..2222
       1111111111`,
    );
    board._clearLines();
    expect(
      board.toString(),
      "a board have to clean rows 1,3 and 4",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       5........5
       2222..2222`,
    );
    expect(lineCount).to.equal(3);
  });

});

