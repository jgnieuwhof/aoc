import { __dirname, readFile } from "./fs.ts";

export interface Context {
  input?: string;
}

export type Main = (args: string[], context: Context) => void | Promise<void>;

export interface Options {
  importMetaUrl?: string;
}

const withContext = ({ importMetaUrl }: Options = {}) =>
  async (main: Main) => {
    const input = importMetaUrl
      ? await readFile(__dirname(importMetaUrl), "input.txt")
      : undefined;

    return main(Deno.args, { input });
  };

export const run = (main: Main, options?: Options) => {
  withContext(options)(main)
    .then(() => Deno.exit(0))
    .catch((error) => {
      console.error(error);
      Deno.exit(1);
    });
};
