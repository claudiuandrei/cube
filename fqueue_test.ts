import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import FQueue from "./fqueue.ts";

Deno.test("Push operation and frequency order", () => {
  const queue = new FQueue<number>();
  queue.push(1); // [1]
  queue.push(2); // [1, 2]
  queue.push(2); // [1, 2]
  queue.push(3); // [1, 3, 2]
  queue.push(3); // [1, 2, 3]
  queue.push(3); // [1, 2, 3]
  queue.push(1); // [2, 1, 3]
  queue.push(1); // [2, 3, 1]
  assertEquals(queue.size, 3);
});

Deno.test("Pop operation and frequency order", () => {
  const queue = new FQueue<number>([1, 1, 2, 2, 2, 3, 3, 3, 3]);
  assertEquals(queue.pop(), 1);
  assertEquals(queue.pop(), 2);
  assertEquals(queue.pop(), 3);
  assertEquals(queue.size, 0);
});

Deno.test("Peek operation", () => {
  const queue = new FQueue<number>([1, 1, 2, 2, 2, 3, 3, 3, 3]);
  assertEquals(queue.peek(), 1);
  queue.pop();
  assertEquals(queue.peek(), 2);
});

Deno.test("Clear operation", () => {
  const queue = new FQueue<number>([1, 1, 2, 2, 2, 3, 3, 3, 3]);
  queue.clear();
  assertEquals(queue.size, 0);
  assertEquals(queue.peek(), undefined);
});

Deno.test("FQueue Creation - create an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  assertEquals(fqueue.size, 0);
});

Deno.test("FQueue Creation - create a fqueue with initial entries", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  assertEquals(fqueue.size, 3);
});

Deno.test("FQueue Push - push a value into an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  fqueue.push(1);
  assertEquals(fqueue.size, 1);
  assertEquals([...fqueue.values()], [1]);
});

Deno.test("FQueue Push - push multiple values into the fqueue", () => {
  const fqueue = new FQueue<number>();
  fqueue.push(1).push(2).push(3);
  assertEquals(fqueue.size, 3);
  assertEquals([...fqueue.values()], [1, 2, 3]);
});

Deno.test("FQueue Push - push a duplicate value into the fqueue", () => {
  const fqueue = new FQueue<number>();
  fqueue.push(1).push(1);
  assertEquals(fqueue.size, 1);
  assertEquals([...fqueue.values()], [1]);
});

Deno.test("FQueue Pop - pop a value from an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  const value = fqueue.pop();
  assertEquals(value, undefined);
  assertEquals(fqueue.size, 0);
});

Deno.test("FQueue Pop - pop a value from a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  const value = fqueue.pop();
  assertEquals(value, 1);
  assertEquals(fqueue.size, 2);
});

Deno.test("FQueue Peek - peek a value from an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  const value = fqueue.peek();
  assertEquals(value, undefined);
});

Deno.test("FQueue Peek - peek a value from a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  const value = fqueue.peek();
  assertEquals(value, 1);
  assertEquals(fqueue.size, 3);
});

Deno.test("FQueue Clear - clear an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  fqueue.clear();
  assertEquals(fqueue.size, 0);
});

Deno.test("FQueue Clear - clear a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  fqueue.clear();
  assertEquals(fqueue.size, 0);
});

Deno.test("FQueue Size - size of an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  assertEquals(fqueue.size, 0);
});

Deno.test("FQueue Size - size of a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  assertEquals(fqueue.size, 3);
});

Deno.test("FQueue Iteration - iterate over an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  assertEquals([...fqueue], []);
});

Deno.test("FQueue Iteration - iterate over a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  assertEquals([...fqueue], [1, 2, 3]);
});

Deno.test("FQueue forEach - forEach on an empty fqueue", () => {
  const fqueue = new FQueue<number>();
  let count = 0;
  fqueue.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("FQueue forEach - forEach on a fqueue", () => {
  const fqueue = new FQueue<number>([1, 2, 2, 3, 3, 3]);
  let count = 0;
  fqueue.forEach(() => count++);
  assertEquals(count, 3);
});
