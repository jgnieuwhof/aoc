import * as path from "https://deno.land/std@0.116.0/path/mod.ts";

export const __dirname = (importMetaUrl: string) => {
  return path.dirname(path.fromFileUrl(importMetaUrl));
};

export const readLines = async (...paths: string[]) => {
  const decoder = new TextDecoder("utf-8");
  const buffer = await Deno.readFile(path.join(...paths));
  return decoder.decode(buffer).split("\n");
};
