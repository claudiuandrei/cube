import Queue from "./queue.ts";

class Buffer<T> extends Queue<T> {
  constructor(readonly maxSize: number = Infinity, entries?: readonly T[]) {
    // Initialize this by removing the first entries, they willbe evicted anyway
    super(entries?.slice(
      Math.max(entries.length - maxSize, 0),
    ));
  }

  push(value: T): this {
    // If we are at capacity remove first value
    if (super.size === this.maxSize) {
      super.pop();
    }

    // Insert at the end
    super.push(value);

    return this;
  }
}

export default Buffer;
