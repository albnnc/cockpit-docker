import { useEffect, useState } from "react";
import { ContainerLog } from "../types/container_log.ts";
import { runCommand } from "../utils/cockpit.ts";

export function useContainerLogResource(id?: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContainerLog | undefined>();
  useEffect(() => {
    if (!id) {
      setData({ items: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    runCommand(["docker", "logs", "-t", id])
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
      )
      .then((items) => setData({ items }))
      .catch((e) => {
        console.error(e);
        setData({ items: [] });
      })
      .finally(() => setLoading(false));
  }, [id]);
  return { data, loading };
}
