import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageBreadcrumb,
  PageGroup,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ContainerLogCard } from "../components/container_log_card.tsx";
import { ContainerStatCard } from "../components/container_stat_card.tsx";
import { ContainerSummaryCard } from "../components/container_summary_card.tsx";
import { useContainerResource } from "../hooks/use_container_resource.tsx";

export const ContainerPage = () => {
  const { id } = useParams();
  const containerResource = useContainerResource();
  useEffect(() => {
    containerResource.load(id);
  }, [id]);
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
        {containerResource.data && (
          <PageSection variant="light">
            <Title headingLevel="h1">{containerResource.data.name}</Title>
          </PageSection>
        )}
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
            <ContainerSummaryCard />
            <ContainerStatCard />
          </div>
          <div>
            <ContainerLogCard />
          </div>
        </div>
      </PageSection>
    </Page>
  );
};
