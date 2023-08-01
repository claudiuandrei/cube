# Cube Library Documentation

## Summary

The Cube library is a versatile, high-performance collection of utilities and
data structures designed to simplify the process of building complex software
applications. Written in TypeScript, this library offers a collection of robust,
well-documented classes that cover a wide range of use cases.

The goal behind the Cube library is to provide developers with a set of
foundational tools that can be used to solve complex problems more efficiently.
By doing so, it aims to streamline the process of software development, allowing
developers to focus more on the unique aspects of their applications and less on
reinventing common data structures.

One of the key advantages of the Cube library is its speed. The data structures
provided are highly optimized for performance, ensuring that operations are
performed as quickly as possible. This makes it a suitable choice for
performance-critical applications.

Moreover, the Cube library is designed with flexibility in mind. It not only
supports a wide range of use cases out of the box, but also allows developers to
easily extend and adapt these data structures to suit their specific needs.

Here's a snapshot of the main classes provided by the Cube library:

1. **Heap**: This class implements a heap data structure, commonly used in
   algorithms that require efficient operations on a collection of elements
   based on their priorities.

2. **Trie**: This class provides a Trie (or prefix tree) data structure, which
   is especially useful when dealing with string keys.

3. **LinkedList**: This class implements a doubly-linked list data structure,
   which is ideal for scenarios where efficient insertions and deletions are
   required.

4. **CircularList**: This class implements a circular linked list, which is
   useful in various applications like computer system resource allocation,
   navigation systems, and time-sharing problems in operating systems.

5. **Stack**: This class offers a stack data structure, following the LIFO (Last
   In First Out) principle. It is commonly used in scenarios like parsing,
   backtracking algorithms, and function call stacks.

6. **Queue, Buffer, and FQueue**: These classes provide different types of queue
   data structures, supporting use cases from basic FIFO operations to
   frequency-based queueing.

7. **LFU and LRU**: These classes implement LFU (Least Frequently Used) and LRU
   (Least Recently Used) caching algorithms, which are useful for optimizing
   memory use in applications that deal with large amounts of data.

8. **PubSub and Channel**: These classes facilitate the Publish-Subscribe
   messaging pattern, which is widely used in event-driven architectures.

9. **BloomFilter**: This class implements a Bloom filter, a probabilistic data
   structure that allows for fast membership queries, used in applications like
   web browsers, databases, caching systems, and network routers.

Each of these classes comes with thorough documentation, including interface
details and usage examples.

## Usage Deno

```ts
import {
  Buffer,
  Channel,
  CircularList,
  FQueue,
  Heap,
  LFU,
  LinkedList,
  LRU,
  PubSub,
  Queue,
  Stack,
  Trie,
} from "https://deno.land/x/cube/mod.ts";
```

## Usage Node

```js
import * as cube from "@denox/cube";
```

# Heap

Heap is a data structure that maintains a collection of elements, with the
operations to insert a new element, and remove and return the element with the
highest priority according to some comparison function. This is a class
implementation in TypeScript that is generic, meaning it can hold any data type,
not just numbers.

## Use Cases

Heaps are used in various algorithms and data structures for efficient
operations, including:

- **Priority Queues:** Heaps are commonly used to implement priority queues,
  where items are removed from the queue in order of their priority.
- **Heap Sort:** Heap sort is a comparison-based sorting algorithm that uses a
  binary heap data structure.
- **Graph Algorithms:** Many graph algorithms such as Dijkstra's and Prim's use
  heaps to select the next node to visit quickly.
- **Sliding Window Maximum:** In problems where we need to find the maximum
  element in every contiguous subarray of a given size, heaps offer an efficient
  solution.

## Interface Documentation

### Constructor

```typescript
constructor(compareFn: (a: T, b: T) => number, entries?: readonly T[])
```

Creates a new Heap. The `compareFn` parameter is a function used to determine
the order of elements. This function should return a positive number if `a` is
considered higher priority than `b`, a negative number if `b` is considered
higher priority than `a`, and `0` if they are considered equal priority.

The `entries` parameter is an optional array of elements to initialize the heap.
If provided, the heap is built from these elements.

### push

```typescript
push(item: T): this
```

Inserts a new item into the heap and returns the heap for chaining.

### pop

```typescript
pop(): T | undefined
```

Removes and returns the highest priority item according to the comparison
function. If the heap is empty, `undefined` is returned.

### peek

```typescript
peek(): T | undefined
```

Returns the highest priority item according to the comparison function without
removing it from the heap. If the heap is empty, `undefined` is returned.

### size

```typescript
get size(): number
```

Returns the number of elements in the heap.

## Examples

```typescript
import Heap from "./heap";

// Create a max heap
const maxHeap = new Heap<number>((a, b) => b - a);
maxHeap.push(1).push(2).push(3);
console.log(maxHeap.pop()); // Outputs: 3
console.log(maxHeap.size); // Outputs: 2

// Create a min heap from an existing array
const minHeap = new Heap<number>((a, b) => a - b, [3, 1, 4, 1, 5, 9]);
console.log(minHeap.pop()); // Outputs: 1
console.log(minHeap.peek()); // Outputs: 1
```

In the first example, a max heap is created where the highest number is
considered the highest priority. In the second example, a min heap is created
from an existing array where the lowest number is considered the highest
priority.

# Trie

Trie, also known as a prefix tree, is a tree-like data structure that is used to
store a collection where the keys are usually strings. Each node of the trie
denotes a common prefix of some keys. This particular class implementation in
TypeScript is generic and supports keys as arrays of arbitrary elements, not
just characters, with associated values.

## Use Cases

Trie data structures are useful in various scenarios, including:

- **Autocomplete:** Tries are often used in autocomplete features in IDEs, web
  browsers, and text editors. They allow fast retrieval of items given a prefix.
- **Spell Checkers:** Tries can be used to implement spell checkers. Given a
  word, the program can search in the trie to check if the word exists in the
  dictionary.
- **IP Routing:** Tries can be used in IP routing to store routing information,
  where the key can be an IP address split into parts.
- **Group by Prefix:** Given a list of keys, Tries can be used to group them by
  common prefixes.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly [K[], V][])
```

Creates a new Trie. The `entries` parameter is an optional array of key-value
pairs to initialize the trie. If provided, the trie is built from these
key-value pairs.

### set

```typescript
set(keys: K[], value: V): this
```

Inserts or updates a key-value pair in the trie.

### get

```typescript
get(keys: K[]): V | undefined
```

Returns the value associated with a key. If the key is not found, `undefined` is
returned.

### has

```typescript
has(keys: K[]): boolean
```

Checks if the trie contains a key.

### delete

```typescript
delete(keys: K[]): boolean
```

Removes a key-value pair from the trie. Returns `true` if the key was found and
deleted, `false` otherwise.

### clear

```typescript
clear(): void
```

Removes all key-value pairs from the trie.

### size

```typescript
get size(): number
```

Returns the number of key-value pairs in the trie.

### match

```typescript
*match(keys: K[]): IterableIterator<[K[], V]>
```

Returns an iterator that yields all key-value pairs in the trie that match the
given prefix. The match method will get all the values that partially match the
path, e.g., ancestor nodes plus the current node.

### list

```typescript
*list(keys: K[]): IterableIterator<[K[], V]>
```

Returns an iterator that yields all key-value pairs in the trie that are
children of the given prefix. The list method will get all the values starting
with the path, e.g., descendant nodes plus the current node.

### keys

```typescript
*keys(): IterableIterator<K[]>
```

Returns an iterator that yields all keys in the trie.

### values

```typescript
*values(): IterableIterator<V>
```

Returns an iterator that yields all values in the trie.

### entries

```typescript
*entries(): IterableIterator<[K[], V]>
```

Returns an iterator that yields all key-value pairs in the trie.

### forEach

```typescript
forEach(callbackFn: (value: V, key: K[], map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each key-value pair in the trie.

## Examples

```typescript
import Trie from "./trie";

// Create a new Trie
const trie = new Trie<string, number>();
trie.set(["h", "e", "l", "l", "o"], 1);
console.log(trie.get(["h", "e", "l", "l", "o"])); // Outputs: 1
console.log(trie.has(["w", "o", "r", "l", "d"])); // Outputs: false

// Iterate over the Trie
for (const [key, value] of trie) {
  console.log(key.join(""), value); // Outputs: hello 1
}

// Delete from the Trie
trie.delete(["h", "e", "l", "l", "o"]);
console.log(trie.size); // Outputs: 0
```

In this example, a new trie is created and a key-value pair is inserted into it.
Then, the value associated with the key is retrieved, and the presence of
another key is checked. The trie is then iterated over, and finally, the
key-value pair is deleted.

# LinkedList

A LinkedList is a linear data structure where each element is a separate object.
Each element (node) of a list is comprising of two items - the value and a
reference to the next node. The last node has a reference to null. The entry
point into a linked list is called the head of the list. This TypeScript class
provides a generic implementation of a doubly-linked list, where each node has a
reference to both the next node and the previous node.

## Use Cases

LinkedLists are used in various scenarios, including:

- **Dynamic Memory Allocation:** LinkedLists are used where you need to allocate
  memory dynamically.
- **Implementing Stacks and Queues:** LinkedLists are used to implement other
  data structures like stacks and queues.
- **Performing operations like insertions and deletions at a specific place:**
  LinkedLists are preferable over arrays because unlike arrays, we don’t need to
  shift elements in case of insertions or deletions.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly T[])
```

Creates a new LinkedList. The `entries` parameter is an optional array of
elements to initialize the list. If provided, the list is built from these
elements.

### append

```typescript
append(value: T, prevRef = this.#tail): Ref
```

Adds a new element to the end of the list and returns a reference to the new
element. The `prevRef` parameter is an optional reference to the element to
insert after.

### prepend

```typescript
prepend(value: T, nextRef = this.#head): Ref
```

Adds a new element to the start of the list and returns a reference to the new
element. The `nextRef` parameter is an optional reference to the element to
insert before.

### prev

```typescript
prev(key: Ref): Ref | undefined
```

Returns a reference to the element before the element with the given reference.

### next

```typescript
next(key: Ref): Ref | undefined
```

Returns a reference to the element after the element with the given reference.

### has

```typescript
has(key: Ref): boolean
```

Checks if the list contains an element with the given reference.

### get

```typescript
get(key: Ref): T | undefined
```

Returns the value of the element with the given reference. If no such element
exists, `undefined` is returned.

### delete

```typescript
delete(key: Ref): boolean
```

Removes the element with the given reference from the list. Returns `true` if
the element was found and deleted, `false` otherwise.

### clear

```typescript
clear(): void
```

Removes all elements from the list.

### size

```typescript
get size(): number
```

Returns the number of elements in the list.

### head

```typescript
get head(): Ref | undefined
```

Returns a reference to the first element in the list.

### tail

```typescript
get tail(): Ref | undefined
```

Returns a reference to the last element in the list.

### keys

```typescript
*keys(): IterableIterator<T>
```

Returns an iterator that yields all elements in the list from first to last.

### values

```typescript
*values(): IterableIterator<T>
```

Returns an iterator that yields all elements in the list from first to last.

### entries

```typescript
*entries(): IterableIterator<[T, T]>
```

Returns an iterator that yields all elements in the list from first to last,
with each element paired with itself.

### forEach

```typescript
forEach(callbackFn: (value: T, key: T, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each element in the list from first to
last.

## Examples

```typescript
import LinkedList from "./list";

// Create a new LinkedList
const list = new LinkedList<number>();
let ref = list.append(1); // ref refers to the node containing 1
list.append(2, ref); // append 2 after the node containing 1
console.log(list.get(ref)); // Outputs: 1
ref = list.next(ref)!; // move the reference to the next node
console.log(list.get(ref)); // Outputs: 2

// Iterate over the LinkedList
for (const value of list) {
  console.log(value); // Outputs: 1, 2
}

// Clear the LinkedList
list.clear();
console.log(list.size); // Outputs: 0
```

In this example, a new linked list is created and elements are added to it.
Then, the value of a specific element is retrieved, and the reference is moved
to the next element. The list is then iterated over, and finally, all elements
are removed from the list.

# CircularList

The `CircularList` class in this TypeScript file is an implementation of a
circular linked list. A circular linked list is a linked list where all nodes
are connected to form a circle. There is no NULL at the end. A circular linked
list can be a singly circular linked list or doubly circular linked list.

## Use Cases

Circular linked lists are used in various applications, including:

- **Computer system resources allocation:** In systems where multiple processes
  share resources in a circular manner.
- **Navigation systems:** Circular linked lists can represent places to visit in
  a specific order, allowing for cycling through the list.
- **Operating Systems:** Used in the implementation of time-sharing problems,
  where the currently running process is pushed back to the end of the queue
  after the time quantum expires.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly T[])
```

Creates a new `CircularList`. The `entries` parameter is an optional array to
initialize the circular list.

### push

```typescript
push(value: T): this
```

Adds a new node with the given value to the circular list.

### pop

```typescript
pop(): T | undefined
```

Removes the node from the circular list that the internal cursor points to and
returns its value. Returns `undefined` if the list is empty.

### peek

```typescript
peek(): T | undefined
```

Returns the value of the node that the internal cursor points to without
removing it from the list. Returns `undefined` if the list is empty.

### clear

```typescript
clear(): void
```

Clears the circular list.

### rotate

```typescript
protected rotate(): this
```

Rotates the list by moving the cursor to the next node.

### size

```typescript
get size(): number
```

Returns the number of nodes in the list.

### Symbol.iterator, keys, values

```typescript
*[Symbol.iterator](): IterableIterator<T>
*keys(): IterableIterator<T>
*values(): IterableIterator<T>
```

These methods return an iterator that yields all values in the list in the order
they are linked in the list.

### entries

```typescript
*entities(): IterableIterator<[T, T]>
```

Returns an iterator that yields all key-value pairs in the list, where both the
key and value are the value of the node.

### forEach

```typescript
forEach(callbackFn: (value: T, key: T, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each node in the list.

## Examples

```typescript
import CircularList from "./circular";

// Create a new CircularList instance
const list = new CircularList<number>();

// Push elements into the list
list.push(1).push(2).push(3);

// Print the size of the list
console.log(list.size); // Outputs: 3

// Peek at the next element to be popped
console.log(list.peek()); // Outputs: 1

// Pop the next element
console.log(list.pop()); // Outputs: 1

// Print the size of the list
console.log(list.size); // Outputs: 2

// Iterate over the list
for (const value of list) {
  console.log(value); // Outputs: 2, 3
}

// Clear the list
list.clear();

// Print the size of the list
console.log(list.size); // Outputs: 0
```

In this example, we first create a `CircularList` and push some elements into
it. Then, we peek at and pop the next element, and print the size of the list.
After that, we iterate over the list and print each value. Finally, we clear the
list and print its size.

# Stack

A Stack is a linear data structure that follows a particular order in which
operations are performed. The order is LIFO (Last In First Out), meaning the
last element inserted will be the first one to get accessed. This TypeScript
class provides a generic implementation of the stack data structure.

## Use Cases

Stacks are used in various algorithms and data structures, including:

- **Parsing:** Stacks are used in compilers and parsers. For instance, they're
  used to check whether parentheses in an expression are balanced.
- **Undo Mechanism:** Stacks can be used to provide the undo mechanism in text
  editors or image editing tools.
- **Backtracking Algorithms:** Stacks are used in algorithms like depth-first
  search (DFS) where you need to remember the previous state to backtrack.
- **Function Call Stack:** Stacks are used in almost every modern programming
  language to handle function calls.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly T[])
```

Creates a new Stack. The `entries` parameter is an optional array of elements to
initialize the stack. If provided, the stack is built from these elements.

### push

```typescript
push(value: T): this
```

Adds a new element onto the top of the stack and returns the stack for chaining.

### pop

```typescript
pop(): T | undefined
```

Removes and returns the top element from the stack. If the stack is empty,
`undefined` is returned.

### peek

```typescript
peek(): T | undefined
```

Returns the top element from the stack without removing it. If the stack is
empty, `undefined` is returned.

### clear

```typescript
clear(): void
```

Removes all elements from the stack.

### size

```typescript
get size(): number
```

Returns the number of elements in the stack.

### keys

```typescript
*keys(): IterableIterator<T>
```

Returns an iterator that yields all elements in the stack from top to bottom.

### values

```typescript
*values(): IterableIterator<T>
```

Returns an iterator that yields all elements in the stack from top to bottom.

### entries

```typescript
*entries(): IterableIterator<[T, T]>
```

Returns an iterator that yields all elements in the stack from top to bottom,
with each element paired with itself.

### forEach

```typescript
forEach(callbackFn: (value: T, key: T, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each element in the stack from top to
bottom.

## Examples

```typescript
import Stack from "./stack";

// Create a new Stack
const stack = new Stack<number>();
stack.push(1).push(2).push(3);
console.log(stack.pop()); // Outputs: 3
console.log(stack.size); // Outputs: 2

// Iterate over the Stack
for (const value of stack) {
  console.log(value); // Outputs: 2, 1
}

// Clear the Stack
stack.clear();
console.log(stack.size); // Outputs: 0
```

In this example, a new stack is created and elements are pushed onto it. Then,
the top element is popped from the stack. The stack is then iterated over, and
finally, all elements are removed from the stack.

# Queue

A Queue is a linear data structure that follows a particular order in which
operations are performed. The order is FIFO (First In First Out), meaning the
first element inserted will be the first one to get accessed. This TypeScript
class provides a generic implementation of the queue data structure.

## Use Cases

Queues are used in various algorithms and data structures, including:

- **Scheduling:** Queues are used in CPU scheduling, Disk Scheduling, and more.
- **Handling requests:** Queues are used in servers to handle requests where you
  need to maintain the order of execution.
- **Breadth-First Search (BFS):** In graph algorithms, queues are used to hold
  nodes to visit.
- **Buffering:** Queues are used in many places as buffers. They help in
  handling asynchronous data transfer between two processes.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly T[])
```

Creates a new Queue. The `entries` parameter is an optional array of elements to
initialize the queue. If provided, the queue is built from these elements.

### push

```typescript
push(value: T): this
```

Adds a new element to the end of the queue and returns the queue for chaining.

### pop

```typescript
pop(): T | undefined
```

Removes and returns the first element from the queue. If the queue is empty,
`undefined` is returned.

### peek

```typescript
peek(): T | undefined
```

Returns the first element from the queue without removing it. If the queue is
empty, `undefined` is returned.

### clear

```typescript
clear(): void
```

Removes all elements from the queue.

### size

```typescript
get size(): number
```

Returns the number of elements in the queue.

### keys

```typescript
*keys(): IterableIterator<T>
```

Returns an iterator that yields all elements in the queue from first to last.

### values

```typescript
*values(): IterableIterator<T>
```

Returns an iterator that yields all elements in the queue from first to last.

### entries

```typescript
*entries(): IterableIterator<[T, T]>
```

Returns an iterator that yields all elements in the queue from first to last,
with each element paired with itself.

### forEach

```typescript
forEach(callbackFn: (value: T, key: T, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each element in the queue from first to
last.

## Examples

```typescript
import Queue from "./queue";

// Create a new Queue
const queue = new Queue<number>();
queue.push(1).push(2).push(3);
console.log(queue.pop()); // Outputs: 1
console.log(queue.size); // Outputs: 2

// Iterate over the Queue
for (const value of queue) {
  console.log(value); // Outputs: 2, 3
}

// Clear the Queue
queue.clear();
console.log(queue.size); // Outputs: 0
```

In this example, a new queue is created and elements are added to it. Then, the
first element is popped from the queue. The queue is then iterated over, and
finally, all elements are removed from the queue.

# Buffer

A Buffer is a variant of the Queue data structure with a fixed size. When the
buffer reaches its maximum size, if a new element is inserted, then the oldest
element in the buffer will be removed automatically. This TypeScript class
provides a generic implementation of a circular buffer or ring buffer.

## Use Cases

Buffers are used in various algorithms and data structures, including:

- **Data Stream:** Buffers can be used when you have a stream of data at a
  higher rate than you can process and you don't want to lose any data. The data
  can be placed in a buffer and processed at a slower rate.
- **Producer-Consumer Problem:** In multitasking operating systems where there
  are multiple processes, each process might need to communicate with one
  another. Buffers are used as a temporary storage place for this data.
- **I/O Operations:** Buffers are used in I/O operations where data is
  temporarily held before it is written to the device.

## Interface Documentation

### Constructor

```typescript
constructor(maxSize: number = Infinity, entries?: readonly T[])
```

Creates a new Buffer. The `maxSize` parameter is the maximum number of elements
that the buffer can hold. The `entries` parameter is an optional array of
elements to initialize the buffer. If provided, the buffer is built from these
elements, but only the last `maxSize` elements are kept.

### push

```typescript
push(value: T): this
```

Adds a new element to the end of the buffer and returns the buffer for chaining.
If adding the new element causes the buffer to exceed its `maxSize`, the oldest
element is automatically removed.

### maxSize

```typescript
readonly maxSize: number
```

Returns the maximum number of elements that the buffer can hold.

Note: All other methods from the Queue class, such as `pop()`, `peek()`,
`clear()`, `size`, `keys()`, `values()`, `entries()`, and `forEach()`, are also
available.

## Examples

```typescript
import Buffer from "./buffer";

// Create a new Buffer with a maxSize of 2
const buffer = new Buffer<number>(2);
buffer.push(1).push(2).push(3);
console.log(buffer.pop()); // Outputs: 3
console.log(buffer.size); // Outputs: 1

// Iterate over the Buffer
for (const value of buffer) {
  console.log(value); // Outputs: 2
}

// Clear the Buffer
buffer.clear();
console.log(buffer.size); // Outputs: 0
```

In this example, a new buffer is created with a maximum size of 2 and elements
are added to it. Note that when the third element is added, the first element is
automatically removed to maintain the maximum size. Then, the last element is
popped from the buffer. The buffer is then iterated over, and finally, all
elements are removed from the buffer.

# FQueue

FQueue is a variant of the queue data structure, where elements are organized by
their frequency. Elements with the same frequency are dequeued in the order they
were enqueued. This TypeScript class provides a generic implementation of a
frequency queue.

## Use Cases

Frequency queues are used in various scenarios, including:

- **Caching:** FQueues can be used in caching where you might want to replace
  the item that is the least frequently used.
- **Data Analysis:** In data analysis, FQueues can be used where you want to
  keep track of the frequency of items.
- **Priority Queues:** FQueues can be used as a form of priority queue where the
  priority is based on frequency.

## Interface Documentation

### Constructor

```typescript
constructor(entries?: readonly T[])
```

Creates a new FQueue. The `entries` parameter is an optional array of elements
to initialize the queue. If provided, the queue is built from these elements.

### push

```typescript
push(value: T): this
```

Adds a new element to the queue. If the element already exists in the queue, its
frequency is increased.

### pop

```typescript
pop(): T | undefined
```

Removes and returns the least frequent element from the queue. If there are
multiple elements with the same frequency, the oldest one is returned. If the
queue is empty, `undefined` is returned.

### peek

```typescript
peek(): T | undefined
```

Returns the least frequent element from the queue without removing it. If there
are multiple elements with the same frequency, the oldest one is returned. If
the queue is empty, `undefined` is returned.

### clear

```typescript
clear(): void
```

Removes all elements from the queue.

### size

```typescript
get size(): number
```

Returns the number of elements in the queue.

### keys

```typescript
*keys(): IterableIterator<T>
```

Returns an iterator that yields all elements in the queue from least frequent to
most frequent.

### values

```typescript
*values(): IterableIterator<T>
```

Returns an iterator that yields all elements in the queue from least frequent to
most frequent.

### entries

```typescript
*entries(): IterableIterator<[T, T]>
```

Returns an iterator that yields all elements in the queue from least frequent to
most frequent, with each element paired with itself.

### forEach

```typescript
forEach(callbackFn: (value: T, key: T, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each element in the queue from least
frequent to most frequent.

## Examples

```typescript
import FQueue from "./fqueue";

// Create a new FQueue
const fqueue = new FQueue<number>();
fqueue.push(1).push(2).push(2);
console.log(fqueue.pop()); // Outputs: 1
console.log(fqueue.size); // Outputs: 1

// Iterate over the FQueue
for (const value of fqueue) {
  console.log(value); // Outputs: 2
}

// Clear the FQueue
fqueue.clear();
console.log(fqueue.size); // Outputs: 0
```

In this example, a new frequency queue is created and elements are added to it.
Note that when the element `2` is pushed twice, its frequency increases. Then,
the least frequent element is popped from the queue. The queue is then iterated
over, and finally, all elements are removed from the queue.

# LFU (Least Frequently Used)

The LFU class is an implementation of the Least Frequently Used (LFU) caching
algorithm. It is a type of cache algorithm used to manage memory within a cache.
When the cache reaches its limit, the LFU algorithm frees up memory by evicting
the least frequently used items first. This TypeScript class provides a generic
implementation of the LFU algorithm.

## Use Cases

The LFU is used in various scenarios, including:

- **Caching:** LFU is a popular caching algorithm used in databases,
  filesystems, and caching solutions.
- **Web Development:** In web development, LFU can be used for HTTP caching,
  database query result caching, and more.
- **Operating Systems:** LFU can be used in page replacement algorithms and in
  buffer cache management of a file system.

## Interface Documentation

### Constructor

```typescript
constructor(maxSize: number, entries?: readonly (readonly [K, V])[] | null)
```

Creates a new LFU cache. The `maxSize` parameter is the maximum number of
key-value pairs that the cache can hold. The `entries` parameter is an optional
array of key-value pairs to initialize the cache. If provided, the cache is
built from these key-value pairs.

### peek

```typescript
peek(key: K): V | undefined
```

Returns the value associated with a key without affecting the cache state. If
the key is not found, `undefined` is returned.

### get

```typescript
get(key: K): V | undefined
```

Returns the value associated with a key and updates the "used" state of the key.
If the key is not found, `undefined` is returned.

### set

```typescript
set(key: K, value: V): this
```

Inserts or updates a key-value pair in the cache. If the cache is full, the
least frequently used item is removed. It returns the cache object itself, so
you can chain multiple set operations if desired.

### keys

```typescript
*keys(): IterableIterator<K>
```

Returns an iterator that yields all keys in the cache from least frequently used
to most frequently used.

### values

```typescript
*values(): IterableIterator<V>
```

Returns an iterator that yields all values in the cache from least frequently
used to most frequently used.

### entries

```typescript
*entries(): IterableIterator<[K, V]>
```

Returns an iterator that yields all key-value pairs in the cache from least
frequently used to most frequently used.

### forEach

```typescript
forEach(callbackFn: (value: V, key: K, map: this) => void, thisArg?: unknown): void
```

Executes a provided function once for each key-value pair in the cache from
least frequently used to most frequently used.

## Examples

```typescript
import LFU from "./lfu";

// Create a new LFU cache with a maxSize of 2
const lfu = new LFU<number, string>(2);
lfu.set(1, "a").set(2, "b").set(2, "b").set(3, "c");
console.log(lfu.get(1)); // Outputs: undefined
console.log(lfu.get(2)); // Outputs: 'b'

// Iterate over the LFU cache
for (const [key, value] of lfu) {
  console.log(key, value); // Outputs: 3 'c', 2 'b'
}
```

In this example, a new LFU cache is created with a maximum size of 2 and
key-value pairs are added to it. Note that when the third key-value pair is
added, the key `1` is automatically removed as it is the least frequently used
key. Then, the value associated with key `1` is retrieved, which is `undefined`
since key `1` was removed from the cache. The value associated with key `2` is
then retrieved. Finally, the cache is iterated over.

# LRU (Least Recently Used)

The LRU class is an implementation of the Least Recently Used (LRU) caching
algorithm. It is a type of cache algorithm used to manage memory within a cache.
When the cache reaches its limit, the LRU algorithm frees up memory by evicting
the least recently used items first. This TypeScript class provides a generic
implementation of the LRU algorithm.

## Use Cases

The LRU is used in various scenarios, including:

- **Caching:** LRU is a popular caching algorithm used in databases,
  filesystems, and caching solutions.
- **Web Development:** In web development, LRU can be used for HTTP caching,
  database query result caching, and more.
- **Operating Systems:** LRU can be used in page replacement algorithms and in
  buffer cache management of a file system.

## Interface Documentation

### Constructor

```typescript
constructor(maxSize: number, entries?: readonly (readonly [K, V])[] | null)
```

Creates a new LRU cache. The `maxSize` parameter is the maximum number of
key-value pairs that the cache can hold. The `entries` parameter is an optional
array of key-value pairs to initialize the cache. If provided, the cache is
built from these key-value pairs.

### peek

```typescript
peek(key: K): V | undefined
```

Returns the value associated with a key without affecting the cache state. If
the key is not found, `undefined` is returned.

### get

```typescript
get(key: K): V | undefined
```

Returns the value associated with a key and updates the "used" state of the key.
If the key is not found, `undefined` is returned.

### set

```typescript
set(key: K, value: V): this
```

Inserts or updates a key-value pair in the cache. If the cache is full, the
least recently used item is removed. It returns the cache object itself, so you
can chain multiple set operations if desired.

### keys

```typescript
*keys(): IterableIterator<K>
```

Returns an iterator that yields all keys in the cache from least recently used
to most recently used.

### values

```typescript
*values(): IterableIterator<V>
```

Returns an iterator that yields all values in the cache from least recently used
to most recently used.

### entries

```typescript
*entries(): IterableIterator<[K, V]>
```

Returns an iterator that yields all key-value pairs in the cache from least
recently used to most recently used.

## Examples

```typescript
import LRU from "./lru";

// Create a new LRU cache with a maxSize of 2
const lru = new LRU<number, string>(2);
lru.set(1, "a").set(2, "b").set(3, "c");
console.log(lru.get(1)); // Outputs: undefined
console.log(lru.get(2)); // Outputs: 'b'

// Iterate over the LRU cache
for (const [key, value] of lru) {
  console.log(key, value); // Outputs: 3 'c', 2 'b'
}
```

In this example, a new LRU cache is created with a maximum size of 2 and
key-value pairs are added to it. Note that when the third key-value pair is
added, the key `1` is automatically removed as it is the least recently used
key. Then, the value associated with key `1` is retrieved, which is `undefined`
since key `1` was removed from the cache. The value associated with key `2` is
then retrieved. Finally, the cache is iterated over.

# PubSub

The `PubSub` class is an implementation of the Publish-Subscribe messaging
pattern. It allows any number of publishers to publish messages without
programming them to send the messages to specific receivers (subscribers).
Likewise, subscribers can receive messages without knowing the identity of the
publishers.

## Use Cases

The Publish-Subscribe pattern is widely used in asynchronous systems and are
very common in event-driven programming. Some common use cases include:

- **Real-time updates:** PubSub can be used for pushing real-time updates to
  users, such as news updates, weather updates, or stock market information.
- **Event-driven architectures:** In an event-driven system, different
  components of the system publish events, and other components subscribe to
  events of interest.
- **Decoupling services in a microservices architecture:** Different services in
  a microservices architecture can communicate with each other using the PubSub
  pattern, making the services loosely coupled.

## Interface Documentation

### Constructor

```typescript
constructor(maxSize: number = 0, entries?: readonly ([K[], V])[])
```

Creates a new `PubSub` instance. The `maxSize` parameter determines the size of
the buffer for the PubSub instance, and the `entries` parameter is an optional
array of topic-data pairs to initialize the buffer.

### publish

```typescript
publish(context: V, topic: K[] = []): void
```

Publishes data to a specific topic. The `context` parameter is the data to be
published, and the `topic` parameter is the topic to which the data should be
published.

### subscribe

```typescript
subscribe(handler: Handler<K, V>, topic: K[] = []): () => void
```

Subscribes to a specific topic. The `handler` parameter is a function to be
executed whenever data is published to the topic. The `topic` parameter is the
topic to which the handler should be subscribed.

The `subscribe` method returns a function that, when called, will unsubscribe
the handler from the topic.

## Examples

```typescript
import PubSub from "./pubsub";

// Create a new PubSub instance
const pubsub = new PubSub<string, string>();

// Define a handler
const handler = (context, topic) => {
  console.log(`Received ${context} on topic ${topic.join("/")}`);
};

// Subscribe to a topic
const unsubscribe = pubsub.subscribe(handler, ["topic1"]);

// Publish to the topic
pubsub.publish("Hello, world!", ["topic1"]); // Outputs: Received Hello, world! on topic topic1

// Unsubscribe from the topic
unsubscribe();
```

# Channel

The `Channel` class in this TypeScript file serves as an interface into a subset
of a dispatcher, specifically a `PubSub` instance. It provides methods to
publish messages to a topic and to subscribe a handler to a topic.

## Use Cases

The `Channel` class is used to encapsulate the Publish-Subscribe pattern with a
particular topic. This can be used to create a more focused interface for a
subset of your application's events. It can be useful in:

- **Event-driven architectures:** Different components of a system can listen to
  specific events without needing to understand the entire event system.
- **Real-time updates:** Channels can be used to push updates only to
  subscribers who are interested in a specific topic.
- **Multi-user applications:** Each user can have their own channel, allowing
  for targeted communication.

## Interface Documentation

### Constructor

```typescript
constructor(pubsub: PubSub<string, T> = new PubSub(), topic: Topic = [])
```

Creates a new `Channel` instance. The `pubsub` parameter is a `PubSub` instance
that the channel should interface with, and the `topic` parameter is the topic
that the channel should handle.

### publish

```typescript
publish(context: T): void
```

Publishes data to the channel's topic. The `context` parameter is the data to be
published.

### subscribe

```typescript
subscribe(subscriber: Handler<T>): () => void
```

Subscribes a handler to the channel's topic. The `subscriber` parameter is a
function to be executed whenever data is published to the topic.

The `subscribe` method returns a function that, when called, will unsubscribe
the handler from the topic.

### channel

```typescript
channel(topic: Topic): Channel<T>
```

Creates and returns a new `Channel` that shares the `PubSub` instance of the
current channel but has a different topic. The `topic` parameter is the topic
for the new channel.

## Examples

```typescript
import Channel from "./channel";

// Create a new Channel instance
const channel = new Channel<string>();

// Define a handler
const handler = (context, topic) => {
  console.log(`Received ${context} on topic ${topic.join("/")}`);
};

// Subscribe to the channel
const unsubscribe = channel.subscribe(handler);

// Publish to the channel
channel.publish("Hello, world!"); // Outputs: Received Hello, world! on topic

// Unsubscribe from the channel
unsubscribe();

// Create a new Channel with a different topic
const newChannel = channel.channel(["topic1"]);

// Subscribe to the new channel
const newUnsubscribe = newChannel.subscribe(handler);

// Publish to the new channel
newChannel.publish("Hello, topic1!"); // Outputs: Received Hello, topic1! on topic topic1

// Unsubscribe from the new channel
newUnsubscribe();
```

In this example, we first create a `Channel` and subscribe a handler to it.
Then, we publish a message to the channel, and the handler logs the message and
the topic. After that, we unsubscribe from the channel. Finally, we create a new
channel with a different topic, subscribe the same handler to the new channel,
publish a message to the new channel, and unsubscribe from the new channel.

# BloomFilter

The `BloomFilter` class in this TypeScript file is an implementation of a Bloom
filter. A Bloom filter is a data structure that can be used to test whether an
element is a member of a set. It's a probabilistic data structure that provides
fast membership queries and has a compact representation at the cost of some
false positives.

## Use Cases

Bloom filters are used in various applications, including:

- **Web browsers:** Used for safe browsing to check if a URL is in a list of
  known malicious URLs.
- **Databases:** Used to prevent unnecessary disk reads for non-existent rows or
  documents.
- **Caching systems:** Used to avoid expensive operations for items that aren't
  in the cache.
- **Network routers:** Used for packet routing to keep track of data that has
  been previously seen.

## Interface Documentation

### Constructor

```typescript
constructor(size: number = 2 ** 16, entries?: readonly T[])
```

Creates a new `BloomFilter`. The `size` parameter determines the size of the
Bloom filter, and the `entries` parameter is an optional array to initialize the
Bloom filter.

### add

```typescript
add(key: string): this
```

Adds an element to the Bloom filter. The `key` parameter is the element to add.

### has

```typescript
has(key: string): boolean
```

Checks whether an element might be in the set. The `key` parameter is the
element to check. Returns `true` if the element might be in the set, and `false`
if the element is definitely not in the set.

### hash

```typescript
#hash(key: string): number[]
```

Generates three different hash values for the given key. The `key` parameter is
the key to hash. The hash functions used are `sdbm`, `djb2a`, and `fnv1a`.

## Examples

```typescript
import BloomFilter from "./bloom";

// Create a new BloomFilter instance
const bloomFilter = new BloomFilter<string>();

// Add elements to the filter
bloomFilter.add("apple").add("banana").add("cherry");

// Check if elements might be in the set
console.log(bloomFilter.has("apple")); // Outputs: true
console.log(bloomFilter.has("banana")); // Outputs: true
console.log(bloomFilter.has("cherry")); // Outputs: true
console.log(bloomFilter.has("durian")); // Outputs: false
```

In this example, we first create a `BloomFilter` and add some elements to it.
Then, we check if these elements and an element not added to the filter might be
in the set. Note that while a Bloom filter returns `true` if an element might be
in the set, it always returns `false` if an element is definitely not in the
set.

## License

[MIT](LICENSE)

## Disclosures

The documentation provided above has been generated with the assistance of
ChatGPT. While efforts have been made to ensure accuracy and comprehensiveness,
it is essential to review and verify the content for specific use cases and
application requirements. The generated documentation serves as a starting point
and should be tailored to suit individual project needs and objectives. As with
any automated content, caution should be exercised in critical and
security-sensitive applications.
