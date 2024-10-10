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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContainerCollection } from "../hooks/use_container_collection.tsx";
import { ContainerState } from "./container_state.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ContainerListCard = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const containerCollection = useContainerCollection();
  useEffect(() => {
    containerCollection.load();
  }, []);
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">{t("headings.containers")}</Title>
      </CardTitle>
      {containerCollection.loading
        ? <LoadingCardBody />
        : (
          <CardBody css={{ padding: "0" }}>
            {containerCollection.data?.length
              ? (
                <Table borders variant="compact">
                  <Thead>
                    <Tr>
                      <Th>{t("properties.id")}</Th>
                      <Th>{t("properties.name")}</Th>
                      <Th>{t("properties.image")}</Th>
                      <Th>{t("properties.state")}</Th>
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
                  <EmptyStateHeader
                    titleText={t("headings.noData")}
                    headingLevel="h4"
                  />
                  <EmptyStateBody>
                    {t("descriptions.noContainers")}
                  </EmptyStateBody>
                </EmptyState>
              )}
          </CardBody>
        )}
    </Card>
  );
};
