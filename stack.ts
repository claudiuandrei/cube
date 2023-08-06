// A stack is a LIFO (last in, first out) data structure
// Using an Array for the implementation as they are fast and easy to use for this usecase
// The interface is iterable and consistent with the other data structures

class Stack<T> {
  #store: T[] = [];

  constructor(entries?: readonly T[]) {
    if (entries != null) {
      for (const value of entries) {
        this.push(value);
      }
    }
  }

  push(value: T): this {
    // Create the current node
    this.#store.push(value);

    // Chain
    return this;
  }

  pop(): T | undefined {
    return this.#store.pop();
  }

  peek(): T | undefined {
    return this.#store[this.#store.length - 1];
  }

  clear(): void {
    this.#store = [];
  }

  get size(): number {
    return this.#store.length;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (let i = this.#store.length - 1; i >= 0; i--) {
      yield this.#store[i];
    }
  }

  *keys(): IterableIterator<T> {
    yield* this;
  }

  *values(): IterableIterator<T> {
    yield* this;
  }

  *entries(): IterableIterator<[T, T]> {
    for (const value of this) {
      yield [value, value];
    }
  }

  forEach(
    callbackFn: (value: T, key: T, map: this) => void,
    thisArg?: unknown,
  ): void {
    for (const value of this) {
      callbackFn.call(thisArg, value, value, this);
    }
  }
}

export default Stack;
