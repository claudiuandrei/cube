import FQueue from "./fqueue.ts";

const ITEM_COUNT = 1e4;

// Benchmark the `push` method
Deno.bench("fqueue push", () => {
  const fqueue = new FQueue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    fqueue.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("fqueue pop", () => {
  const fqueue = new FQueue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    fqueue.push(i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    fqueue.pop();
  }
});

// Benchmark the `clear` method
Deno.bench("fqueue clear", () => {
  const fqueue = new FQueue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    fqueue.push(i);
  }
  fqueue.clear();
});

// Benchmark the iteration
Deno.bench("fqueue iteration", () => {
  const fqueue = new FQueue<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    fqueue.push(i);
  }
  for (const _ of fqueue) {
    // Nothing happens here, just iterating
  }
});
