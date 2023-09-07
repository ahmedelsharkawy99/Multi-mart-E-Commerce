import React from "react";
import { Container, Row } from "reactstrap";

const SectionContainer = ({ children, sectionClass }) => {
  return (
    <section className={sectionClass}>
      <Container>
        <Row>{children}</Row>
      </Container>
    </section>
  );
};

export default SectionContainer;
