import { useEffect, useState } from "react";
import { Container } from "../types/container.ts";
import { runCommand } from "../utils/cockpit.ts";

export function useContainerCollection() {
  const [data, setData] = useState<Container[]>([]);
  useEffect(() => {
    runCommand(["docker", "container", "ls", "-a", "--format", "json"])
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
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData([]);
      });
  }, []);
  return { data };
}
