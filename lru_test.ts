import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import LRU from "./lru.ts";

Deno.test("LRU Creation - create an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  assertEquals(lru.size, 0);
});

Deno.test("LRU Creation - create a LRU with initial entries", () => {
  const lru = new LRU<number, string>(3, [
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
  ]);
  assertEquals(lru.size, 3);
  assertEquals([...lru.values()], ["two", "three", "four"]);
});

Deno.test("LRU Get - get a value from an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  const value = lru.get(1);
  assertEquals(value, undefined);
});

Deno.test("LRU Get - get a value from a LRU", () => {
  const lru = new LRU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  const value = lru.get(1);
  assertEquals(value, "one");
  assertEquals([...lru.values()], ["two", "three", "one"]);
});

Deno.test("LRU Peek - peek a value from an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  const value = lru.peek(1);
  assertEquals(value, undefined);
});

Deno.test("LRU Peek - peek a value from a LRU", () => {
  const lru = new LRU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  const value = lru.peek(1);
  assertEquals(value, "one");
  assertEquals([...lru.values()], ["one", "two", "three"]);
});

Deno.test("LRU Set - set a value into an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  lru.set(1, "one");
  assertEquals(lru.size, 1);
  assertEquals([...lru.values()], ["one"]);
});

Deno.test("LRU Set - set a value into a LRU", () => {
  const lru = new LRU<number, string>(3);
  lru.set(1, "one").set(1, "one updated");
  assertEquals(lru.size, 1);
  assertEquals([...lru.values()], ["one updated"]);
});

Deno.test("LRU Set - set a value into a full LRU", () => {
  const lru = new LRU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  lru.set(4, "four");
  assertEquals(lru.size, 3);
  assertEquals([...lru.values()], ["two", "three", "four"]);
});

Deno.test("LRU Iteration - iterate over an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  assertEquals([...lru], []);
});

Deno.test("LRU Iteration - iterate over a LRU", () => {
  const lru = new LRU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  assertEquals([...lru], [[1, "one"], [2, "two"], [3, "three"]]);
});

Deno.test("LRU forEach - forEach on an empty LRU", () => {
  const lru = new LRU<number, string>(3);
  let count = 0;
  lru.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("LRU forEach - forEach on a LRU", () => {
  const lru = new LRU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  let count = 0;
  lru.forEach(() => count++);
  assertEquals(count, 3);
});
