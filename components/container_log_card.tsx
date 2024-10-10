import {
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateVariant,
  FormSelect,
  FormSelectOption,
  Timestamp,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  ContainerLogInterval,
  containerLogIntervals,
  ContainerLogLineCountMax,
  containerLogLineCountMaxes,
  useContainerLogResource,
} from "../hooks/use_container_log_resource.tsx";
import { LoadingCardBody } from "./loading_card_body.tsx";

export const ContainerLogCard = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const [interval, setInterval] = useState<ContainerLogInterval>("10m");
  const [lineCountMax, setLineCountMax] = useState<ContainerLogLineCountMax>(
    100,
  );
  const containerLogResource = useContainerLogResource();
  useEffect(() => {
    containerLogResource.load({ id, interval, lineCountMax });
  }, [interval, lineCountMax]);
  const { items = [] } = containerLogResource.data ?? {};
  return (
    <Card css={{ width: "100%" }}>
      <CardHeader
        actions={{
          actions: (
            <>
              <FormSelect
                id="container-log-interval"
                value={interval}
                onChange={(v) =>
                  setInterval(
                    (v.target as HTMLSelectElement)
                      .value as ContainerLogInterval,
                  )}
                css={{ width: "230px" }}
              >
                {containerLogIntervals.map((v) => (
                  <FormSelectOption
                    key={v}
                    value={v}
                    label={t(`logIntervalTitles.${v}`)}
                  />
                ))}
              </FormSelect>
              <FormSelect
                id="container-log-line-count-max"
                value={lineCountMax}
                onChange={(v) => {
                  const raw = (v.target as HTMLSelectElement).value as string;
                  setLineCountMax(+raw as ContainerLogLineCountMax);
                }}
                css={{ width: "230px" }}
              >
                {containerLogLineCountMaxes.map((v) => (
                  <FormSelectOption
                    key={v}
                    value={v.toString()}
                    label={t(`logLineCountMaxTitles.${v}`)}
                  />
                ))}
              </FormSelect>
            </>
          ),
        }}
      >
        <Title headingLevel="h2">{t("headings.log")}</Title>
      </CardHeader>
      {containerLogResource.loading
        ? <LoadingCardBody />
        : (
          <CardBody css={{ padding: 0 }}>
            {items.length
              ? (
                <Table borders variant="compact">
                  <Thead>
                    <Tr>
                      <Th>{t("properties.date")}</Th>
                      <Th>{t("properties.message")}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items.map(({ date, value }) => (
                      <Tr key={date}>
                        <Td>
                          <Timestamp
                            value={date}
                            css={{ whiteSpace: "nowrap" }}
                          />
                        </Td>
                        <Td>{value}</Td>
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
                    {t("descriptions.noLogLines")}
                  </EmptyStateBody>
                </EmptyState>
              )}
          </CardBody>
        )}
    </Card>
  );
};
