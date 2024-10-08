import { create } from "zustand";
import { ContainerLog } from "../types/container_log.ts";
import { runCommand } from "../utils/cockpit.ts";

export const containerLogIntervals = ["10m", "1h", "1d", "none"] as const;

export type ContainerLogInterval = (typeof containerLogIntervals)[number];

export const containerLogIntervalValues: Record<ContainerLogInterval, number> =
  {
    "10m": 1_000 * 60 * 15,
    "1h": 1_000 * 60 * 60,
    "1d": 1_000 * 60 * 60 * 24,
    "none": -1,
  };

export const containerLogLineCountMaxes = [
  100,
  500,
  1_000,
  5_000,
  10_000,
];

export type ContainerLogLineCountMax = number;

export interface ContainerLogResourceLoadOptions {
  id?: string;
  interval: ContainerLogInterval;
  lineCountMax: ContainerLogLineCountMax;
}

export interface ContainerLogResource {
  data: ContainerLog | undefined;
  loading: boolean;
  load: (options: ContainerLogResourceLoadOptions) => Promise<void>;
}

export const useContainerLogResource = create<ContainerLogResource>((set) => ({
  data: undefined,
  loading: false,
  load: async ({
    id,
    interval,
    lineCountMax,
  }) => {
    if (!id) {
      set({
        data: { items: [] },
        loading: false,
      });
      return;
    }
    set({ loading: true });
    const since = new Date(
      Date.now() - containerLogIntervalValues[interval],
    ).toISOString();
    await runCommand([
      "docker",
      "logs",
      "--timestamps",
      ...(interval === "none" ? [] : ["--since", since]),
      id,
    ])
      .then((output) =>
        output
          .split("\n")
          .map((v) => v.trim())
          .filter((v) => v)
          .map((v) => {
            const [date, ...rest] = v.split(" ");
            return {
              date,
              value: rest.join(" "),
            };
          })
          .reverse()
          .slice(0, lineCountMax)
      )
      .then((items) =>
        set({
          data: { items },
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
