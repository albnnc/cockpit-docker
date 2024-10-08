import { useEffect, useState } from "react";
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

export interface ContainerLogResourceOptions {
  id?: string;
  interval: ContainerLogInterval;
  lineCountMax: ContainerLogLineCountMax;
}

export function useContainerLogResource(
  { id, interval, lineCountMax }: ContainerLogResourceOptions,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContainerLog | undefined>();
  useEffect(() => {
    if (!id) {
      setData({ items: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    const since = new Date(
      Date.now() - containerLogIntervalValues[interval],
    ).toISOString();
    runCommand([
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
      .then((items) => setData({ items }))
      .catch((e) => {
        console.error(e);
        setData({ items: [] });
      })
      .finally(() => setLoading(false));
  }, [id, interval, lineCountMax]);
  return { data, loading };
}
