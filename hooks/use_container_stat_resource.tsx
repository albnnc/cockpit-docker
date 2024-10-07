import { useEffect, useState } from "react";
import { ContainerStat } from "../types/container_stat.ts";
import { runCommand } from "../utils/cockpit.ts";

export function useContainerStatResource(id?: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContainerStat | undefined>();
  useEffect(() => {
    if (!id) {
      setData(undefined);
      setLoading(false);
      return;
    }
    setLoading(true);
    runCommand(["docker", "stats", "--no-stream", "--format", "json", id])
      .then((output) => {
        const raw = JSON.parse(output) as Record<string, string>;
        return {
          cpu: raw.CPUPerc,
          ram: raw.MemUsage,
          net: raw.NetIO,
        };
      })
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData(undefined);
      })
      .finally(() => setLoading(false));
  }, [id]);
  return { data, loading };
}
