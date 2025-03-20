import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";

import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { shuffle } from "lodash";

describe("ShuffleBag Tests", () => {
  const elements = ['I', 'T', 'L', 'J', 'S', 'Z', 'O'];
  
  test("a Bag has elements", () => {
    const shuffleBag = new ShuffleBag(elements);

    expect(shuffleBag._getBagLen()).to.equal(elements.length);
  });

  test("the bag has the same elements that were introduced but randomly", () => {
    const shuffleBag = new ShuffleBag(elements);

    expect(shuffleBag._getBag()).not.toStrictEqual(elements);

    const sortBag = shuffleBag._getBag().sort();
    const sortElements = elements.sort();

    expect(sortBag).to.toStrictEqual(sortElements);

  });

  test("when an item is removed from the bag, the bag contains one less item.", () => {
    const shuffleBag = new ShuffleBag(elements);

    shuffleBag.next();

    expect(shuffleBag._getBagLen()).to.equal(elements.length - 1);
  });

  test("when the bag is empty and another item is requested, the bag is refilled.", () => {
    const shuffleBag = new ShuffleBag(elements);

    for (let i = 0; i < elements.length; i++){
      shuffleBag.next();
    }
    expect(shuffleBag._getBagLen()).to.equal(0);
    shuffleBag.next();
    expect(shuffleBag._getBagLen()).to.equal(elements.length - 1);
  });

  // TODO: Property-based tests
  describe("ShuffleBag Property-based tests", () => {
    
    test("The order of the pieces must be different after refilling", () => {
      const shuffleBag = new ShuffleBag(elements);

      const firstOrder = [];
      for (let i = 0; i < elements.length; i++) {
        firstOrder.push(shuffleBag.next());
      }

      const secondOrder = [];
      for (let i = 0; i < elements.length; i++) {
        secondOrder.push(shuffleBag.next());
      }
      expect(firstOrder).not.toEqual(secondOrder);
    });
  });
});
