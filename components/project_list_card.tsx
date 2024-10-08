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
import { useProjectCollection } from "../hooks/use_project_collection.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ProjectListCard = () => {
  const projectCollection = useProjectCollection();
  useEffect(() => {
    projectCollection.load();
  }, []);
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">Projects</Title>
      </CardTitle>
      {projectCollection.loading
        ? <LoadingCardBody />
        : (
          <CardBody css={{ padding: "0", color: "red" }}>
            {projectCollection.data?.length
              ? (
                <Table borders variant="compact">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Status</Th>
                      <Th>Configs</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {projectCollection.data?.map((v) => (
                      <Tr key={v.name}>
                        <Td dataLabel="Name">{v.name}</Td>
                        <Td dataLabel="Status">{v.status}</Td>
                        <Td dataLabel="Configs">{v.configs.join(" ")}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )
              : (
                <EmptyState variant={EmptyStateVariant.xs}>
                  <EmptyStateHeader titleText="No data" headingLevel="h4" />
                  <EmptyStateBody>
                    No projects found
                  </EmptyStateBody>
                </EmptyState>
              )}
          </CardBody>
        )}
    </Card>
  );
};
