import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageBreadcrumb,
  PageGroup,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { NavLink, useParams } from "react-router-dom";
import { ContainerLogResourceCard } from "../components/container_log_resource_card.tsx";
import { ContainerStatResourceCard } from "../components/container_stat_resource_card.tsx";
import { ContainerSummaryCard } from "../components/container_summary_card.tsx";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";

export const ContainerResourcePage = () => {
  const { id } = useParams();
  const { data } = useContainerCollection();
  const container = data.find((v) => v.id === id);
  if (!container) {
    return null;
  }
  return (
    <Page>
      <PageGroup hasShadowBottom>
        <PageBreadcrumb>
          <Breadcrumb>
            <NavLink to="/containers">
              <BreadcrumbItem>
                Containers
              </BreadcrumbItem>
            </NavLink>
            <BreadcrumbItem isActive>
              {container.id}
            </BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <PageSection variant="light">
          <Title headingLevel="h1">{container.name}</Title>
        </PageSection>
      </PageGroup>
      <PageSection>
        <div
          css={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          <div
            css={{
              width: "100%",
              display: "flex",
              alignItems: "start",
              gap: "1em",
            }}
          >
            <ContainerSummaryCard container={container} />
            <ContainerStatResourceCard container={container} />
          </div>
          <div>
            <ContainerLogResourceCard container={container} />
          </div>
        </div>
      </PageSection>
    </Page>
  );
};
