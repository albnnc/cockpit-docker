import { createHashRouter } from "react-router-dom";
import { ContainerPage } from "./pages/container.tsx";
import { HomePage } from "./pages/home.tsx";

export const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/containers/:id", element: <ContainerPage /> },
]);
