import {
  BuildPlugin,
  CleanPlugin,
  CopyPlugin,
  HtmlTemplatePlugin,
  Project,
} from "@albnnc/nvil";
import { Command } from "@cliffy/command";
import $ from "@david/dax";
import * as log from "@std/log";
import * as path from "@std/path";

const currentDir = path.fromFileUrl(import.meta.resolve("./"));

new Command()
  .name("make")
  .command("build", "Build Cockpit plugins.")
  .option("--dev", "Start dev server and watch for file changes.")
  .option("--deploy <sshUrl>", "Deploy artifacts to remote Cockpit instance")
  .action(async ({ dev, deploy: sshUrl }) => {
    const project = new Project({
      plugins: [
        new CleanPlugin(),
        new BuildPlugin({
          entryPoint: `./index.tsx`,
          overrideEsbuildOptions: (options) => {
            options.jsxImportSource = "@emotion/react";
            // options.plugins = [
            //   new IgnoreEsbuildPlugin([
            //     "/units/",
            //     "eve/app.ts",
            //     "log/logger.ts",
            //     "z/cmd",
            //     "ssh_adapter/constants.ts",
            //     "docker.ts",
            //   ]),
            //   ...(dev ? [] : [EsbuildPluginFactory.noSideEffects()]),
            //   denoResolverPlugin({
            //     configPath: compoundDenoConfig.path,
            //   }),
            //   denoLoaderPlugin({
            //     configPath: compoundDenoConfig.path,
            //     loader: "native",
            //   }),
            // ];
            return options;
          },
        }),
        new HtmlTemplatePlugin({ entryPoint: `./index.html` }),
        new CopyPlugin({
          entryPoint: `./manifest.json`,
          bundleUrl: "./manifest.json",
        }),
      ],
      sourceUrl: import.meta.resolve(`./`),
      targetUrl: import.meta.resolve(`./.target/`),
      dev: !!dev,
    });
    await project.bootstrap();
    await project.done();
    if (sshUrl) {
      log.info(`Deploying to ${sshUrl}`);
      log.info(`Cleaning up remote plugins`);
      await $`ssh ${sshUrl} rm -rf /usr/local/share/cockpit`;
      log.info(`Copying plugins to remote`);
      await $`scp -rp ./.target/cockpit/plugins ${sshUrl}:/usr/local/share/cockpit`;
    }
    Deno.exit(0); // FIXME
  });

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
