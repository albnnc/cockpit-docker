export interface RunCommandOptions {
  directory?: string;
  environ?: string[];
  err?: "out" | "ignore" | "message";
}

export async function runCommand(
  command: string[],
  options?: RunCommandOptions,
): Promise<string> {
  console.log("Executing command: ", command, "with options: ", options);
  // deno-lint-ignore no-explicit-any
  return await (globalThis as any)
    .cockpit
    .spawn(command, options)
    .then(String);
}

export async function readFile(path: string): Promise<string> {
  console.log("Reading file: ", path);
  // deno-lint-ignore no-explicit-any
  return await (globalThis as any)
    .cockpit
    .file(path)
    .read();
}

export async function writeFile(path: string, content: string) {
  console.log("Writing to file: ", path);
  // deno-lint-ignore no-explicit-any
  return await (globalThis as any)
    .cockpit
    .file(path)
    .modify(() => {
      return content;
    });
}

export async function fsExists(path: string): Promise<boolean> {
  try {
    const _ = await runCommand([
      "ls",
      path,
    ]);
    return true;
  } catch (_) {
    return false;
  }
}

export function parseJsonl(jsonlString: string): Record<string, unknown>[] {
  return JSON.parse(
    `[${
      jsonlString.split("\n").map((v) => v.replaceAll("\n", "")).filter(
        Boolean,
      ).join(",")
    }]`,
  );
}
