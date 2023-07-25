import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import LinkedList from "./list.ts";

Deno.test("LinkedList Creation - create an empty LinkedList", () => {
  const list = new LinkedList<number>();
  assertEquals(list.size, 0);
});

Deno.test("LinkedList Creation - create a LinkedList with initial entries", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  assertEquals(list.size, 3);
});

Deno.test("LinkedList Append - append a value to an empty LinkedList", () => {
  const list = new LinkedList<number>();
  const ref = list.append(1);
  assertEquals(list.size, 1);
  assertEquals(list.get(ref), 1);
});

Deno.test("LinkedList Append - append a value to a LinkedList", () => {
  const list = new LinkedList<number>([1, 2]);
  const ref = list.append(3);
  assertEquals(list.size, 3);
  assertEquals(list.get(ref), 3);
});

Deno.test("LinkedList Prepend - prepend a value to an empty LinkedList", () => {
  const list = new LinkedList<number>();
  const ref = list.prepend(1);
  assertEquals(list.size, 1);
  assertEquals(list.get(ref), 1);
});

Deno.test("LinkedList Prepend - prepend a value to a LinkedList", () => {
  const list = new LinkedList<number>([2, 3]);
  const ref = list.prepend(1);
  assertEquals(list.size, 3);
  assertEquals(list.get(ref), 1);
});

Deno.test("LinkedList Get - get a value from an empty LinkedList", () => {
  const list = new LinkedList<number>();
  const value = list.get(Symbol());
  assertEquals(value, undefined);
});

Deno.test("LinkedList Get - get a value from a LinkedList", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  const ref = list.append(4);
  const value = list.get(ref);
  assertEquals(value, 4);
});

Deno.test("LinkedList Delete - delete a value from an empty LinkedList", () => {
  const list = new LinkedList<number>();
  const result = list.delete(Symbol());
  assertEquals(result, false);
});

Deno.test("LinkedList Delete - delete a value from a LinkedList", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  const ref = list.append(4);
  const result = list.delete(ref);
  assertEquals(result, true);
  assertEquals(list.size, 3);
});

Deno.test("LinkedList Clear - clear an empty LinkedList", () => {
  const list = new LinkedList<number>();
  list.clear();
  assertEquals(list.size, 0);
});

Deno.test("LinkedList Clear - clear a LinkedList", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  list.clear();
  assertEquals(list.size, 0);
});

Deno.test("LinkedList Iteration - iterate over an empty LinkedList", () => {
  const list = new LinkedList<number>();
  assertEquals([...list], []);
});

Deno.test("LinkedList Iteration - iterate over a LinkedList", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  assertEquals([...list], [1, 2, 3]);
});

Deno.test("LinkedList forEach - forEach on an empty LinkedList", () => {
  const list = new LinkedList<number>();
  let count = 0;
  list.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("LinkedList forEach - forEach on a LinkedList", () => {
  const list = new LinkedList<number>([1, 2, 3]);
  let count = 0;
  list.forEach(() => count++);
  assertEquals(count, 3);
});
