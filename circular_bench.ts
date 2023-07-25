import CircularList from "./circular.ts";

const ITEM_COUNT = 1e5;

// Benchmark the `push` method
Deno.bench("circular list push", () => {
  const list = new CircularList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("circular list pop", () => {
  const list = new CircularList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.push(i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.pop();
  }
});

// Benchmark the `clear` method
Deno.bench("circular list clear", () => {
  const list = new CircularList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.push(i);
  }
  list.clear();
});

// Benchmark the iteration
Deno.bench("circular list iteration", () => {
  const list = new CircularList<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    list.push(i);
  }
  for (const _ of list) {
    // Nothing happens here, just iterating
  }
});
