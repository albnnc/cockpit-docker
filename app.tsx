import { Page, PageSection } from "@patternfly/react-core";
import { useCallback, useEffect } from "react";
import { ContainerTable } from "./components/container_table.tsx";

const [htmlContainer] = document.getElementsByTagName("html");

export const App = () => {
  const setTheme = useCallback(() => {
    const theme = localStorage.getItem("shell:style");
    if (theme === "dark") {
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
  return (
    <Page>
      <PageSection>
        <ContainerTable />
      </PageSection>
    </Page>
  );
};
