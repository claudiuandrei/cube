import FQueue from "./fqueue.ts";

class LFU<K, V> {
  #store = new Map<K, V>();
  #queue = new FQueue<K>();

  constructor(
    readonly maxSize: number,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    // We need to add it to the queue and store
    const data = entries?.slice(
      Math.max(entries.length - maxSize, 0),
    );

    // Setup the store and queue
    this.#store = new Map<K, V>(data);
    this.#queue = new FQueue<K>(data?.map(([key]) => key));
  }

  set(key: K, value: V): this {
    // Remove the previous key
    if (this.#store.size === this.maxSize) {
      // Load the key we need to evict
      const key = this.#queue.pop();

      // Delete it from the storage
      if (key != null) {
        this.#store.delete(key);
      }
    }

    // Set the new element
    this.#store.set(key, value);
    this.#queue.push(key);

    return this;
  }

  peek(key: K): V | undefined {
    return this.#store.get(key);
  }

  get(key: K): V | undefined {
    if (!this.#store.has(key)) {
      return undefined;
    }

    // Push it in the frequency queue
    this.#queue.push(key);

    // Get it from the storage
    return this.#store.get(key);
  }

  clear(): void {
    this.#store.clear();
    this.#queue.clear();
  }

  get size(): number {
    return this.#store.size;
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const key of this.#queue) {
      yield [key, this.#store.get(key)!];
    }
  }

  *keys(): IterableIterator<K> {
    yield* this.#queue;
  }

  *values(): IterableIterator<V> {
    for (const key of this.#queue) {
      yield this.#store.get(key)!;
    }
  }

  *entries(): IterableIterator<[K, V]> {
    yield* this;
  }

  forEach(
    callbackFn: (value: V, key: K, map: this) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this) {
      callbackFn.call(thisArg, value, key, this);
    }
  }
}

export default LFU;
