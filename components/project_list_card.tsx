import { Card, CardBody, CardTitle, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useEffect } from "react";
import { useProjectCollection } from "../hooks/use_project_collection.tsx";

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
      <CardBody css={{ padding: "0", color: "red" }}>
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
      </CardBody>
    </Card>
  );
};
