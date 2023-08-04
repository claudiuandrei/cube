import LRU from "./lru.ts";

const ITEM_COUNT = 1e4;
const BUFFER_SIZE = 1e3;

// Benchmark the `set` method
Deno.bench("lfu set", () => {
  const lfu = new LRU<number, number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    lfu.set(i, i);
  }
});

// Benchmark the `get` method
Deno.bench("lfu get", () => {
  const lfu = new LRU<number, number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    lfu.set(i, i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    lfu.get(i);
  }
});

// Benchmark the iteration
Deno.bench("lfu iteration", () => {
  const lfu = new LRU<number, number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    lfu.set(i, i);
  }
  for (const _ of lfu) {
    // Nothing happens here, just iterating
  }
});
