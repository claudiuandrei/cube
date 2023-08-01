import BloomFilter, { djb2a, fnv1a, sdbm } from "./bloom.ts";

const ITEM_COUNT = 1e5;

// Benchmark "djb2a"
Deno.bench("djb2a", () => {
  for (let i = 0; i < ITEM_COUNT; i++) {
    djb2a(i.toString());
  }
});

// Benchmark "fnv1a"
Deno.bench("fnv1a", () => {
  for (let i = 0; i < ITEM_COUNT; i++) {
    fnv1a(i.toString());
  }
});

// Benchmark "sdbm"
Deno.bench("sdbm", () => {
  for (let i = 0; i < ITEM_COUNT; i++) {
    sdbm(i.toString());
  }
});

// Benchmark the `add` method
Deno.bench("bloom add", () => {
  const bloom = new BloomFilter<string>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    bloom.add(i.toString());
  }
});

// Benchmark the `has` method
Deno.bench("bloom has", () => {
  const bloom = new BloomFilter<string>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    bloom.add(i.toString());
  }
  for (let i = 0; i < ITEM_COUNT; i++) {
    bloom.has(i.toString());
  }
});
