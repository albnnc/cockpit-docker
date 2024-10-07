import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { Container } from "../types/container.ts";
import { ContainerState } from "./container_state.tsx";

export interface ContainerSummaryCardOptions {
  container: Container;
}

export const ContainerSummaryCard = ({
  container,
}: ContainerSummaryCardOptions) => {
  const data = [
    ["ID", container.id],
    ["Name", container.name],
    ["Image", container.image],
    ["State", <ContainerState container={container} />],
    ["Status", container.status],
  ] as const;
  return (
    <Card css={{ flex: "1 1 auto", maxWidth: "500px", minWidth: "300px" }}>
      <CardTitle>
        <Title headingLevel="h2">Summary</Title>
      </CardTitle>
      <CardBody css={{ padding: 0 }}>
        <Table borders variant="compact">
          <Tbody>
            {data.map(([k, v]) => (
              <Tr key={k}>
                <Td>
                  <Text css={{ fontWeight: "bold" }}>
                    {k}
                  </Text>
                </Td>
                <Td>{v}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
