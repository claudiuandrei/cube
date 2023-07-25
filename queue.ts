// A stack is a FIFO (first in, first out) data structure
// Using a Set for the implementation as they are fast and easy to use for this usecase
// In order to make sure we allow non-unique values we are wrapping the value into an array
// The interface is iterable and consistent with the other data structures

class Queue<T> {
  #store = new Set<[T]>();

  constructor(entries?: readonly T[]) {
    if (entries != null) {
      for (const value of entries) {
        this.push(value);
      }
    }
  }

  get #head(): [T] {
    return this.#store.values().next().value;
  }

  push(value: T): this {
    // Create the current node
    this.#store.add([value]);

    // Chain
    return this;
  }

  pop(): T | undefined {
    // If there is no cursor, we don't have anything to pop
    if (this.#store.size === 0) {
      return undefined;
    }

    // Get the ref of the head
    const ref = this.#head;

    // Get the value from the ref
    const [value] = ref;

    // Delete the head
    this.#store.delete(ref);

    // Return the value
    return value;
  }

  peek(): T | undefined {
    return this.values().next().value;
  }

  clear(): void {
    this.#store.clear();
  }

  get size(): number {
    return this.#store.size;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const [value] of this.#store[Symbol.iterator]()) {
      yield value;
    }
  }

  *keys(): IterableIterator<T> {
    yield* this[Symbol.iterator]();
  }

  *values(): IterableIterator<T> {
    yield* this[Symbol.iterator]();
  }

  *entries(): IterableIterator<[T, T]> {
    for (const value of this[Symbol.iterator]()) {
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

export default Queue;
