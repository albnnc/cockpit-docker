import { Page, PageSection, Spinner } from "@patternfly/react-core";
import { ContainerCollectionCard } from "../components/container_collection_card.tsx";
import { ProjectCollectionCard } from "../components/project_collection_card.tsx";
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
    return null;
  }
  return (
    <Page>
      <PageSection
        css={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <ProjectCollectionCard projects={projectCollection.data} />
        <ContainerCollectionCard containers={containerCollection.data} />
      </PageSection>
    </Page>
  );
};
