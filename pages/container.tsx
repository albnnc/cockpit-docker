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
import { ContainerLogCard } from "../components/container_log_card.tsx";
import { ContainerStatCard } from "../components/container_stat_card.tsx";
import { ContainerSummaryCard } from "../components/container_summary_card.tsx";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { useContainerLogResource } from "../hooks/use_container_log_resource.tsx";
import { useContainerStatResource } from "../hooks/use_container_stat_resource.tsx";

export const ContainerPage = () => {
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
            <NavLink to="/">
              <BreadcrumbItem>
                Home
              </BreadcrumbItem>
            </NavLink>
            <BreadcrumbItem>
              Containers
            </BreadcrumbItem>
            <BreadcrumbItem isActive>
              {id}
            </BreadcrumbItem>
          </Breadcrumb>
        </PageBreadcrumb>
        {container && (
          <PageSection variant="light">
            <Title headingLevel="h1">{container?.name || "unknown"}</Title>
          </PageSection>
        )}
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
                <ContainerStatCard
                  containerStat={containerStatResource.data}
                />
              </div>
              <div>
                <ContainerLogCard
                  containerLog={containerLogResource.data}
                />
              </div>
            </div>
          </PageSection>
        )
        : (
          <PageSection css={{ display: "flex", justifyContent: "center" }}>
            TODO
          </PageSection>
        )}
    </Page>
  );
};
