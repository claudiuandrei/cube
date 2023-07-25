import Buffer from "./buffer.ts";

const ITEM_COUNT = 1e6;
const BUFFER_SIZE = 1e4;

// Benchmark the `push` method
Deno.bench("buffer push", () => {
  const buffer = new Buffer<number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    buffer.push(i);
  }
});

// Benchmark the `pop` method
Deno.bench("buffer pop", () => {
  const buffer = new Buffer<number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    buffer.push(i);
  }
  for (let i = 0; i < 1e3; i++) {
    buffer.pop();
  }
});

// Benchmark the iteration
Deno.bench("buffer iteration", () => {
  const buffer = new Buffer<number>(BUFFER_SIZE);
  for (let i = 0; i < ITEM_COUNT; i++) {
    buffer.push(i);
  }
  for (const _ of buffer) {
    // Nothing happens here, just iterating
  }
});
