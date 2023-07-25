import PubSub from "./pubsub.ts";

const ITEM_COUNT = 1e5;

// Benchmark the `publish` method
Deno.bench("pubsub publish", () => {
  const pubsub = new PubSub<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    pubsub.publish(i, [i]);
  }
});

// Benchmark the `subscribe` method
Deno.bench("pubsub subscribe", () => {
  const pubsub = new PubSub<number, number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    pubsub.subscribe(() => {}, [i]);
  }
});

// Benchmark the `subscribe and publish` method
Deno.bench("pubsub subscribe and publish", () => {
  const pubsub = new PubSub<number, number>();
  pubsub.subscribe(() => {}, []);
  for (let i = 0; i < ITEM_COUNT; i++) {
    pubsub.publish(i, [i]);
  }
});
