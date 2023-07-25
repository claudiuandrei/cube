import Stack from "./stack.ts";

const ITEM_COUNT = 1e6;

// Benchmark the `push` method
Deno.bench("stack push", () => {
  const stack = new Stack<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    stack.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("stack pop", () => {
  const stack = new Stack<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    stack.push(i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    stack.pop();
  }
});

// Benchmark the `clear` method
Deno.bench("stack clear", () => {
  const stack = new Stack<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    stack.push(i);
  }
  stack.clear();
});

// Benchmark the iteration
Deno.bench("stack iteration", () => {
  const stack = new Stack<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    stack.push(i);
  }
  for (const _ of stack) {
    // Nothing happens here, just iterating
  }
});
