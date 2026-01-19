import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  platform: "browser",
  target: "esnext",
  format: "esm",
  minify: true,
});
