import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Heap from "./heap.ts";

Deno.test("Heap Creation - empty heap", () => {
  const heap = new Heap<number>((a, b) => a - b);
  assertEquals(heap.size, 0);
});

Deno.test("Heap Creation - heap with initial entries", () => {
  const heap = new Heap<number>((a, b) => a - b, [4, 1, 3, 2]);
  assertEquals(heap.size, 4);
  assertEquals(heap.peek(), 1);
});

Deno.test("Heap Creation - heap with custom compare function", () => {
  const heap = new Heap<number>((a, b) => b - a, [4, 1, 3, 2]);
  assertEquals(heap.size, 4);
  assertEquals(heap.peek(), 4);
});

Deno.test("Heap Insertion - insert into empty heap", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1);
  assertEquals(heap.size, 1);
  assertEquals(heap.peek(), 1);
});

Deno.test("Heap Insertion - insert multiple values", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(4).push(1).push(3).push(2);
  assertEquals(heap.size, 4);
  assertEquals(heap.peek(), 1);
});

Deno.test("Heap Insertion - insert duplicate values", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1).push(1).push(1);
  assertEquals(heap.size, 3);
  assertEquals(heap.peek(), 1);
});

Deno.test("Heap Deletion - pop from empty heap", () => {
  const heap = new Heap<number>((a, b) => a - b);
  const poppedValue = heap.pop();
  assertEquals(poppedValue, undefined);
});

Deno.test("Heap Deletion - pop from heap with one element", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1);
  const poppedValue = heap.pop();
  assertEquals(poppedValue, 1);
  assertEquals(heap.size, 0);
});

Deno.test("Heap Deletion - pop from heap with multiple elements", () => {
  const heap = new Heap<number>((a, b) => a - b, [4, 1, 3, 2]);
  const poppedValue = heap.pop();
  assertEquals(poppedValue, 1);
  assertEquals(heap.size, 3);
  // Check heap property after pop
  assertEquals(heap.peek(), 2);
});

Deno.test("Heap Deletion - pop until heap is empty", () => {
  const heap = new Heap<number>((a, b) => a - b, [4, 1, 3, 2]);
  heap.pop();
  heap.pop();
  heap.pop();
  heap.pop();
  const poppedValue = heap.pop();
  assertEquals(poppedValue, undefined);
});

Deno.test("Heap Peek - peek at empty heap", () => {
  const heap = new Heap<number>((a, b) => a - b);
  const peekValue = heap.peek();
  assertEquals(peekValue, undefined);
});

Deno.test("Heap Peek - peek at heap with one element", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1);
  const peekValue = heap.peek();
  assertEquals(peekValue, 1);
});

Deno.test("Heap Size - size of empty heap", () => {
  const heap = new Heap<number>((a, b) => a - b);
  assertEquals(heap.size, 0);
});

Deno.test("Heap Size - size of heap with one element", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1);
  assertEquals(heap.size, 1);
});
