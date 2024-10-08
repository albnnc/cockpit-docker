import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { useContainerResource } from "../hooks/use_container_resource.tsx";
import { ContainerState } from "./container_state.tsx";

export const ContainerSummaryCard = () => {
  const containerResource = useContainerResource();
  const {
    id = "–",
    name = "–",
    image = "–",
    state = "paused",
    status = "–",
  } = containerResource.data ?? {};
  const data = [
    ["ID", id],
    ["Name", name],
    ["Image", image],
    ["State", <ContainerState state={state} />],
    ["Status", status],
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
