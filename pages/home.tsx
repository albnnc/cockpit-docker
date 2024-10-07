import { Page, PageSection, Spinner } from "@patternfly/react-core";
import { ContainerListCard } from "../components/container_list_card.tsx";
import { ProjectListCard } from "../components/project_list_card.tsx";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { useProjectCollection } from "../hooks/use_project_collection.tsx";

export const HomePage = () => {
  const containerCollection = useContainerCollection();
  const projectCollection = useProjectCollection();
  if (containerCollection.loading || projectCollection.loading) {
    return (
      <Page>
        <PageSection css={{ justifyContent: "center", alignItems: "center" }}>
          <Spinner />
        </PageSection>
      </Page>
    );
  }
  if (!containerCollection.data || !projectCollection.data) {
    // TODO
    return null;
  }
  return (
    <Page>
      <PageSection
        css={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <ProjectListCard projects={projectCollection.data} />
        <ContainerListCard containers={containerCollection.data} />
      </PageSection>
    </Page>
  );
};
