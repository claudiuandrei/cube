class Heap<T> {
  #store: T[];
  #compareFn: (a: T, b: T) => number;

  constructor(
    compareFn: (a: T, b: T) => number,
    entries?: readonly T[],
  ) {
    this.#store = entries != null ? [...entries] : [];
    this.#compareFn = compareFn;
    this.#heapify();
  }

  push(value: T): this {
    this.#store.push(value);
    this.#bubble(this.size - 1);

    // Chainable
    return this;
  }

  pop(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }

    // Load the value from the top
    const value = this.#store[0];

    // Move the next value to the top
    this.#store[0] = this.#store[this.size - 1];
    this.#store.pop();
    this.#sink(0);

    // Return the value
    return value;
  }

  peek(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }

    return this.#store[0];
  }

  get size(): number {
    return this.#store.length;
  }

  #parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  #left(i: number): number {
    return 2 * i + 1;
  }

  #right(i: number): number {
    return 2 * i + 2;
  }

  #swap(i: number, j: number): void {
    [this.#store[i], this.#store[j]] = [this.#store[j], this.#store[i]];
  }

  // Build the heap
  #heapify(): void {
    const start = this.#parent(this.size - 1);
    for (let i = start; i >= 0; i--) {
      this.#sink(i);
    }
  }

  // Bubble the value based on comparison so the heap is valid
  #bubble(i: number): void {
    // Load the parent
    const parent = this.#parent(i);

    // Swap for the parent and bubble again
    if (
      parent >= 0 && this.#compareFn(this.#store[parent], this.#store[i]) > 0
    ) {
      this.#swap(i, parent);
      this.#bubble(parent);
    }
  }

  // Sink the value based on comparison so the heap is valid
  #sink(i: number): void {
    const left = this.#left(i);
    const right = this.#right(i);
    let current = i;

    // Compare the value between the parent, and the left and right children
    if (
      left < this.size &&
      this.#compareFn(this.#store[current], this.#store[left]) > 0
    ) {
      current = left;
    }

    if (
      right < this.size &&
      this.#compareFn(this.#store[current], this.#store[right]) > 0
    ) {
      current = right;
    }

    // If we need to swap the parent, then do it and sink again
    if (current !== i) {
      this.#swap(i, current);
      this.#sink(current);
    }
  }
}

export default Heap;
