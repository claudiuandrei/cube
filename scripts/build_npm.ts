import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: {
      test: "dev",
    },
  },
  compilerOptions: {
    lib: ["es2021", "dom"],
  },
  package: {
    // package.json properties
    name: "@denox/cube",
    version: Deno.args[0],
    description: "Library of building blocks for TypeScript",
    license: "MIT",
    keywords: [
      "heap",
      "trie",
      "linked list",
      "stack",
      "queue",
      "buffer",
      "frequency queue",
      "LFU",
      "LRU",
      "pubsub",
      "channel",
    ],
    repository: {
      type: "git",
      url: "git+https://github.com/claudiuandrei/cube.git",
    },
    bugs: {
      url: "https://github.com/claudiuandrei/cube/issues",
    },
    engines: {
      node: ">=11.0.0",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
