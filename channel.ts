import PubSub from "./pubsub.ts";

// Setup the types
type Topic = string[];

// Setup the handler
type Handler<T> = (context: T, topic: Topic) => void;

// A channel is just an interface into a subset of a dispatcher
class Channel<T> {
  #pubsub: PubSub<string, T>;
  #topic: Topic;

  // Setup the properties
  constructor(pubsub: PubSub<string, T> = new PubSub(), topic: Topic = []) {
    this.#pubsub = pubsub;
    this.#topic = topic;
  }

  // Publish
  publish(context: T): void {
    this.#pubsub.publish(context, this.#topic);
  }

  // Subscribe
  subscribe(subscriber: Handler<T>): () => void {
    // Sunbscribe the handler
    return this.#pubsub.subscribe(subscriber, this.#topic);
  }

  // Create a channel
  channel(topic: Topic) {
    return new Channel(this.#pubsub, [...this.#topic, ...topic]);
  }
}

export default Channel;
