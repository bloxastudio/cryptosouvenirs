import "react";
import * as Head from "@components/Head";
import { Container, Stack, Center, Title, createStyles } from "@mantine/core";
import GrabLocation from "@components/GrabLocation";

export const Main = () => {
  const { classes } = useStyles();

  return (
    <Container>
      <Head.Title>Main</Head.Title>
      <Stack>
        <Center>
          <Title className={classes.headline}>{`Tell use your location to see the NFTs in your area.`}</Title>
        </Center>
        <GrabLocation />
      </Stack>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  headline: {
    textAlign: "center",
    maxWidth: "36rem",
    paddingTop: theme.spacing.md,
  },
}));

export default Main;
