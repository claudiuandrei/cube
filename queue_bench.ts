import Queue from "./queue.ts";

const ITEM_COUNT = 1e5;

// Benchmark the `push` method
Deno.bench("queue push", () => {
  const queue = new Queue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    queue.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("queue pop", () => {
  const queue = new Queue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    queue.push(i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    queue.pop();
  }
});

// Benchmark the iteration
Deno.bench("queue iteration", () => {
  const queue = new Queue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    queue.push(i);
  }
  for (const _ of queue) {
    // Nothing happens here, just iterating
  }
});
