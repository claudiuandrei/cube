import LinkedList from "./list.ts";

const ITEM_COUNT = 1e5;

// Benchmark the `append` method
Deno.bench("list append", () => {
  const list = new LinkedList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.append(i);
  }
});

// Benchmark the `prepend` method
Deno.bench("list prepend", () => {
  const list = new LinkedList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.prepend(i);
  }
});

// Benchmark the `delete` method
Deno.bench("list delete", () => {
  const list = new LinkedList<number>();
  const refs = Array(ITEM_COUNT).fill(0).map((_, i) => list.append(i));

  for (const ref of refs) {
    list.delete(ref);
  }
});

// Benchmark the iteration
Deno.bench("list iteration", () => {
  const list = new LinkedList<number>();
  for (let i = 0; i < 1e4; i++) {
    list.append(i);
  }
  for (const _ of list) {
    // Nothing happens here, just iterating
  }
});
