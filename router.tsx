import { createHashRouter, Navigate } from "react-router-dom";
import { ContainerCollectionPage } from "./pages/container_collection.tsx";
import { ContainerResourcePage } from "./pages/container_resource.tsx";

export const router = createHashRouter([
  { path: "/", element: <Navigate to="/containers" /> },
  { path: "/containers", element: <ContainerCollectionPage /> },
  { path: "/containers/:id", element: <ContainerResourcePage /> },
]);
