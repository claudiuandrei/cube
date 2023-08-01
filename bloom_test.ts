import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import BloomFilter from "./bloom.ts";

Deno.test("BloomFilter Creation - create an empty BloomFilter", () => {
  const filter = new BloomFilter<string>();
  assertEquals(filter.size, 2 ** 16);
});

Deno.test("BloomFilter Creation - create a BloomFilter with initial entries", () => {
  const entries = ["test1", "test2", "test3"];
  const filter = new BloomFilter<string>(2 ** 16, entries);
  entries.forEach((entry) => {
    assertEquals(filter.has(entry), true);
  });
});

Deno.test("Add Method - add a new item to an empty BloomFilter", () => {
  const filter = new BloomFilter<string>();
  filter.add("test");
  assertEquals(filter.has("test"), true);
});

Deno.test("Add Method - add multiple distinct items to a BloomFilter", () => {
  const entries = ["test1", "test2", "test3"];
  const filter = new BloomFilter<string>();
  entries.forEach((entry) => filter.add(entry));
  entries.forEach((entry) => {
    assertEquals(filter.has(entry), true);
  });
});

Deno.test("Add Method - add the same item multiple times to a BloomFilter", () => {
  const filter = new BloomFilter<string>();
  filter.add("test");
  filter.add("test");
  assertEquals(filter.has("test"), true);
});

Deno.test("Has Method - check for an item that was not added to the BloomFilter", () => {
  const filter = new BloomFilter<string>();
  assertEquals(filter.has("test"), false);
});

Deno.test("Has Method - check for an item that was added to the BloomFilter", () => {
  const filter = new BloomFilter<string>();
  filter.add("test");
  assertEquals(filter.has("test"), true);
});

Deno.test("False Positives - check for an item that was not added to the BloomFilter", () => {
  const filter = new BloomFilter<string>(100, [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
  ]);
  // Depending on the hash functions and the size of the BloomFilter, "test6" may result in a false positive
  // Note: this is probabilistic and might not always result in a false positive
  const result = filter.has("test6");
  console.log(`False positive for "test6": ${result}`);
});

Deno.test("Non-existent Elements - check for multiple items that were not added to the BloomFilter", () => {
  const filter = new BloomFilter<string>(100, ["test1", "test2", "test3"]);
  ["test4", "test5", "test6"].forEach((test) => {
    assertEquals(filter.has(test), false);
  });
});

Deno.test("Large Number of Elements - add a large number of items to the BloomFilter", () => {
  const filter = new BloomFilter<string>(10 ** 6);
  for (let i = 0; i < 10 ** 6; i++) {
    filter.add(`test${i}`);
  }
  // Check a subset of items to see if they were correctly stored
  for (let i = 0; i < 100; i++) {
    assertEquals(filter.has(`test${i}`), true);
  }
});
