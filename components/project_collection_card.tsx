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
import { Project } from "../types/project.ts";

export interface ProjectCollectionCardProps {
  projects: Project[];
}

export const ProjectCollectionCard = ({
  projects,
}: ProjectCollectionCardProps) => {
  return (
    <Card>
      <CardTitle>
        <Title headingLevel="h2">Projects</Title>
      </CardTitle>
      <CardBody css={{ padding: "0", color: "red" }}>
        <Table borders variant="compact">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Configs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((v) => (
              <Tr key={v.name}>
                <Td dataLabel="Name">
                  <NavLink to={`/projects/${v.name}`}>
                    <Text component={TextVariants.a}>
                      {v.name}
                    </Text>
                  </NavLink>
                </Td>
                <Td dataLabel="Status">{v.status}</Td>
                <Td dataLabel="Configs">{v.configs.join(" ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
