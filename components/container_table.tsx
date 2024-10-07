import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Label,
  Text,
  TextVariants,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";

export const ContainerTable = () => {
  const { data } = useContainerCollection();
  return (
    <Card id="container-table" isClickable>
      <CardHeader>
        <CardTitle component="h2">Containers</CardTitle>
      </CardHeader>
      <CardBody css={{ padding: "0", color: "red" }}>
        <Table borders variant="compact">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>State</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((v) => (
              <Tr key={v.name}>
                <Td dataLabel="ID">
                  <Text
                    component={TextVariants.a}
                    href={`./containers/${v.id}`}
                  >
                    {v.id}
                  </Text>
                </Td>
                <Td dataLabel="Name">{v.name}</Td>
                <Td dataLabel="Name">{v.image}</Td>
                <Td dataLabel="State">
                  <Label
                    color={({
                      "created": "blue",
                      "restarting": "orange",
                      "running": "green",
                      "removing": "grey",
                      "paused": "grey",
                      "exited": "orange",
                      "dead": "red",
                    } as const)[v.state] || "grey" as const}
                  >
                    {v.state.slice(0, 1).toLocaleUpperCase() + v.state.slice(1)}
                  </Label>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
