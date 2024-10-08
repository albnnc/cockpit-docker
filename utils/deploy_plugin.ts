import { Plugin, PluginApplyOptions } from "@albnnc/nvil";
import $ from "@david/dax";

export interface DeployPluginOptions {
  sshUrl: string;
}

export class DeployPlugin extends Plugin {
  #sshUrl: string;

  constructor(options: DeployPluginOptions) {
    super("DEPLOY");
    this.#sshUrl = options.sshUrl;
  }

  apply(options: PluginApplyOptions) {
    super.apply(options);
    this.project.stager.on("WRITE_END", async () => {
      this.logger.info(`Deploying to ${this.#sshUrl}`);
      this.logger.info(`Cleaning up remote plugin`);
      await $`ssh ${this.#sshUrl} rm -rf /usr/local/share/cockpit/docker`;
      await $`ssh ${this.#sshUrl} mkdir -p /usr/local/share/cockpit/docker`;
      this.logger.info(`Copying plugin to remote`);
      await $`rsync -a ./.target/ ${this.#sshUrl}:/usr/local/share/cockpit/docker/`;
      this.logger.info(`Done`);
    });
  }
}
