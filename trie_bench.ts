import Trie from "./trie.ts";

const ITEM_COUNT = 1e4;

// Define the number of nested levels
const k = 5;

// Create a function to generate keys
function generateKeys(i: number): number[] {
  const keys = [];
  for (let j = 0; j < k; j++) {
    keys.push(i + j);
  }
  return keys;
}

// Benchmark the `set` method
Deno.bench("trie set", () => {
  const trie = new Trie<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.set(generateKeys(i), i);
  }
});

// Benchmark the `get` method
Deno.bench("trie get", () => {
  const trie = new Trie<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.set(generateKeys(i), i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.get(generateKeys(i));
  }
});

// Benchmark the `delete` method
Deno.bench("trie delete", () => {
  const trie = new Trie<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.set(generateKeys(i), i);
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.delete(generateKeys(i));
  }
});

// Benchmark the `clear` method
Deno.bench("trie clear", () => {
  const trie = new Trie<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.set(generateKeys(i), i);
  }
  trie.clear();
});

// Benchmark the iteration
Deno.bench("trie iteration", () => {
  const trie = new Trie<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    trie.set(generateKeys(i), i);
  }
  for (const _ of trie) {
    // Nothing happens here, just iterating
  }
});
