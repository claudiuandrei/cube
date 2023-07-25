import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import CircularList from "./circular.ts";

Deno.test("CircularList Creation - create an empty CircularList", () => {
  const list = new CircularList<number>();
  assertEquals(list.size, 0);
});

Deno.test("CircularList Creation - create a CircularList with initial entries", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  assertEquals(list.size, entries.length);
  assertEquals([...list], entries.reverse()); // Note: last pushed item is first
});

Deno.test("Push Method - push a new item to an empty CircularList", () => {
  const list = new CircularList<number>();
  list.push(1);
  assertEquals(list.size, 1);
  assertEquals(list.peek(), 1);
});

Deno.test("Push Method - push multiple items to a CircularList", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>();
  entries.forEach((entry) => list.push(entry));
  assertEquals(list.size, entries.length);
  assertEquals([...list], entries.reverse()); // Note: last pushed item is first
});

Deno.test("Pop Method - pop an item from a CircularList with one item", () => {
  const list = new CircularList<number>();
  list.push(1);
  const popped = list.pop();
  assertEquals(popped, 1);
  assertEquals(list.size, 0);
});

Deno.test("Pop Method - pop an item from a CircularList with multiple items", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  const popped = list.pop();
  assertEquals(popped, 3); // Note: last pushed item is first to be popped
  assertEquals(list.size, entries.length - 1);
});

Deno.test("Peek Method - peek an item from an empty CircularList", () => {
  const list = new CircularList<number>();
  const peeked = list.peek();
  assertEquals(peeked, undefined);
});

Deno.test("Peek Method - peek an item from a CircularList with multiple items", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  const peeked = list.peek();
  assertEquals(peeked, 3); // Note: last pushed item is first to be peeked
});

Deno.test("Clear Method - clear an empty CircularList", () => {
  const list = new CircularList<number>();
  list.clear();
  assertEquals(list.size, 0);
});

Deno.test("Clear Method - clear a CircularList with multiple items", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  list.clear();
  assertEquals(list.size, 0);
});

Deno.test("Size Property - check the size of an empty CircularList", () => {
  const list = new CircularList<number>();
  assertEquals(list.size, 0);
});

Deno.test("Size Property - check the size of a CircularList with multiple items", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  assertEquals(list.size, entries.length);
});

Deno.test("Iteration - iterate over an empty CircularList", () => {
  const list = new CircularList<number>();
  const items = [...list];
  assertEquals(items.length, 0);
});

Deno.test("Iteration - iterate over a CircularList with multiple items", () => {
  const entries = [1, 2, 3];
  const list = new CircularList<number>(entries);
  const items = [...list];
  assertEquals(items.length, entries.length);
  assertEquals(items, entries.reverse()); // Note: last pushed item is first
});
