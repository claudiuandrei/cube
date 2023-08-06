import type { Ref } from "./list.ts";

import LinkedList from "./list.ts";

type F<T> = [number, Set<T>];

class FQueue<T> {
  #order = new LinkedList<F<T>>();
  #store = new Map<T, Ref>();

  constructor(entries?: readonly T[]) {
    if (entries != null) {
      for (const value of entries) {
        this.push(value);
      }
    }
  }

  push(value: T): this {
    // If we have it, we need to increase the frequency
    const currentRef = this.#store.has(value)
      ? this.#store.get(value)!
      : this.#order.prepend([0, new Set([value])]);

    // Load the data
    const [cf, cv] = this.#order.get(currentRef)!;

    // Remove it from the current frequency
    cv.delete(value);

    // Load the next one
    const nextRef = this.#order.next(currentRef);

    // Remove the current node if it is empty
    if (cv.size === 0) {
      this.#order.delete(currentRef);
    }

    // If we have a next and the frequency is the next one, we just add it that queue
    if (nextRef != null) {
      const [nf, nv] = this.#order.get(nextRef)!;

      if (cf + 1 === nf) {
        nv.add(value);
        this.#store.set(value, nextRef);
        return this;
      }
    }

    // Create a new node if not
    const insertValue: F<T> = [cf + 1, new Set([value])];
    const insertRef = nextRef != null
      ? this.#order.prepend(
        insertValue,
        nextRef,
      )
      : this.#order.append(insertValue);

    this.#store.set(value, insertRef);

    return this;
  }

  pop(): T | undefined {
    // Get the head
    if (this.#order.head == null) {
      return undefined;
    }

    // Load the values
    const [, v] = this.#order.get(this.#order.head)!;

    // Remove the first value
    const value = v.values().next().value;

    // Remove it from the store
    this.#store.delete(value);

    // Remove it from the list
    v.delete(value);

    // Clean the list if the empty
    if (v.size === 0) {
      this.#order.delete(this.#order.head);
    }

    // Return the key
    return value;
  }

  peek(): T | undefined {
    // Get he head node
    if (this.#order.head == null) {
      return undefined;
    }

    // Load the values
    const [, v] = this.#order.get(this.#order.head)!;

    // Get the next key
    return v.values().next().value;
  }

  clear(): void {
    this.#store.clear();
    this.#order.clear();
  }

  get size(): number {
    return this.#store.size;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const [, v] of this.#order) {
      yield* v;
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

export default FQueue;
