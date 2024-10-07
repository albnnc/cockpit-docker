#!/usr/bin/env -S deno run -A
import {
  denoLoaderPlugin,
  denoResolverPlugin,
} from "@albnnc/esbuild-deno-loader";
import {
  BuildPlugin,
  CleanPlugin,
  CopyPlugin,
  HtmlTemplatePlugin,
  Project,
} from "@albnnc/nvil";
import { Command } from "@cliffy/command";
import * as path from "@std/path";
import { DeployPlugin } from "./utils/deploy_plugin.ts";
import { StaticsPlugin } from "./utils/statics_plugin.ts";

await new Command()
  .name("make")
  .command("build", "Build Cockpit plugins.")
  .option("--dev", "Start dev server and watch for file changes.")
  .option("--deploy <sshUrl>", "Deploy artifacts to remote Cockpit instance.")
  .option("--debug", "Use debug logging.")
  .action(async ({
    dev,
    deploy: sshUrl,
    debug,
  }) => {
    const project = new Project({
      plugins: [
        new CleanPlugin(),
        new BuildPlugin({
          entryPoint: `./index.tsx`,
          overrideEsbuildOptions: (options) => {
            const configPath = path.fromFileUrl(
              import.meta.resolve("./deno.json"),
            );
            options.jsxImportSource = "@emotion/react";
            options.plugins = [
              // new IgnoreEsbuildPlugin([
              //   "/units/",
              //   "eve/app.ts",
              //   "log/logger.ts",
              //   "z/cmd",
              //   "ssh_adapter/constants.ts",
              //   "docker.ts",
              // ]),
              // ...(dev ? [] : [EsbuildPluginFactory.noSideEffects()]),
              denoResolverPlugin({ configPath }),
              denoLoaderPlugin({
                configPath,
                loader: "native",
              }),
            ];
            return options;
          },
        }),
        new HtmlTemplatePlugin({ entryPoint: `./index.html` }),
        new CopyPlugin({
          entryPoint: `./manifest.json`,
          bundleUrl: "./manifest.json",
        }),
        new StaticsPlugin(),
        ...(sshUrl ? [new DeployPlugin({ sshUrl })] : []),
      ],
      sourceUrl: import.meta.resolve(`./`),
      targetUrl: import.meta.resolve(`./.target/`),
      dev: !!dev,
      debug: !!debug,
    });
    await project.bootstrap();
    await project.done();
    Deno.exit(0); // FIXME
  })
  .parse(Deno.args);

// class IgnoreEsbuildPlugin implements EsbuildPlugin {
//   name = "ignore";
//   #toBeIgnored: string[];
//   constructor(toBeIgnored: string[]) {
//     this.#toBeIgnored = toBeIgnored;
//   }
//   setup: EsbuildPlugin["setup"] = (build) => {
//     build.onLoad(
//       { namespace: "file", filter: /.+/ },
//       (args) => {
//         // TODO: Use a generic way of handling excludes.
//         if (this.#toBeIgnored.some((v) => args.path.includes(v))) {
//           return { contents: "" };
//         }
//       },
//     );
//   };
// }
