import {
  Card,
  CardBody,
  CardTitle,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProjectCollection } from "../hooks/use_project_collection.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ProjectListCard = () => {
  const [t] = useTranslation();
  const projectCollection = useProjectCollection();
  useEffect(() => {
    projectCollection.load();
  }, []);
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">
          {t("headings.projects")}
        </Title>
      </CardTitle>
      {projectCollection.loading
        ? <LoadingCardBody />
        : (
          <CardBody css={{ padding: "0" }}>
            {projectCollection.data?.length
              ? (
                <Table borders variant="compact">
                  <Thead>
                    <Tr>
                      <Th>{t("properties.name")}</Th>
                      <Th>{t("properties.status")}</Th>
                      <Th>{t("properties.configs")}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {projectCollection.data?.map((v) => (
                      <Tr key={v.name}>
                        <Td dataLabel={t("properties.name") as string}>
                          {v.name}
                        </Td>
                        <Td dataLabel={t("properties.status") as string}>
                          {v.status}
                        </Td>
                        <Td dataLabel={t("properties.configs") as string}>
                          {v.configs.join(" ")}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )
              : (
                <EmptyState variant={EmptyStateVariant.xs}>
                  <EmptyStateHeader
                    titleText={t("headings.noData")}
                    headingLevel="h4"
                  />
                  <EmptyStateBody>
                    {t("descriptions.noProjects")}
                  </EmptyStateBody>
                </EmptyState>
              )}
          </CardBody>
        )}
    </Card>
  );
};
