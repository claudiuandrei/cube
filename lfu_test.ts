import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import LFU from "./lfu.ts";

Deno.test("LFU Creation - create an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  assertEquals(lfu.size, 0);
});

Deno.test("LFU Creation - create a LFU with initial entries", () => {
  const lfu = new LFU<number, string>(3, [
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
  ]);
  assertEquals(lfu.size, 3);
  assertEquals([...lfu.values()], ["two", "three", "four"]);
});

Deno.test("LFU Get - get a value from an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  const value = lfu.get(1);
  assertEquals(value, undefined);
});

Deno.test("LFU Get - get a value from a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  const value = lfu.get(1);
  assertEquals(value, "one");
  assertEquals([...lfu.values()], ["two", "three", "one"]);
});

Deno.test("LFU Set - set a value into an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  lfu.set(1, "one");
  assertEquals(lfu.size, 1);
  assertEquals([...lfu.values()], ["one"]);
});

Deno.test("LFU Set - set a value into a LFU", () => {
  const lfu = new LFU<number, string>(3);
  lfu.set(1, "one").set(1, "one updated");
  assertEquals(lfu.size, 1);
  assertEquals([...lfu.values()], ["one updated"]);
});

Deno.test("LFU Set - set a value into a full LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  lfu.set(4, "four");
  assertEquals(lfu.size, 3);
  assertEquals([...lfu.values()], ["two", "three", "four"]);
});

Deno.test("LFU Peek - peek a value from an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  const value = lfu.peek(1);
  assertEquals(value, undefined);
});

Deno.test("LFU Peek - peek a value from a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  const value = lfu.peek(1);
  assertEquals(value, "one");
  assertEquals([...lfu.values()], ["one", "two", "three"]);
});

Deno.test("LFU Clear - clear an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  lfu.clear();
  assertEquals(lfu.size, 0);
});

Deno.test("LFU Clear - clear a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  lfu.clear();
  assertEquals(lfu.size, 0);
});

Deno.test("LFU Size - size of an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  assertEquals(lfu.size, 0);
});

Deno.test("LFU Size - size of a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  assertEquals(lfu.size, 3);
});

Deno.test("LFU Iteration - iterate over an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  assertEquals([...lfu], []);
});

Deno.test("LFU Iteration - iterate over a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  assertEquals([...lfu], [[1, "one"], [2, "two"], [3, "three"]]);
});

Deno.test("LFU forEach - forEach on an empty LFU", () => {
  const lfu = new LFU<number, string>(3);
  let count = 0;
  lfu.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("LFU forEach - forEach on a LFU", () => {
  const lfu = new LFU<number, string>(3, [[1, "one"], [2, "two"], [
    3,
    "three",
  ]]);
  let count = 0;
  lfu.forEach(() => count++);
  assertEquals(count, 3);
});
