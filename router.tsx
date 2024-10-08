import { createHashRouter } from "react-router-dom";
import { ContainerPage } from "./pages/container.tsx";
import { DockerPage } from "./pages/docker.tsx";

export const router = createHashRouter([
  { path: "/", element: <DockerPage /> },
  { path: "/containers/:id", element: <ContainerPage /> },
]);
