import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";
import PubSub from "./pubsub.ts";

Deno.test("PubSub Creation - create an empty PubSub and publish to it", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  pubSub.subscribe(() => received = true);
  pubSub.publish("context");
  assertEquals(received, true);
});

Deno.test("PubSub Creation - create a PubSub with initial entries and subscribe to it", () => {
  const pubSub = new PubSub<string, string>(2, [[[], "context1"], [
    [],
    "context2",
  ]]);
  let received = 0;
  pubSub.subscribe(() => received++);
  assertEquals(received, 2);
});

Deno.test("PubSub Subscribe - subscribe a handler to an empty PubSub and publish to it", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  const handler = () => received = true;
  pubSub.subscribe(handler);
  pubSub.publish("context");
  assertEquals(received, true);
});

Deno.test("PubSub Subscribe - subscribe a handler to a PubSub with a specific topic and publish to that topic", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  const handler = () => received = true;
  pubSub.subscribe(handler, ["topic1"]);
  pubSub.publish("context", ["topic1"]);
  assertEquals(received, true);
});

Deno.test("PubSub Subscribe - subscribe a handler to a more general topic and publish to that topic", () => {
  const pubSub = new PubSub<string, string>();
  let received = 0;
  const handler = () => received++;
  pubSub.subscribe(handler, ["topic"]);
  pubSub.publish("context", ["topic", "subtopic"]);
  assertEquals(received, 1);
});

Deno.test("PubSub Unsubscribe - unsubscribe a handler from a PubSub and publish to it", () => {
  const pubSub = new PubSub<string, string>();
  let received = 0;
  const handler = () => received++;
  const unsubscribe = pubSub.subscribe(handler);
  pubSub.publish("context");
  unsubscribe();
  pubSub.publish("context");
  assertEquals(received, 1);
});

Deno.test("PubSub Publish - publish an event to an empty PubSub with a handler subscribed to it", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  const handler = () => received = true;
  pubSub.subscribe(handler);
  pubSub.publish("context");
  assertEquals(received, true);
});

Deno.test("PubSub Publish - publish an event with a specific topic to a PubSub with a handler subscribed to that topic", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  const handler = () => received = true;
  pubSub.subscribe(handler, ["topic1"]);
  pubSub.publish("context", ["topic1"]);
  assertEquals(received, true);
});

Deno.test("PubSub Publish - publish an event with a specific topic to a PubSub without a handler subscribed to that topic", () => {
  const pubSub = new PubSub<string, string>();
  let received = false;
  const handler = () => received = true;
  pubSub.subscribe(handler, ["topic2"]);
  pubSub.publish("context", ["topic1"]);
  assertEquals(received, false);
});
