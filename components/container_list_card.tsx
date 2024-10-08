import {
  Card,
  CardBody,
  CardTitle,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateVariant,
  Text,
  TextVariants,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { ContainerState } from "./container_state.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ContainerListCard = () => {
  const navigate = useNavigate();
  const containerCollection = useContainerCollection();
  useEffect(() => {
    containerCollection.load();
  }, []);
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">Containers</Title>
      </CardTitle>
      {containerCollection.loading
        ? <LoadingCardBody />
        : (
          <CardBody css={{ padding: "0", color: "red" }}>
            {containerCollection.data?.length
              ? (
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
                    {containerCollection.data?.map((v) => (
                      <Tr key={v.name}>
                        <Td dataLabel="ID">
                          <Text
                            component={TextVariants.a}
                            onClick={() => navigate(`/containers/${v.id}`)}
                          >
                            {v.id}
                          </Text>
                        </Td>
                        <Td dataLabel="Name">{v.name}</Td>
                        <Td dataLabel="Name">{v.image}</Td>
                        <Td dataLabel="State">
                          <ContainerState state={v.state} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )
              : (
                <EmptyState variant={EmptyStateVariant.xs}>
                  <EmptyStateHeader titleText="No data" headingLevel="h4" />
                  <EmptyStateBody>
                    No containers found
                  </EmptyStateBody>
                </EmptyState>
              )}
          </CardBody>
        )}
    </Card>
  );
};
