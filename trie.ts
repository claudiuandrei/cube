class Trie<K, V> {
  #value: [false] | [true, V] = [false];
  #nodes: Map<K, Trie<K, V>> = new Map();
  #size = 0;

  constructor(entries?: readonly [K[], V][]) {
    if (entries != null) {
      for (const [keys, value] of entries) {
        this.set(keys, value);
      }
    }
  }

  ref(keys: K[]): Trie<K, V> | undefined {
    // Root value
    if (keys.length === 0) {
      return this;
    }

    // Get the first key
    const [key, ...rest] = keys;

    // Create the leaf if it doesn't exist
    if (!this.#nodes.has(key)) {
      return;
    }

    // Get the node
    const node = this.#nodes.get(key)!;

    // Find the next
    return node.ref(rest);
  }

  set(keys: K[], value: V): this {
    // Root value
    if (keys.length === 0) {
      // Check if the value was already set
      const [isSet] = this.#value;

      // Set the value
      this.#value = [true, value];

      // Increase the size if it wasn't set
      if (!isSet) {
        this.#size++;
      }

      // Chain
      return this;
    }

    // Get the first key
    const [key, ...rest] = keys;

    // Create the leaf if it doesn't exist
    if (!this.#nodes.has(key)) {
      this.#nodes.set(key, new Trie());
    }

    // Get the node
    const node = this.#nodes.get(key)!;

    // Get the old size
    const oldSize = node.size;

    // Set the value on the node
    node.set(rest, value);

    // Update the size
    this.#size += node.size - oldSize;

    // Chain
    return this;
  }

  get(keys: K[]): V | undefined {
    // Get the node
    const node = this.ref(keys);

    // Node was not found
    if (node === undefined) {
      return;
    }

    // Found the value, get it
    if (node === this) {
      return this.#value[1];
    }

    // Check the node recursively
    return node.get([]);
  }

  has(keys: K[]): boolean {
    // Get the node
    const node = this.ref(keys);

    // Node was not found
    if (node === undefined) {
      return false;
    }

    // Found the value, get it
    if (node === this) {
      return this.#value[0];
    }

    // Check the node recursively
    return node.has([]);
  }

  delete(keys: K[]): boolean {
    // Root value
    if (keys.length === 0) {
      const [isSet] = this.#value;

      // Delete the value if set
      if (isSet) {
        this.#value = [false];
        this.#size--;
        return true;
      }

      // Nothing to do if not set
      return false;
    }

    // Get the first key
    const [key, ...rest] = keys;

    // Get the node
    const node = this.#nodes.get(key);

    // Nothing to do if not found
    if (node === undefined) {
      return false;
    }

    // Attept to delete the node
    if (node.delete(rest)) {
      // Reduce the size
      this.#size--;

      // Delete the node if it's empty
      if (node.size === 0) {
        this.#nodes.delete(key);
      }

      // We deleted it
      return true;
    }

    // We didn't delete it
    return false;
  }

  clear(): void {
    this.#value = [false];
    this.#size = 0;
    this.#nodes.clear();
  }

  get size(): number {
    return this.#size;
  }

  // This method will get all the values that partially match the path
  // eg. ancestor nodes plus the current node
  *match(keys: K[]): IterableIterator<[K[], V]> {
    // Root value
    const [isSet, value] = this.#value;

    // Get the value if set
    if (isSet) {
      yield [[], value];
    }

    // Get the first key
    const [key, ...rest] = keys;

    // Get the node
    const node = this.#nodes.get(key);

    // Nothing to do if no node
    if (node === undefined) {
      return;
    }

    // Match next layers
    for (const [k, v] of node.match(rest)) {
      yield [[key, ...k], v];
    }
  }

  // This will get all the values starting with the path,
  // eg. descendant nodes plus the current node
  *list(keys: K[]): IterableIterator<[K[], V]> {
    // Find the root node based on the keys
    const node = this.ref(keys);

    // Nothing to do if no node
    if (node === undefined) {
      return;
    }

    // Traverse the node once found
    yield* node;
  }

  *[Symbol.iterator](): IterableIterator<[K[], V]> {
    // Get the value of the node if there is one
    if (this.has([])) {
      yield [[], this.get([])!];
    }

    // Traverse the other nodes
    for (const [key, node] of this.#nodes) {
      for (const [k, v] of node) {
        yield [[key, ...k], v];
      }
    }
  }

  *keys(): IterableIterator<K[]> {
    for (const [key] of this) {
      yield key;
    }
  }

  *values(): IterableIterator<V> {
    for (const [, value] of this) {
      yield value;
    }
  }

  *entries(): IterableIterator<[K[], V]> {
    yield* this;
  }

  forEach(
    callbackFn: (value: V, key: K[], map: this) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this) {
      callbackFn.call(thisArg, value, key, this);
    }
  }
}

export default Trie;
