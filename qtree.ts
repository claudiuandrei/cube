export type Point = {
  x: number;
  y: number;
};

export type Circle = {
  x: number;
  y: number;
  radius: number;
};

export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Quads<T> = [
  NW: QuadTree<T>,
  NE: QuadTree<T>,
  SE: QuadTree<T>,
  SW: QuadTree<T>,
];

export function createBox(box: Box) {
  return (range: Box): boolean => {
    const { x, y, width, height } = range;
    return !(x >= box.x + box.width ||
      x + width <= box.x ||
      y >= box.y + box.height ||
      y + height <= box.y);
  };
}

export function createCircle(circle: Circle) {
  return (range: Box): boolean => {
    const { x, y, width, height } = range;
    const dX = circle.x -
      Math.max(x, Math.min(circle.x, x + width));
    const dY = circle.y -
      Math.max(y, Math.min(circle.y, y + height));
    return (dX ** 2 + dY ** 2) < (circle.radius ** 2);
  };
}

class QuadTree<T> {
  #state?: { isLeaf: true; point: Point; value: T } | {
    isLeaf: false;
    nodes: Quads<T>;
  };
  #size = 0;

  constructor(readonly bounds: Box, entries?: readonly [Point, T][]) {
    if (entries != null) {
      for (const [point, value] of entries) {
        this.set(point, value);
      }
    }
  }

  #contains(point: Point): boolean {
    const { x, y, width, height } = this.bounds;
    return (point.x >= x &&
      point.x <= x + width &&
      point.y >= y &&
      point.y <= y + height);
  }

  ref(point: Point): QuadTree<T> | undefined {
    // Nothing in the node
    if (this.#state == null) {
      return;
    }

    // Point out of boundary, can't find
    if (!this.#contains(point)) {
      return;
    }

    // We have data, but it is not subdivided
    const { isLeaf } = this.#state;
    if (isLeaf) {
      return this;
    }

    const { nodes } = this.#state;

    // Find the data point
    for (const node of nodes) {
      const ref = node.ref(point);
      if (ref != null) {
        return ref;
      }
    }
  }

  // Read only size
  get size(): number {
    return this.#size;
  }

  set(point: Point, value: T): boolean {
    // Out of boundary, can't insert
    if (!this.#contains(point)) {
      return false;
    }

    // Nothing in the node, insert just the data
    if (this.#state == null) {
      this.#state = { isLeaf: true, point, value };
      this.#size += 1;

      // Succesfully inserted
      return true;
    }

    // We have data, but it is not subdivided
    const { isLeaf } = this.#state;
    if (isLeaf) {
      // Look at capacity, look at the point to make sure we handle duplicates
      // For now we don't handle duplicates
      if (point.x === this.#state.point.x && point.y === this.#state.point.y) {
        // Update the value
        this.#state = { isLeaf: true, point, value };

        // Return, we are done
        return true;
      }

      // Subdivide the node
      const { x, y, width: w, height: h } = this.bounds;
      const width = w / 2;
      const height = h / 2;

      const { point: p, value: v } = this.#state;
      const nodes: Quads<T> = [
        new QuadTree({ x: x, y: y, width, height }, [[p, v]]), // NW
        new QuadTree({ x: x + width, y: y, width, height }, [[p, v]]), // NE
        new QuadTree({ x: x + width, y: y + height, width, height }, [[p, v]]), // SE
        new QuadTree({ x: x, y: y + height, width, height }, [[p, v]]), // SW
      ];

      this.#state = { isLeaf: false, nodes };
    }

    const { nodes } = this.#state;

    // Insert the data into the correct node
    const inserted = nodes.some((node) => node.set(point, value));

    // Update the size if inserted
    if (inserted) {
      this.#size += 1;
    }

    // Return the inserted status
    return inserted;
  }

  has(point: Point): boolean {
    const node = this.ref(point);

    // Node not found
    if (node == null) {
      return false;
    }

    // Node is found and it is this node
    if (node === this) {
      return true;
    }

    // Check the new node recurseviely
    return node.has(point);
  }

  get(point: Point): T | undefined {
    const node = this.ref(point);

    // Node not found
    if (node == null) {
      return;
    }

    // Node is found and it is this node
    if (node === this) {
      const state = this.#state!;
      return (state.isLeaf) ? state.value : undefined;
    }

    // Check the new node recurseviely
    return node.get(point);
  }

  delete(point: Point): boolean {
    // Nothing in the node
    if (this.#state == null) {
      return false;
    }

    // Point out of boundary, can't delete
    if (!this.#contains(point)) {
      return false;
    }

    // We have data, but it is not subdivided
    const { isLeaf } = this.#state;
    if (isLeaf) {
      this.#state = undefined;
      this.#size -= 1;
      return true;
    }

    const { nodes } = this.#state;

    // Remove the data from the nodes
    if (nodes.some((node) => node.delete(point))) {
      // Update the size
      this.#size -= 1;

      // Rebalance if needed
      if (this.#size === 1 && this.#state.isLeaf === false) {
        const node = nodes.find((node) => node.size !== 0)!;
        const [k, v] = node.entries().next().value;
        this.#state = { isLeaf: true, point: k, value: v };
      }

      return true;
    }

    // Return the success status
    return false;
  }

  clear(): void {
    this.#state = undefined;
    this.#size = 0;
  }

  *list(
    intersects: (range: Box) => boolean,
  ): IterableIterator<[Point, T]> {
    // There are no points in this node
    if (this.#state == null) {
      return;
    }

    // This is not intersecting so we return
    if (!intersects(this.bounds)) {
      return;
    }

    // When finding a leaf node, return the value
    const { isLeaf } = this.#state;
    if (isLeaf) {
      const { point, value } = this.#state;

      // Check if the point intersects
      if (intersects({ x: point.x, y: point.y, width: 0, height: 0 })) {
        yield [point, value];
      }

      // Return the values of the subnodes
    } else {
      const { nodes } = this.#state as { isLeaf: false; nodes: Quads<T> };
      for (const node of nodes) {
        yield* node.list(intersects);
      }
    }
  }

  *[Symbol.iterator](): IterableIterator<[Point, T]> {
    yield* this.list(() => true);
  }

  *keys(): IterableIterator<Point> {
    for (const [point] of this) {
      yield point;
    }
  }

  *values(): IterableIterator<T> {
    for (const [, value] of this) {
      yield value;
    }
  }

  *entries(): IterableIterator<[Point, T]> {
    yield* this;
  }

  forEach(
    callbackFn: (value: T, point: Point, map: this) => void,
    thisArg?: unknown,
  ): void {
    for (const [point, value] of this) {
      callbackFn.call(thisArg, value, point, this);
    }
  }
}

export default QuadTree;
