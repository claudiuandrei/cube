import Channel from "./channel.ts";

const ITEM_COUNT = 1e4;

// Benchmark the `publish` method
Deno.bench("channel publish", () => {
  const channel = new Channel<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    channel.publish(i);
  }
});

// Benchmark the `subscribe` method
Deno.bench("channel subscribe", () => {
  const channel = new Channel<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    channel.subscribe(() => {});
  }
});

// Benchmark the `channel` method
Deno.bench("channel channel", () => {
  let channel = new Channel<number>();
  for (let i = 0; i < ITEM_COUNT; i++) {
    channel = channel.channel(["topic" + i]);
  }
});

// Benchmark the `subscribe and publish` method
Deno.bench("channel subscribe and publish", () => {
  const channel = new Channel<number>();
  channel.subscribe(() => {});
  for (let i = 0; i < ITEM_COUNT; i++) {
    channel.publish(i);
  }
});
