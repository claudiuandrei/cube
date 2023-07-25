import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import Channel from "./channel.ts";

Deno.test("Channel Creation - create an empty Channel and publish to it", () => {
  const channel = new Channel<string>();
  let received = false;
  channel.subscribe(() => received = true);
  channel.publish("message");
  assertEquals(received, true);
});

Deno.test("Channel Creation - create a Channel with a specific topic and publish to it", () => {
  const channel = new Channel<string>(undefined, ["topic1"]);
  let received = false;
  channel.subscribe(() => received = true);
  channel.publish("message");
  assertEquals(received, true);
});

Deno.test("Channel Publish - publish a message to a Channel with subscribers", () => {
  const channel = new Channel<string>();
  let received = false;
  channel.subscribe(() => received = true);
  channel.publish("message");
  assertEquals(received, true);
});

Deno.test("Channel Publish - publish a message to a Channel with no subscribers", () => {
  const channel = new Channel<string>();
  let received = false;
  const handler = () => received = true;
  const unsubscribe = channel.subscribe(handler);
  unsubscribe();
  channel.publish("message");
  assertEquals(received, false);
});

Deno.test("Channel Subscribe - subscribe a handler to a Channel and publish to it", () => {
  const channel = new Channel<string>();
  let received = false;
  channel.subscribe(() => received = true);
  channel.publish("message");
  assertEquals(received, true);
});

Deno.test("Channel Subscribe - subscribe a handler to a Channel and publish to a different Channel", () => {
  const channel1 = new Channel<string>();
  const channel2 = new Channel<string>();
  let received = false;
  channel1.subscribe(() => received = true);
  channel2.publish("message");
  assertEquals(received, false);
});

Deno.test("Channel Subchannel - create a subchannel and publish to it", () => {
  const channel = new Channel<string>();
  const subchannel = channel.channel(["subtopic"]);
  let received = false;
  subchannel.subscribe(() => received = true);
  subchannel.publish("message");
  assertEquals(received, true);
});

Deno.test("Channel Subchannel - publish to a subchannel and the parent Channel", () => {
  const channel = new Channel<string>();
  const subchannel = channel.channel(["subtopic"]);
  let received = 0;
  channel.subscribe(() => received++);
  subchannel.publish("message");
  assertEquals(received, 1);
});

Deno.test("Channel Subchannel - subscribe to a subchannel and not to the parent Channel", () => {
  const channel = new Channel<string>();
  const subchannel = channel.channel(["subtopic"]);
  let received = false;
  subchannel.subscribe(() => received = true);
  channel.publish("message");
  assertEquals(received, false);
});

Deno.test("Channel Unsubscribe - unsubscribe from a Channel and publish to it", () => {
  const channel = new Channel<string>();
  let received = 0;
  const handler = () => received++;
  const unsubscribe = channel.subscribe(handler);
  channel.publish("message");
  unsubscribe();
  channel.publish("message");
  assertEquals(received, 1);
});

Deno.test("Channel Subchannel Unsubscribe - unsubscribe from a subchannel and publish to it", () => {
  const channel = new Channel<string>();
  const subchannel = channel.channel(["subtopic"]);
  let received = 0;
  const handler = () => received++;
  const unsubscribe = subchannel.subscribe(handler);
  subchannel.publish("message");
  unsubscribe();
  subchannel.publish("message");
  assertEquals(received, 1);
});
