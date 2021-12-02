export const run = (main: (args: string[]) => Promise<void>) => {
  main(Deno.args).then(() => Deno.exit(0)).catch((error) => {
    console.error(error);
    Deno.exit(1);
  });
};
