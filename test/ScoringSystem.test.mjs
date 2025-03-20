import { beforeEach, describe, test, it } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring System", () => {
  let scoring;
  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("At level 0 a cleared line is worth 40 points", () => {
    scoring.linesCleared(1);
    expect(scoring.score).to.equal(40);
  });

  [
    { level: 0, expectedScore: 40 },
    { level: 1, expectedScore: 80 },
    { level: 2, expectedScore: 120 },
    { level: 3, expectedScore: 160 },
    { level: 4, expectedScore: 200 },
    { level: 5, expectedScore: 240 },
    { level: 6, expectedScore: 280 },
    { level: 7, expectedScore: 320 },
    { level: 8, expectedScore: 360 },
    { level: 9, expectedScore: 400 },
  ].forEach(({ level, expectedScore }) => {
    it("a cleared line works for all levels", () => {
      scoring.level = level;
      scoring.score = 0;
      scoring.linesCleared(1);
      expect(scoring.score).to.equal(expectedScore);
    });
  });

  // TODO: Expected score for 2 cleared lines per levels
  [
    { level: 0, expectedScore: 100 },
    { level: 1, expectedScore: 200 },
    { level: 2, expectedScore: 300 },
    { level: 3, expectedScore: 400 },
    { level: 4, expectedScore: 500 },
    { level: 5, expectedScore: 600 },
    { level: 6, expectedScore: 700 },
    { level: 7, expectedScore: 800 },
    { level: 8, expectedScore: 900 },
    { level: 9, expectedScore: 1000 },
  ].forEach(({ level, expectedScore }) => {
    it("a two cleared line works for all levels", () => {
      scoring.level = level;
      scoring.score = 0;
      scoring.linesCleared(2);
      expect(scoring.score).to.equal(expectedScore);
    });
  });

  // TODO: Expected score for 3 cleared lines per levels
  [
    { level: 0, expectedScore: 300 },
    { level: 1, expectedScore: 600 },
    { level: 2, expectedScore: 900 },
    { level: 3, expectedScore: 1200 },
    { level: 4, expectedScore: 1500 },
    { level: 5, expectedScore: 1800 },
    { level: 6, expectedScore: 2100 },
    { level: 7, expectedScore: 2400 },
    { level: 8, expectedScore: 2700 },
    { level: 9, expectedScore: 3000 },
  ].forEach(({ level, expectedScore }) => {
    it("a 3 cleared line works for all levels", () => {
      scoring.level = level;
      scoring.score = 0;
      scoring.linesCleared(3);
      expect(scoring.score).to.equal(expectedScore);
    });
  });

  // TODO: Expected score for 4 cleared lines per levels
  [
    { level: 0, expectedScore: 1200 },
    { level: 1, expectedScore: 2400 },
    { level: 2, expectedScore: 3600 },
    { level: 3, expectedScore: 4800 },
    { level: 4, expectedScore: 6000 },
    { level: 5, expectedScore: 7200 },
    { level: 6, expectedScore: 8400 },
    { level: 7, expectedScore: 9600 },
    { level: 8, expectedScore: 10800 },
    { level: 9, expectedScore: 12000 },
  ].forEach(({ level, expectedScore }) => {
    it("a 4 cleared line works for all levels", () => {
      scoring.level = level;
      scoring.score = 0;
      scoring.linesCleared(4);
      expect(scoring.score).to.equal(expectedScore);
    });
  });

  test("the score acumulate ", () => {
    scoring.linesCleared(1);
    scoring.linesCleared(2);
    scoring.linesCleared(4);
    scoring.linesCleared(2);
    expect(scoring.score).to.equal(1440);
  });

  test("The level increases by one every 10 lines cleared.", () => {
    scoring.linesCleared(2);
    scoring.linesCleared(3);
    expect(scoring.level).to.equal(0);
    scoring.linesCleared(4);
    scoring.linesCleared(2);
    expect(scoring.level).to.equal(1);
    scoring.linesCleared(4);
    scoring.linesCleared(4);
    scoring.linesCleared(3);
    expect(scoring.level).to.equal(2);
  });
});
