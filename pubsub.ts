import Buffer from "./buffer.ts";
import Trie from "./trie.ts";

// Setup the handler
export type Handler<K, V> = (context: V, topic: K[]) => void;

// Buffered bus
class PubSub<K, V> {
  #handlers: Trie<K, Set<[Handler<K, V>]>> = new Trie();
  #buffer: Buffer<[K[], V]>;

  // Setup the buffer for the pubsub
  constructor(maxSize: number = 0, entries?: readonly ([K[], V])[]) {
    // Set the buffer and add the entries
    this.#buffer = new Buffer(maxSize, entries);
  }

  // Publish data
  publish(context: V, topic: K[] = []): void {
    // Call the handler with the context and topic
    for (const [, handlers] of this.#handlers.match(topic)) {
      for (const [handler] of handlers) {
        handler(context, topic);
      }
    }

    // Buffer the data when we have a buffered bus
    this.#buffer.push([topic, context]);
  }

  // Add a subscriber
  subscribe(handler: Handler<K, V>, topic: K[] = []): () => void {
    // Wrap the handler to make sure it is uniques
    // Subscribe directly to a channel
    // The trie value is a set of handlers or a map with symbols
    const h: [Handler<K, V>] = [handler];

    // Send the bufferedd data
    this.#buffer.forEach(([topic, context]) => handler(context, topic));

    // Get he handlers for the topic
    const current = this.#handlers.get(topic);
    const handlers = current ?? new Set();

    // Add the handler
    handlers.add(h);

    // Store it needed
    if (current == null) {
      this.#handlers.set(topic, handlers);
    }

    // Unsubscribe
    return () => {
      // Remove the handler
      handlers.delete(h);

      // Remove the topic if empty
      if (handlers.size === 0) {
        this.#handlers.delete(topic);
      }
    };
  }
}

export default PubSub;
