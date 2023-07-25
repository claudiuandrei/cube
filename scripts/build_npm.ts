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
		name: "@denox/fnv1a",
		version: Deno.args[0],
		description: "FNV-1a non-cryptographic hash function.",
		license: "MIT",
		keywords: ["fnv1a", "hash", "hashing"],
		repository: {
			type: "git",
			url: "git+https://github.com/claudiuandrei/fnv1a.git",
		},
		bugs: {
			url: "https://github.com/claudiuandrei/fnv1a/issues",
		},
		engines: {
			node: ">=11.0.0",
		},
	},
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
