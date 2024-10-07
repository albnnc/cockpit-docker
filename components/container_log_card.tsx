import {
  Card,
  CardBody,
  CardTitle,
  Timestamp,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { ContainerLog } from "../types/container_log.ts";

export interface ContainerLogCardProps {
  containerLog: ContainerLog;
}

export const ContainerLogCard = ({
  containerLog: { items },
}: ContainerLogCardProps) => {
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
            {items.toReversed().map(({ date, value }) => (
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
