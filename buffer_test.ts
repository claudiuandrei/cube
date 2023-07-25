import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Buffer from "./buffer.ts";

Deno.test("Buffer Creation - create an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  assertEquals(buffer.size, 0);
});

Deno.test("Buffer Creation - create a buffer with initial entries", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3, 4]);
  assertEquals(buffer.size, 3);
  assertEquals([...buffer.values()], [2, 3, 4]);
});

Deno.test("Buffer Push - push a value into an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  buffer.push(1);
  assertEquals(buffer.size, 1);
  assertEquals([...buffer.values()], [1]);
});

Deno.test("Buffer Push - push multiple values into the buffer", () => {
  const buffer = new Buffer<number>(3);
  buffer.push(1).push(2).push(3);
  assertEquals(buffer.size, 3);
  assertEquals([...buffer.values()], [1, 2, 3]);
});

Deno.test("Buffer Push - push a value into a full buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  buffer.push(4);
  assertEquals(buffer.size, 3);
  assertEquals([...buffer.values()], [2, 3, 4]);
});

Deno.test("Buffer Pop - pop a value from an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  const value = buffer.pop();
  assertEquals(value, undefined);
  assertEquals(buffer.size, 0);
});

Deno.test("Buffer Pop - pop a value from a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  const value = buffer.pop();
  assertEquals(value, 1);
  assertEquals(buffer.size, 2);
});

Deno.test("Buffer Peek - peek a value from an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  const value = buffer.peek();
  assertEquals(value, undefined);
});

Deno.test("Buffer Peek - peek a value from a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  const value = buffer.peek();
  assertEquals(value, 1);
  assertEquals(buffer.size, 3);
});

Deno.test("Buffer Clear - clear an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  buffer.clear();
  assertEquals(buffer.size, 0);
});

Deno.test("Buffer Clear - clear a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  buffer.clear();
  assertEquals(buffer.size, 0);
});

Deno.test("Buffer Size - size of an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  assertEquals(buffer.size, 0);
});

Deno.test("Buffer Size - size of a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  assertEquals(buffer.size, 3);
});

Deno.test("Buffer Iteration - iterate over an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  assertEquals([...buffer], []);
});

Deno.test("Buffer Iteration - iterate over a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  assertEquals([...buffer], [1, 2, 3]);
});

Deno.test("Buffer forEach - forEach on an empty buffer", () => {
  const buffer = new Buffer<number>(3);
  let count = 0;
  buffer.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("Buffer forEach - forEach on a buffer", () => {
  const buffer = new Buffer<number>(3, [1, 2, 3]);
  let count = 0;
  buffer.forEach(() => count++);
  assertEquals(count, 3);
});
