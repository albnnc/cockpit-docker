import { create } from "zustand";
import { Container } from "../types/container.ts";
import { runCommand } from "../utils/cockpit.ts";

export interface ContainerCollection {
  data: Container[] | undefined;
  loading: boolean;
  load: () => Promise<void>;
}

export const useContainerCollection = create<ContainerCollection>((set) => ({
  data: undefined,
  loading: false,
  load: async () => {
    set({ loading: true });
    await runCommand(["docker", "container", "ls", "-a", "--format", "json"])
      .then((output) =>
        output
          .split("\n")
          .map((v) => v.trim())
          .filter((v) => v)
          .map((v) => JSON.parse(v) as Record<string, string>)
          .map((v) => ({
            id: v.ID,
            name: v.Names.split(/\s+/)[0],
            image: v.Image,
            state: v.State as Container["state"],
            status: v.Status,
          }))
      )
      .then((data) =>
        set({
          data,
          loading: false,
        })
      )
      .catch((e) => {
        console.error(e);
        set({
          data: undefined,
          loading: false,
        });
      });
  },
}));
