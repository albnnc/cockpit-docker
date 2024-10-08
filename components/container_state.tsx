import { Label } from "@patternfly/react-core";
import { Container } from "../types/container.ts";

export interface ContainerStateProps {
  state: Container["state"];
}

export const ContainerState = ({ state }: ContainerStateProps) => {
  return (
    <Label
      color={({
        "created": "blue",
        "restarting": "orange",
        "running": "green",
        "removing": "grey",
        "paused": "grey",
        "exited": "orange",
        "dead": "red",
      } as const)[state] || "grey" as const}
    >
      {state.slice(0, 1).toLocaleUpperCase() + state.slice(1)}
    </Label>
  );
};
