import { Label } from "@patternfly/react-core";
import { Container } from "../types/container.ts";

export interface ContainerStateProps {
  container: Container;
}

export const ContainerState = ({ container }: ContainerStateProps) => {
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
      } as const)[container.state] || "grey" as const}
    >
      {container.state.slice(0, 1).toLocaleUpperCase() +
        container.state.slice(1)}
    </Label>
  );
};
