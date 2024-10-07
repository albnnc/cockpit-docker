import {
  Card,
  CardBody,
  CardTitle,
  Text,
  TextVariants,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { NavLink } from "react-router-dom";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { ContainerState } from "./container_state.tsx";

export const ContainerCollectionCard = () => {
  const { data } = useContainerCollection();
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">Containers</Title>
      </CardTitle>
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
                  <NavLink to={`/containers/${v.id}`}>
                    <Text component={TextVariants.a}>
                      {v.id}
                    </Text>
                  </NavLink>
                </Td>
                <Td dataLabel="Name">{v.name}</Td>
                <Td dataLabel="Name">{v.image}</Td>
                <Td dataLabel="State">
                  <ContainerState container={v} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
