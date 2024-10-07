import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  Page,
  PageSection,
  PageSectionVariants,
  TextContent,
} from "@patternfly/react-core";
import { useCallback, useEffect } from "react";

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
      <PageSection variant={PageSectionVariants.light}>
        <EmptyState className="virtualization-disabled-empty-state">
          <EmptyStateHeader
            titleText={"Test 1"}
            headingLevel="h4"
          />
          <EmptyStateBody>
            <TextContent>
              Sample
            </TextContent>
          </EmptyStateBody>
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button
                id="ignore-hw-virtualization-disabled-btn"
                variant="secondary"
                onClick={() => {
                  localStorage.setItem(
                    "virtualization-disabled-ignored",
                    "true",
                  );
                }}
              >
                Ignore
              </Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </PageSection>
    </Page>
  );
};
