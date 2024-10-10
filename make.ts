#!/usr/bin/env -S deno run -A
import {
  denoLoaderPlugin,
  denoResolverPlugin,
} from "@albnnc/esbuild-deno-loader";
import {
  BuildPlugin,
  CleanPlugin,
  CopyPlugin,
  EsbuildPluginFactory,
  HtmlTemplatePlugin,
  Project,
} from "@albnnc/nvil";
import { Command } from "@cliffy/command";
import $ from "@david/dax";
import * as path from "@std/path";
import denoConfig from "./deno.json" with { type: "json" };
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
              ...(dev ? [] : [EsbuildPluginFactory.noSideEffects()]),
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
        new CopyPlugin({
          entryPoint: "./locales/**/*.json",
          glob: true,
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
  .command("pack", "Package build artifacts into .tar.gz.")
  .action(async () => {
    $.cd(path.fromFileUrl(import.meta.resolve("./.target/")));
    const artifactName = `cockpit-docker-${denoConfig.version}.tar.gz`;
    await $`touch ${artifactName}`;
    await $`tar --exclude=${artifactName} -cf ${artifactName} .`;
  })
  .command("version", "Print project version.")
  .action(() => {
    console.log(denoConfig.version);
  })
  .parse(Deno.args);
