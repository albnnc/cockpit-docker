import {
  Card,
  CardBody,
  CardTitle,
  Timestamp,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useContainerLogResource } from "../hooks/use_container_log_resource.tsx";
import { Container } from "../types/container.ts";

export interface ContainerLogResourceCardOptions {
  container: Container;
}

export const ContainerLogResourceCard = (
  { container }: ContainerLogResourceCardOptions,
) => {
  const { data } = useContainerLogResource(container.id);
  if (!data) {
    return null;
  }
  return (
    <Card css={{ width: "100%" }}>
      <CardTitle>
        <Title headingLevel="h2">Log</Title>
      </CardTitle>
      <CardBody css={{ padding: 0 }}>
        <Table borders variant="compact">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.items.toReversed().map(({ date, value }) => (
              <Tr key={date}>
                <Td>
                  <Timestamp value={date} />
                </Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
