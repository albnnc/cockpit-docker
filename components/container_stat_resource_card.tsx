import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { useContainerStatResource } from "../hooks/use_container_stat_resource.tsx";
import { Container } from "../types/container.ts";
import { ContainerState } from "./container_state.tsx";

export interface ContainerStatResourceCardOptions {
  container: Container;
}

export const ContainerStatResourceCard = (
  { container }: ContainerStatResourceCardOptions,
) => {
  const { data } = useContainerStatResource(container.id);
  if (!data) {
    return null;
  }
  const rows = [
    ["CPU", data.cpu],
    ["RAM", data.ram],
    ["Network", data.net],
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
