import { Page, PageSection } from "@patternfly/react-core";
import { ContainerCollectionCard } from "../components/container_collection_card.tsx";

export const ContainerCollectionPage = () => {
  return (
    <Page>
      <PageSection>
        <ContainerCollectionCard />
      </PageSection>
    </Page>
  );
};
