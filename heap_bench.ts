import Heap from "./heap.ts";

const ITEM_COUNT = 1e5;

// Comparison function for the Heap
const compareFn = (a: number, b: number) => a - b;

// Benchmark the `push` method
Deno.bench("heap push", () => {
  const heap = new Heap<number>(compareFn);
  for (let i = 0; i < ITEM_COUNT; i++) {
    heap.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("heap pop", () => {
  const heap = new Heap<number>(compareFn);
  for (let i = 0; i < ITEM_COUNT; i++) {
    heap.push(i);
  }
  while (heap.size > 0) {
    heap.pop();
  }
});
