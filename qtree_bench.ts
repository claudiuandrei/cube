import QuadTree from "./qtree.ts";

const ITEM_COUNT = 1e4;

// Benchmark the `set` method
Deno.bench("trie set", () => {
  const quadTree = new QuadTree<number>({
    x: 0,
    y: 0,
    width: ITEM_COUNT,
    height: ITEM_COUNT,
  });
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.set({ x: i, y: i }, i);
  }
});

// Benchmark the `get` method
Deno.bench("trie get", () => {
  const quadTree = new QuadTree<number>({
    x: 0,
    y: 0,
    width: ITEM_COUNT,
    height: ITEM_COUNT,
  });
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.set({ x: i, y: i }, i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.get({ x: i, y: i });
  }
});

// Benchmark the `delete` method
Deno.bench("trie delete", () => {
  const quadTree = new QuadTree<number>({
    x: 0,
    y: 0,
    width: ITEM_COUNT,
    height: ITEM_COUNT,
  });
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.set({ x: i, y: i }, i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.delete({ x: i, y: i });
  }
});

// Benchmark the iteration
Deno.bench("trie iteration", () => {
  const quadTree = new QuadTree<number>({
    x: 0,
    y: 0,
    width: ITEM_COUNT,
    height: ITEM_COUNT,
  });
  for (let i = 0; i < ITEM_COUNT; i++) {
    quadTree.set({ x: i, y: i }, i);
  }
  for (const _ of quadTree) {
    // Nothing happens here, just iterating
  }
});
