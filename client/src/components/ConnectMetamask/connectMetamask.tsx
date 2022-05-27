import React, { useCallback } from "react";
import { Stack, Center, Title, Button, Text, createStyles, Paper } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "@redux/blockchain/actions";

import CONFIG from "../../config.json";
import { AppState } from "@redux/store";
import ConnectedAnimation from "./connectedAnimation";

const Connector = () => {
  const { classes } = useStyles();
  const blockchain = useSelector((state: AppState) => state.blockchain);
  const dispatch = useDispatch();

  const handleConnect = useCallback(() => {
    dispatch(connect() as any);
  }, []);

  const isConnected = !!blockchain.smartContract;

  return (
    <Paper className={classes.root} shadow="md" p="lg" my="lg">
      {!isConnected ? (
        <>
          <>
            <Text>{`Connect to the ${CONFIG.NETWORK.NAME} network`}</Text>
            <Button uppercase type="button" size="lg" variant="gradient" gradient={{ from: "indigo", to: "cyan" }} onClick={handleConnect}>
              {"Connect"}
            </Button>
          </>
          {blockchain.errorMsg !== "" && (
            <Text mt="lg" align="center" color="red">
              {blockchain.errorMsg}
            </Text>
          )}
        </>
      ) : (
        <ConnectedAnimation />
      )}
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: theme.spacing.lg,
    height: "100%",
    width: "100%",
  },
  headline: {
    textAlign: "center",
    maxWidth: "36rem",
    paddingTop: theme.spacing.md,
  },
}));

export default Connector;
