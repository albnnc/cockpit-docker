import { CardBody, Spinner } from "@patternfly/react-core";

export const LoadingCardBody = () => {
  return (
    <CardBody css={{ display: "flex", justifyContent: "center" }}>
      <Spinner />
    </CardBody>
  );
};
