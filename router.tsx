import { createHashRouter } from "react-router-dom";
import { ContainerResourcePage } from "./pages/container_resource.tsx";
import { HomePage } from "./pages/home.tsx";

export const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/containers/:id", element: <ContainerResourcePage /> },
]);
