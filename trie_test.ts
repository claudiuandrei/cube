// trie_test.ts
import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Trie from "./trie.ts";

Deno.test("Trie Creation - empty trie", () => {
  const trie = new Trie<string, number>();
  assertEquals(trie.size, 0);
});

Deno.test("Trie Creation - trie with initial entries", () => {
  const trie = new Trie<string, number>([
    [["a"], 1],
    [["b"], 2],
  ]);
  assertEquals(trie.size, 2);
  assertEquals(trie.get(["a"]), 1);
  assertEquals(trie.get(["b"]), 2);
});

Deno.test("Trie Insertion - insert into empty trie", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.size, 1);
  assertEquals(trie.get(["a"]), 1);
});

Deno.test("Trie Insertion - insert multiple values", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1).set(["b"], 2);
  assertEquals(trie.size, 2);
  assertEquals(trie.get(["a"]), 1);
  assertEquals(trie.get(["b"]), 2);
});

Deno.test("Trie Insertion - insert duplicate keys with different values", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1).set(["a"], 2);
  assertEquals(trie.size, 1);
  assertEquals(trie.get(["a"]), 2);
});

Deno.test("Trie Access - get value from empty trie", () => {
  const trie = new Trie<string, number>();
  assertEquals(trie.get(["a"]), undefined);
});

Deno.test("Trie Access - get value with inserted key", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.get(["a"]), 1);
});

Deno.test("Trie Access - get value with non-existing key", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.get(["b"]), undefined);
});

Deno.test("Trie Presence Check - check key in empty trie", () => {
  const trie = new Trie<string, number>();
  assertEquals(trie.has(["a"]), false);
});

Deno.test("Trie Presence Check - check existing key", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.has(["a"]), true);
});

Deno.test("Trie Presence Check - check non-existing key", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.has(["b"]), false);
});

Deno.test("Trie Deletion - delete from empty trie", () => {
  const trie = new Trie<string, number>();
  assertEquals(trie.delete(["a"]), false);
});

Deno.test("Trie Deletion - delete non-existing key-value pair", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.delete(["b"]), false);
});

Deno.test("Trie Deletion - delete existing key-value pair", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.delete(["a"]), true);
  assertEquals(trie.get(["a"]), undefined);
});

Deno.test("Trie Clear - clear empty trie", () => {
  const trie = new Trie<string, number>();
  trie.clear();
  assertEquals(trie.size, 0);
});

Deno.test("Trie Clear - clear trie with entries", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  trie.clear();
  assertEquals(trie.size, 0);
  assertEquals(trie.get(["a"]), undefined);
});

Deno.test("Trie Size - size of empty trie", () => {
  const trie = new Trie<string, number>();
  assertEquals(trie.size, 0);
});

Deno.test("Trie Size - size of trie with one entry", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  assertEquals(trie.size, 1);
});

Deno.test("Trie List - list entries in empty trie", () => {
  const trie = new Trie<string, number>();
  const entries = [...trie.list([])];
  assertEquals(entries.length, 0);
});

Deno.test("Trie List - list entries in trie with one entry", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  const entries = [...trie.list([])];
  assertEquals(entries.length, 1);
  assertEquals(entries[0], [["a"], 1]);
});

Deno.test("Trie Match - match on empty trie", () => {
  const trie = new Trie<string, number>();
  const entries = [...trie.match(["a"])];
  assertEquals(entries.length, 0);
});

Deno.test("Trie Match - match with non-existing prefix", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  const entries = [...trie.match(["b"])];
  assertEquals(entries.length, 0);
});

Deno.test("Trie Match - match with existing prefix", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1).set(["a", "b"], 2);
  const entries = [...trie.match(["a", "b"])];
  assertEquals(entries.length, 2);
  assertEquals(entries[0], [["a"], 1]);
  assertEquals(entries[1], [["a", "b"], 2]);
});

Deno.test("Trie Match - match with common prefix", () => {
  const trie = new Trie<string, number>();
  trie.set(["a", "b"], 1).set(["a", "b", "c"], 2).set(["a", "b", "c", "d"], 3);
  const entries = [...trie.match(["a", "b", "c"])];
  assertEquals(entries.length, 2);
  assertEquals(entries[0], [["a", "b"], 1]);
  assertEquals(entries[1], [["a", "b", "c"], 2]);
});

Deno.test("Trie Iteration - iterate over empty trie", () => {
  const trie = new Trie<string, number>();
  const entries = [...trie];
  assertEquals(entries.length, 0);
});

Deno.test("Trie Iteration - iterate over trie with one entry", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  const entries = [...trie];
  assertEquals(entries.length, 1);
  assertEquals(entries[0], [["a"], 1]);
});

Deno.test("Trie forEach - forEach on empty trie", () => {
  const trie = new Trie<string, number>();
  let count = 0;
  trie.forEach(() => count++);
  assertEquals(count, 0);
});

Deno.test("Trie forEach - forEach on trie with one entry", () => {
  const trie = new Trie<string, number>();
  trie.set(["a"], 1);
  let count = 0;
  trie.forEach(() => count++);
  assertEquals(count, 1);
});
