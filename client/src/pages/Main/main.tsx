import "react";
import { Title } from "@components/Head";
import { Container } from "@mantine/core";

export const Main = () => {
  return (
    <Container>
      <Title>Main</Title>
      {"Hello Dear World"}
    </Container>
  );
};

export default Main;
