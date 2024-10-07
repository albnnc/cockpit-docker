import { useEffect, useState } from "react";
import { Project } from "../types/project.ts";
import { runCommand } from "../utils/cockpit.ts";

export function useProjectCollection() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    runCommand(["docker", "compose", "ls", "--format", "json"])
      .then((output) => {
        const raw = JSON.parse(output) as Record<string, string>[];
        return raw.map((v) => ({
          name: v.Name,
          status: v.Status,
          configs: [v.ConfigFiles],
        }));
      })
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
