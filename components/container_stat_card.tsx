import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContainerStatResource } from "../hooks/use_container_stat_resource.tsx";

export const ContainerStatCard = () => {
  const { id } = useParams();
  const containerStatResource = useContainerStatResource();
  useEffect(() => {
    containerStatResource.load(id);
  }, []);
  const {
    cpu = "–",
    ram = "–",
    net = "–",
  } = containerStatResource.data ?? {};
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
