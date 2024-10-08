import { Page, PageSection } from "@patternfly/react-core";
import { ContainerListCard } from "../components/container_list_card.tsx";
import { ProjectListCard } from "../components/project_list_card.tsx";

export const DockerPage = () => {
  return (
    <Page>
      <PageSection
        css={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <ProjectListCard />
        <ContainerListCard />
      </PageSection>
    </Page>
  );
};
