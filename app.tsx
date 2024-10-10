import { useCallback, useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

const [htmlContainer] = document.getElementsByTagName("html");

export const App = () => {
  const setTheme = useCallback(() => {
    const theme = localStorage.getItem("shell:style");
    if (
      theme === "dark" ||
      theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      htmlContainer.className = "pf-v5-theme-dark";
    } else {
      htmlContainer.className = "";
    }
  }, []);
  useEffect(() => {
    setTheme();
    addEventListener("storage", (event) => {
      if (event.key === "shell:style") {
        setTheme();
      }
    });
  }, []);
  return useMemo(() => <RouterProvider router={router} />, []);
};
