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
import { useParams } from "react-router-dom";
import {
  ContainerLogInterval,
  containerLogIntervals,
  ContainerLogLineCountMax,
  containerLogLineCountMaxes,
  useContainerLogResource,
} from "../hooks/use_container_log_resource.tsx";

export const containerLogIntervalTitles: Record<
  ContainerLogInterval,
  string
> = {
  "10m": "Last 10 minutes",
  "1h": "Last hour",
  "1d": "Last day",
  "none": "All time",
};

export const containerLogLineCountMaxTitles: Record<
  ContainerLogLineCountMax,
  string
> = {
  100: "100 lines max",
  500: "500 lines max",
  1_000: "1000 lines max",
  5_000: "5000 lines max",
  10_000: "10000 lines max",
};

export const ContainerLogCard = () => {
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
                css={{ width: "170px" }}
              >
                {containerLogIntervals.map((v) => (
                  <FormSelectOption
                    key={v}
                    value={v}
                    label={containerLogIntervalTitles[v]}
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
                css={{ width: "170px" }}
              >
                {containerLogLineCountMaxes.map((v) => (
                  <FormSelectOption
                    key={v}
                    value={v.toString()}
                    label={containerLogLineCountMaxTitles[v]}
                  />
                ))}
              </FormSelect>
            </>
          ),
        }}
      >
        <Title headingLevel="h2">Log</Title>
      </CardHeader>
      <CardBody css={{ padding: 0 }}>
        {items.length
          ? (
            <Table borders variant="compact">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Message</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map(({ date, value }) => (
                  <Tr key={date}>
                    <Td>
                      <Timestamp value={date} />
                    </Td>
                    <Td>{value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )
          : (
            <EmptyState variant={EmptyStateVariant.xs}>
              <EmptyStateHeader titleText="No data" headingLevel="h4" />
              <EmptyStateBody>
                No log lines found.
              </EmptyStateBody>
            </EmptyState>
          )}
      </CardBody>
    </Card>
  );
};
