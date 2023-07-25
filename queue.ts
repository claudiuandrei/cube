// A stack is a FIFO (first in, first out) data structure
// Using a Set for the implementation as they are fast and easy to use for this usecase
// In order to make sure we allow non-unique values we are wrapping the value into an array
// The interface is iterable and consistent with the other data structures

import CircularList from "./circular.ts";

class Queue<T> extends CircularList<T> {
  // We are overriding the push method to rotate the list to transform it into a queue
  // This is the only difference
  push(value: T): this {
    super.push(value);
    super.rotate();

    return this;
  }
}

export default Queue;
