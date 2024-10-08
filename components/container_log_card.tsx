import {
  Card,
  CardBody,
  CardHeader,
  FormSelect,
  FormSelectOption,
  Timestamp,
  Title,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import {
  ContainerLogInterval,
  containerLogIntervals,
  ContainerLogLineCountMax,
  containerLogLineCountMaxes,
} from "../hooks/use_container_log_resource.tsx";
import { ContainerLog } from "../types/container_log.ts";

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

export interface ContainerLogCardProps {
  containerLog: ContainerLog;
  containerLogInterval: ContainerLogInterval;
  containerLogLineCountMax: ContainerLogLineCountMax;
  onContainerLogIntervalChange: (v: ContainerLogInterval) => void;
  onContainerLogLineCountMaxChange: (v: ContainerLogLineCountMax) => void;
}

export const ContainerLogCard = ({
  containerLog: { items },
  containerLogInterval,
  containerLogLineCountMax,
  onContainerLogIntervalChange,
  onContainerLogLineCountMaxChange,
}: ContainerLogCardProps) => {
  return (
    <Card css={{ width: "100%" }}>
      <CardHeader
        actions={{
          actions: (
            <>
              <FormSelect
                id="container-log-interval"
                value={containerLogInterval}
                onChange={(v) =>
                  onContainerLogIntervalChange?.(
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
                value={containerLogLineCountMax}
                onChange={(v) => {
                  const raw = (v.target as HTMLSelectElement).value as string;
                  onContainerLogLineCountMaxChange?.(
                    +raw as ContainerLogLineCountMax,
                  );
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
        <Table borders variant="compact">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.toReversed().map(({ date, value }) => (
              <Tr key={date}>
                <Td>
                  <Timestamp value={date} />
                </Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
