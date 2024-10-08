import { Plugin, PluginApplyOptions } from "@albnnc/nvil";
import * as fs from "@std/fs";
import * as path from "@std/path";

const staticsDir = path.fromFileUrl(import.meta.resolve("../statics/"));

export class StaticsPlugin extends Plugin {
  constructor() {
    super("STATICS");
  }

  async apply(options: PluginApplyOptions) {
    super.apply(options);
    for await (const entry of fs.expandGlob(path.join(staticsDir, "**/*"))) {
      if (entry.isDirectory) {
        continue;
      }
      const bundleUrl = "./" + path.relative(staticsDir, entry.path);
      const data = await Deno.readFile(entry.path);
      this.project.bundle.set(bundleUrl, { data });
    }
  }
}
