import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { ContainerStat } from "../types/container_stat.ts";

export interface ContainerStatResourceCardOptions {
  containerStat: ContainerStat;
}

export const ContainerStatResourceCard = (
  { containerStat: { cpu, ram, net } }: ContainerStatResourceCardOptions,
) => {
  const rows = [
    ["CPU", cpu],
    ["RAM", ram],
    ["Network", net],
  ] as const;
  return (
    <Card css={{ flex: "1 1 auto", maxWidth: "500px", minWidth: "300px" }}>
      <CardTitle>
        <Title headingLevel="h2">Stats</Title>
      </CardTitle>
      <CardBody css={{ padding: 0 }}>
        <Table borders variant="compact">
          <Tbody>
            {rows.map(([k, v]) => (
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
