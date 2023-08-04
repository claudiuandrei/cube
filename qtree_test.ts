import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import QuadTree, { createBox, createCircle } from "./qtree.ts";

Deno.test("QuadTree Creation - create an empty QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  assertEquals(tree.size, 0);
});

Deno.test("QuadTree Creation - create a QuadTree with initial entries", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  entries.forEach((point) => {
    assertEquals(tree.has(point), true);
    assertEquals(tree.get(point), 1);
  });
});

Deno.test("Set Method - add a new point to an empty QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  tree.set(point, 1);
  assertEquals(tree.has(point), true);
  assertEquals(tree.get(point), 1);
});

Deno.test("Set Method - add multiple distinct points to a QuadTree", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  entries.forEach((point) => tree.set(point, 1));
  entries.forEach((point) => {
    assertEquals(tree.has(point), true);
    assertEquals(tree.get(point), 1);
  });
});

Deno.test("Set Method - add the same point multiple times to a QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  tree.set(point, 1);
  tree.set(point, 2);
  assertEquals(tree.has(point), true);
  assertEquals(tree.get(point), 2);
});

Deno.test("Has and Get Methods - check for a point that was not added to the QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  assertEquals(tree.has(point), false);
  assertEquals(tree.get(point), undefined);
});

Deno.test("Has and Get Methods - check for a point that was added to the QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  tree.set(point, 1);
  assertEquals(tree.has(point), true);
  assertEquals(tree.get(point), 1);
});

Deno.test("Delete Method - delete a point that was not added to the QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  assertEquals(tree.delete(point), false);
});

Deno.test("Delete Method - delete a point that was added to the QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const point = { x: 1, y: 1 };
  tree.set(point, 1);
  assertEquals(tree.delete(point), true);
  assertEquals(tree.has(point), false);
  assertEquals(tree.get(point), undefined);
});

Deno.test("List and Iteration Methods - iterate over an empty QuadTree", () => {
  const tree = new QuadTree<number>({ x: 0, y: 0, width: 10, height: 10 });
  const points = Array.from(tree);
  assertEquals(points.length, 0);
});

Deno.test("List and Iteration Methods - iterate over a QuadTree with multiple points", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  const points = Array.from(tree);
  assertEquals(points.length, entries.length);
  points.forEach(([point, value], i) => {
    assertEquals(point, entries[i]);
    assertEquals(value, 1);
  });
});

Deno.test("List and Iteration Methods - list the points in a QuadTree using a non-intersecting bounding box", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  const checkIntersection = createBox({ x: 5, y: 5, width: 5, height: 5 });
  const points = Array.from(tree.list(checkIntersection));
  assertEquals(points.length, 0);
});

Deno.test("List and Iteration Methods - list the points in a QuadTree using a partially intersecting bounding box", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  const checkIntersection = createBox({ x: 0, y: 0, width: 2, height: 2 });
  const points = Array.from(tree.list(checkIntersection));
  assertEquals(points.length, 1);
  assertEquals(points[0][0], entries[0]);
  assertEquals(points[0][1], 1);
});

Deno.test("List and Iteration Methods - list the points in a QuadTree using a circle", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  const checkIntersection = createCircle({ x: 0, y: 0, radius: 2 });
  const points = Array.from(tree.list(checkIntersection));
  assertEquals(points.length, 1);
  assertEquals(points[0][0], entries[0]);
  assertEquals(points[0][1], 1);
});

Deno.test("ForEach Method - apply a function to each point-value pair in the QuadTree", () => {
  const entries = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
  const tree = new QuadTree<number>(
    { x: 0, y: 0, width: 10, height: 10 },
    entries.map((point) => [point, 1]),
  );
  let count = 0;
  tree.forEach((value, point) => {
    assertEquals(value, 1);
    assertEquals(point, entries[count]);
    count++;
  });
  assertEquals(count, entries.length);
});
