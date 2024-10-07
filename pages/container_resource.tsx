import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageBreadcrumb,
  PageGroup,
  PageSection,
  Spinner,
  Title,
} from "@patternfly/react-core";
import { NavLink, useParams } from "react-router-dom";
import { ContainerLogResourceCard } from "../components/container_log_resource_card.tsx";
import { ContainerStatResourceCard } from "../components/container_stat_resource_card.tsx";
import { ContainerSummaryCard } from "../components/container_summary_card.tsx";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { useContainerLogResource } from "../hooks/use_container_log_resource.tsx";
import { useContainerStatResource } from "../hooks/use_container_stat_resource.tsx";

export const ContainerResourcePage = () => {
  const { id } = useParams();
  const containerCollection = useContainerCollection();
  const container = containerCollection.data.find((v) => v.id === id);
  const containerStatResource = useContainerStatResource(container?.id);
  const containerLogResource = useContainerLogResource(container?.id);
  const loading = containerCollection.loading ||
    containerStatResource.loading ||
    containerLogResource.loading;
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
              {id}
            </BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        <PageSection variant="light">
          <Title headingLevel="h1">{container?.name || "unknown"}</Title>
        </PageSection>
      </PageGroup>
      {loading
        ? (
          <PageSection
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </PageSection>
        )
        : container && containerStatResource.data && containerLogResource.data
        ? (
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
                <ContainerStatResourceCard
                  containerStat={containerStatResource.data}
                />
              </div>
              <div>
                <ContainerLogResourceCard
                  containerLog={containerLogResource.data}
                />
              </div>
            </div>
          </PageSection>
        )
        : (
          <PageSection css={{ display: "flex", justifyContent: "center" }}>
            <Spinner />
          </PageSection>
        )}
    </Page>
  );
};
