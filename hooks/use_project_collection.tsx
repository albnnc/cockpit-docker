import { create } from "zustand";
import { Project } from "../types/project.ts";
import { runCommand } from "../utils/cockpit.ts";

export interface ProjectCollection {
  data: Project[] | undefined;
  loading: boolean;
  load: () => Promise<void>;
}

export const useProjectCollection = create<ProjectCollection>((set) => ({
  data: [],
  loading: false,
  load: async () => {
    set({ loading: true });
    await runCommand(["docker", "compose", "ls", "--format", "json"])
      .then((output) => {
        const raw = JSON.parse(output) as Record<string, string>[];
        return raw.map((v) => ({
          name: v.Name,
          status: v.Status,
          configs: [v.ConfigFiles],
        }));
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
}));
