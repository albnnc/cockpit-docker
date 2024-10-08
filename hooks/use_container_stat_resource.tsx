import { create } from "zustand";
import { ContainerStat } from "../types/container_stat.ts";
import { runCommand } from "../utils/cockpit.ts";

export interface ContainerStatResource {
  data: ContainerStat | undefined;
  loading: boolean;
  load: (id?: string) => Promise<void>;
}

export const useContainerStatResource = create<ContainerStatResource>(
  (set) => ({
    data: undefined,
    loading: false,
    load: async (id?: string) => {
      if (!id) {
        set({
          data: undefined,
          loading: false,
        });
        return;
      }
      set({ loading: true });
      await runCommand([
        "docker",
        "stats",
        "--no-stream",
        "--format",
        "json",
        id,
      ])
        .then((output) => {
          const raw = JSON.parse(output) as Record<string, string>;
          return {
            cpu: raw.CPUPerc,
            ram: raw.MemUsage,
            net: raw.NetIO,
          };
        })
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
  }),
);
