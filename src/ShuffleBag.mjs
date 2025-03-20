export class ShuffleBag {
  #originalBlocks = null;
  #blocks = [];
  constructor(items) {
      this.#originalBlocks = [...items];
      this.#blocks = [];
      this.#refill();
  }

  #refill() {
    this.#blocks = [...this.#originalBlocks];
    this.#shuffle();
  }

  #shuffle() {
    for (let i = this.#blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#blocks[i], this.#blocks[j]] = [this.#blocks[j], this.#blocks[i]];
    }
  }

  _getBagLen() {
    return this.#blocks.length;
  }

  _getBag() {
    return this.#blocks;
  }

  next() {
    if (this.#blocks.length === 0) {
      this.#refill();
    }
      return this.#blocks.pop();
    }
  }
