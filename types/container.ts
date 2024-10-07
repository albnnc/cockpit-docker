export interface Container {
  id: string;
  name: string;
  image: string;
  state:
    | "created"
    | "restarting"
    | "running"
    | "removing"
    | "paused"
    | "exited"
    | "dead";
  status: string;
}
