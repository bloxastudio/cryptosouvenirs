import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Stack, Center, Title, createStyles } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import * as Head from "@components/Head";
import GrabLocation from "@components/GrabLocation";
import ConnectMetamask from "@components/ConnectMetamask";
import { AppState } from "@redux/store";

export const Main = () => {
  const { classes } = useStyles();
  const isConnected = useSelector((state: AppState) => state.blockchain && !!state.blockchain.smartContract);
  const [showConnected, setShowConnected] = useState(isConnected);
  const interval = useInterval(() => setShowConnected(true), 1500);

  useEffect(() => {
    if (isConnected) {
      interval.start();
    }
    return interval.stop;
  }, [isConnected]);

  return (
    <Container>
      <Head.Title>Main</Head.Title>
      <Stack>
        {!showConnected && (
          <>
            <Center>
              <Title className={classes.headline}>{`Please connect to Metamask and start minting!`}</Title>
            </Center>
            <ConnectMetamask />
          </>
        )}

        {showConnected && (
          <>
            <Center>
              <Title className={classes.headline}>{`Tell us your location to see the NFTs in your area.`}</Title>
            </Center>
            <GrabLocation />
          </>
        )}
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
