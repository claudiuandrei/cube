export type Node<T> = {
  next: Node<T> | null;
  value: T;
};

class SLinkedList<T> {
  #size = 0;
  #head: Node<T> | null = null;

  constructor(entries?: readonly T[]) {
    if (entries != null) {
      for (const value of entries) {
        this.append(value);
      }
    }
  }

  private insert(
    next: Node<T> | null,
    value: T,
  ): Node<T> {
    const insert = { next, value };

    if (insert.prev != null) {
      insert.prev.next = insert;
    } else {
      this.#head = insert;
    }

    if (insert?.next != null) {
      insert.next.prev = insert;
    } else {
      this.#tail = insert;
    }

    this.#size++;

    return insert;
  }

  remove(node: Node<T>): void {
    if (node.prev != null) {
      node.prev.next = node.next;
    } else {
      this.#head = node.next;
    }

    if (node.next != null) {
      node.next.prev = node.prev;
    } else {
      this.#tail = node.prev;
    }

    this.#size--;
  }

  push(value: T): Node<T> {
  }

  pop(): T | undefined {
    if (this.#head == null) {
      return undefined;
    }

    // Get the value
    const value = this.#head.value;

    // Remove the head
    this.#head = this.#head.next;
    this.#size--;

    return value;
  }

  clear(): void {
    this.#head = null;
  }

  get size(): number {
    return this.#size;
  }

  get head(): Node<T> | null {
    return this.#head;
  }

  [Symbol.iterator](): IterableIterator<T> {
    let head = this.#head;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next(): IteratorResult<T> {
        // We are done
        if (head == null) {
          return { value: undefined, done: true };
        }

        // Go to the next value
        const { value, next } = head;
        head = next;

        // Call it again for the next value
        return { value, done: false };
      },
    };
  }

  keys(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  values(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  entities(): IterableIterator<[T, T]> {
    const iterator = this[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: (): IteratorResult<[T, T]> => {
        const { value, done } = iterator.next();
        return { value: [value, value], done };
      },
    };
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

export default SLinkedList;
