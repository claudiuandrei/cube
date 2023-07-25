import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Queue from "./queue.ts"; // Adjust path as necessary

Deno.test("Queue Creation - create an empty queue", () => {
  const queue = new Queue<number>();
  assertEquals(queue.size, 0);
});

Deno.test("Queue Creation - create a queue with initial entries", () => {
  const queue = new Queue<number>([1, 2, 3]);
  assertEquals(queue.size, 3);
});

Deno.test("Queue Push - push a value into an empty queue", () => {
  const queue = new Queue<number>();
  queue.push(1);
  assertEquals(queue.size, 1);
  assertEquals([...queue.values()], [1]);
});

Deno.test("Queue Push - push multiple values into the queue", () => {
  const queue = new Queue<number>();
  queue.push(1).push(2).push(3);
  assertEquals(queue.size, 3);
  assertEquals([...queue.values()], [1, 2, 3]);
});

Deno.test("Queue Push - push a duplicate value into the queue", () => {
  const queue = new Queue<number>();
  queue.push(1).push(1);
  assertEquals(queue.size, 2);
  assertEquals([...queue.values()], [1, 1]);
});

Deno.test("Queue Pop - pop a value from an empty queue", () => {
  const queue = new Queue<number>();
  const value = queue.pop();
  assertEquals(value, undefined);
  assertEquals(queue.size, 0);
});

Deno.test("Queue Pop - pop a value from a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  const value = queue.pop();
  assertEquals(value, 1);
  assertEquals(queue.size, 2);
});

Deno.test("Queue Peek - peek a value from an empty queue", () => {
  const queue = new Queue<number>();
  const value = queue.peek();
  assertEquals(value, undefined);
});

Deno.test("Queue Peek - peek a value from a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  const value = queue.peek();
  assertEquals(value, 1);
  assertEquals(queue.size, 3);
});

Deno.test("Queue Clear - clear an empty queue", () => {
  const queue = new Queue<number>();
  queue.clear();
  assertEquals(queue.size, 0);
});

Deno.test("Queue Clear - clear a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  queue.clear();
  assertEquals(queue.size, 0);
});

Deno.test("Queue Size - size of an empty queue", () => {
  const queue = new Queue<number>();
  assertEquals(queue.size, 0);
});

Deno.test("Queue Size - size of a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  assertEquals(queue.size, 3);
});

Deno.test("Queue Iteration - iterate over an empty queue", () => {
  const queue = new Queue<number>();
  assertEquals([...queue], []);
});

Deno.test("Queue Iteration - iterate over a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  assertEquals([...queue], [1, 2, 3]);
});

Deno.test("Queue forEach - forEach on an empty queue", () => {
  const queue = new Queue<number>();
  let count = 0;
  queue.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("Queue forEach - forEach on a queue", () => {
  const queue = new Queue<number>([1, 2, 3]);
  let count = 0;
  queue.forEach(() => count++);
  assertEquals(count, 3);
});
