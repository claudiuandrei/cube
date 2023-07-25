import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Stack from "./stack.ts";

Deno.test("Stack Creation - create an empty stack", () => {
  const stack = new Stack<number>();
  assertEquals(stack.size, 0);
});

Deno.test("Stack Creation - create a stack with initial entries", () => {
  const stack = new Stack<number>([1, 2, 3]);
  assertEquals(stack.size, 3);
});

Deno.test("Stack Push - push a value into an empty stack", () => {
  const stack = new Stack<number>();
  stack.push(1);
  assertEquals(stack.size, 1);
  assertEquals([...stack.values()], [1]);
});

Deno.test("Stack Push - push multiple values into the stack", () => {
  const stack = new Stack<number>();
  stack.push(1).push(2).push(3);
  assertEquals(stack.size, 3);
  assertEquals([...stack.values()], [3, 2, 1]);
});

Deno.test("Stack Push - push a duplicate value into the stack", () => {
  const stack = new Stack<number>();
  stack.push(1).push(1);
  assertEquals(stack.size, 2);
  assertEquals([...stack.values()], [1, 1]);
});

Deno.test("Stack Pop - pop a value from an empty stack", () => {
  const stack = new Stack<number>();
  const value = stack.pop();
  assertEquals(value, undefined);
  assertEquals(stack.size, 0);
});

Deno.test("Stack Pop - pop a value from a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  const value = stack.pop();
  assertEquals(value, 3);
  assertEquals(stack.size, 2);
});

Deno.test("Stack Peek - peek a value from an empty stack", () => {
  const stack = new Stack<number>();
  const value = stack.peek();
  assertEquals(value, undefined);
});

Deno.test("Stack Peek - peek a value from a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  const value = stack.peek();
  assertEquals(value, 3);
  assertEquals(stack.size, 3);
});

Deno.test("Stack Clear - clear an empty stack", () => {
  const stack = new Stack<number>();
  stack.clear();
  assertEquals(stack.size, 0);
});

Deno.test("Stack Clear - clear a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  stack.clear();
  assertEquals(stack.size, 0);
});

Deno.test("Stack Size - size of an empty stack", () => {
  const stack = new Stack<number>();
  assertEquals(stack.size, 0);
});

Deno.test("Stack Size - size of a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  assertEquals(stack.size, 3);
});

Deno.test("Stack Iteration - iterate over an empty stack", () => {
  const stack = new Stack<number>();
  assertEquals([...stack], []);
});

Deno.test("Stack Iteration - iterate over a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  assertEquals([...stack], [3, 2, 1]);
});

Deno.test("Stack forEach - forEach on an empty stack", () => {
  const stack = new Stack<number>();
  let count = 0;
  stack.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("Stack forEach - forEach on a stack", () => {
  const stack = new Stack<number>([1, 2, 3]);
  let count = 0;
  stack.forEach(() => count++);
  assertEquals(count, 3);
});
