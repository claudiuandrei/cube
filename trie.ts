// Setup the node of the trie
type Tree<K, V> = [Map<K, Tree<K, V>>, V?];

// Breadth first traversal for the node that is returning an iterator
/*
function* bfs<K, V>(
  node: Tree<K, V>,
  prefix: K[],
): IterableIterator<[K[], V]> {
  const queue = new Queue<
    [Tree<K, V>, K[]]
  >([[node, prefix]]);

  while (queue.size > 0) {
    // A list of nodes, a value node maybe -> If value node, return the value
    // Else go to the next node and find the node
    const current = queue.pop();

    // We are done, no more iterators
    if (current == null) {
      return;
    }

    // Get the current path/keys and node
    const [[subtree, value], keys] = current;

    for (const [k, v] of subtree) {
      queue.push([v as Tree<K, V>, [...keys, k]]);
    }

    if (value !== undefined) {
      yield [keys, value];
    }
  }
}
*/

// Depth first traversal for the node that is returning an iterator
function* dfs<K, V>(
  node: Tree<K, V>,
  prefix: K[],
): IterableIterator<[K[], V]> {
  const [subtree, value] = node;

  if (value !== undefined) {
    yield [prefix, value];
  }

  if (subtree.size === 0) {
    return;
  }

  for (const [k, v] of subtree) {
    yield* dfs(v, prefix.concat(k));
  }
}

// Traverse node by path
function* traverse<K, V>(
  node: Tree<K, V>,
  keys: K[],
  index = 0,
): IterableIterator<[K[], V]> {
  // We are done once we reach the end of the keys
  if (index > keys.length) {
    return;
  }

  // Load the data from the node
  const [subtree, value] = node;

  if (value !== undefined) {
    yield [keys.slice(0, index), value];
  }

  const k = keys[index];
  if (subtree.has(k)) {
    yield* traverse(subtree.get(k)!, keys, index + 1);
  }
}

class Trie<K, V> {
  #head: Tree<K, V> = [new Map()];
  #size = 0;

  constructor(entries?: readonly [K[], V][]) {
    if (entries != null) {
      for (const [keys, value] of entries) {
        this.set(keys, value);
      }
    }
  }

  // Helper function to find the node based on a path
  #find(keys: K[]): Tree<K, V> | undefined {
    let node = this.#head;

    // Iterate over the keys
    for (const key of keys) {
      // Load the subtree
      const [subtree] = node;

      // Get the child node
      if (!subtree.has(key)) {
        return undefined;
      }

      // Go to the next level
      node = subtree.get(key)!;
    }

    return node;
  }

  set(keys: K[], value: V): this {
    // Start at the head
    let node = this.#head;

    // Iterate over the keys to find the node where to insert
    for (const key of keys) {
      // Load the subtree
      const [subtree] = node;

      // Create a child node if we don't have one
      if (!subtree.has(key)) {
        subtree.set(key, [new Map()]);
      }

      // Go to the next level
      node = subtree.get(key)!;
    }

    // If this is new, we increase the size
    if (node[1] === undefined) {
      this.#size++;
    }

    // Set the value on the value
    node[1] = value;

    // Chain
    return this;
  }

  get(keys: K[]): V | undefined {
    // Start at the head
    const node = this.#find(keys);

    // Get the value from the node
    return node?.[1];
  }

  has(keys: K[]): boolean {
    return this.get(keys) !== undefined;
  }

  delete(keys: K[]): boolean {
    // Start at the head
    let node = this.#head;

    // Create a clean function
    // We start witht the assumption we need to remove everything
    let clean = () => {
      node[0].clear();
    };

    // Iterate over the keys
    for (const key of keys) {
      // Load the subtree
      const [subtree, value] = node;

      // Get the child node
      if (!subtree.has(key)) {
        return false;
      }

      // Check if the current subtree contains any other data
      const stale = subtree.size === 1 && value === undefined;

      // If we have other info, we update the assumption, only remove the key subtree
      if (!stale) {
        clean = () => {
          subtree.delete(key);
        };
      }

      // Go to the next level
      node = subtree.get(key)!;
    }

    // Get the value from the node
    node[1] = undefined;

    // Reduce the size
    this.#size--;

    // Clean only if this is empty
    if (node[0].size === 0) {
      clean();
    }

    // We deleted it
    return true;
  }

  clear(): void {
    this.#head = [new Map()];
    this.#size = 0;
  }

  get size(): number {
    return this.#size;
  }

  // This method will get all the values that partially match the path
  // eg. ancestor nodes plus the current node
  *match(keys: K[]): IterableIterator<[K[], V]> {
    yield* traverse(this.#head, keys);
  }

  // This will get all the values starting with the path,
  // eg. descendant nodes plus the current node
  *list(keys: K[]): IterableIterator<[K[], V]> {
    // Find the node
    const node = this.#find(keys);

    if (node === undefined) {
      return;
    }

    yield* dfs(node, keys);
  }

  *[Symbol.iterator](): IterableIterator<[K[], V]> {
    yield* this.list([]);
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
    yield* this[Symbol.iterator]();
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
