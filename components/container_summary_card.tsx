import { Card, CardBody, CardTitle, Text, Title } from "@patternfly/react-core";
import { Table, Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { useContainerResource } from "../hooks/use_container_resource.tsx";
import { ContainerState } from "./container_state.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ContainerSummaryCard = () => {
  const [t] = useTranslation();
  const containerResource = useContainerResource();
  const {
    id = "–",
    name = "–",
    image = "–",
    state = "paused",
    status = "–",
  } = containerResource.data ?? {};
  const data = [
    [t("properties.id"), id],
    [t("properties.name"), name],
    [t("properties.image"), image],
    [t("properties.state"), <ContainerState state={state} />],
    [t("properties.status"), status],
  ] as const;
  return (
    <Card css={{ flex: "1 1 auto", maxWidth: "500px", minWidth: "300px" }}>
      <CardTitle>
        <Title headingLevel="h2">{t("headings.summary")}</Title>
      </CardTitle>
      {containerResource.loading
        ? <LoadingCardBody />
        : (
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
        )}
    </Card>
  );
};
