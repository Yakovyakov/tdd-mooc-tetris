import { beforeEach, describe, test, it } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring System", () => {
  let scoring;
  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("At level 0 a cleared line is worth 40 points", () => {
    scoring.update(1);
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
      scoring.update(1);
      expect(scoring.score).to.equal(expectedScore);
    });
  });

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
      scoring.update(2);
      expect(scoring.score).to.equal(expectedScore);
    });
  });
});



