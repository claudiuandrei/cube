// This is a special kind of linked list, where there is a map that keeps track of the nodes
// The nodes are hidden from the user and cannot be accessed, but the user can insert after or before a node by reference

// Appending, Prepending, and Deleting are O(1), but also insertion after/before a specific node is O(1)

export type Ref = symbol;
export type Node<T> = {
  prev?: Ref;
  next?: Ref;
  value: T;
};

class LinkedList<T> {
  #head?: Ref;
  #tail?: Ref;
  #store: Map<Ref, Node<T>> = new Map();

  constructor(entries?: readonly T[]) {
    if (entries != null) {
      for (const value of entries) {
        this.append(value);
      }
    }
  }

  #insert(node: Node<T>): Ref {
    // Create a key
    const nodeRef = Symbol();

    // Add it to the map
    this.#store.set(nodeRef, node);

    // Link previous
    if (node.prev != null) {
      this.#store.get(node.prev)!.next = nodeRef;
    } else {
      this.#head = nodeRef;
    }

    // Link next
    if (node.next != null) {
      this.#store.get(node.next)!.prev = nodeRef;
    } else {
      this.#tail = nodeRef;
    }

    // Return the key
    return nodeRef;
  }

  append(value: T, prevRef = this.#tail): Ref {
    // Create the node
    const node = { value } as Node<T>;

    // Create the node
    if (prevRef != null) {
      const prev = this.#store.get(prevRef)!;
      node.prev = prevRef;
      node.next = prev.next;
    }

    // Create the node
    return this.#insert(node);
  }

  prepend(value: T, nextRef = this.#head): Ref {
    // Create the node
    const node = { value } as Node<T>;

    // Create the node
    if (nextRef != null) {
      const next = this.#store.get(nextRef)!;
      node.prev = next.prev;
      node.next = nextRef;
    }

    // Create the node
    return this.#insert(node);
  }

  prev(key: Ref): Ref | undefined {
    return this.#store.get(key)?.prev;
  }

  next(key: Ref): Ref | undefined {
    return this.#store.get(key)?.next;
  }

  has(key: Ref): boolean {
    return this.#store.has(key);
  }

  get(key: Ref): T | undefined {
    return this.#store.get(key)?.value;
  }

  delete(key: Ref): boolean {
    // We don't have the data
    if (!this.#store.has(key)) {
      return false;
    }

    // Get the node
    const node = this.#store.get(key)!;

    // Change the prev pointer
    if (node.prev != null) {
      this.#store.get(node.prev)!.next = node.next;
    } else {
      this.#head = node.next;
    }

    // Chang the next pointer
    if (node.next != null) {
      this.#store.get(node.next)!.prev = node.prev;
    } else {
      this.#tail = node.prev;
    }

    // Delete the node from the map
    return this.#store.delete(key);
  }

  clear(): void {
    this.#store.clear();
    this.#head = undefined;
    this.#tail = undefined;
  }

  get size(): number {
    return this.#store.size;
  }

  get head(): Ref | undefined {
    return this.#head;
  }

  get tail(): Ref | undefined {
    return this.#tail;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    // Start from the head
    let head = this.#head;

    // Iterate over the values until we reach the end
    while (head != null) {
      // Get the value
      const { value, next } = this.#store.get(head)!;

      // Go to the next value
      head = next;

      // Yield the value
      yield value;
    }
  }

  *keys(): IterableIterator<T> {
    yield* this[Symbol.iterator]();
  }

  *values(): IterableIterator<T> {
    yield* this[Symbol.iterator]();
  }

  *entities(): IterableIterator<[T, T]> {
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

export default LinkedList;
