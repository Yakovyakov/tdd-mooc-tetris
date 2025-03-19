import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";

import { Board } from "../src/Board.mjs";

describe("Clear Lines", () => {

  let board;
  beforeEach(() => {
    board = new Board(10, 6);
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
  });
});