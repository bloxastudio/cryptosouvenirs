import React, { useCallback } from "react";
import { Button, Text, createStyles, Paper } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "@redux/blockchain/actions";

import CONFIG from "../../config.json";
import { AppState } from "@redux/store";

const Connector = () => {
  const { classes } = useStyles();
  const blockchain = useSelector((state: AppState) => state.blockchain);
  const dispatch = useDispatch();

  const handleConnect = useCallback(() => {
    dispatch(connect() as any);
  }, []);

  const isConnected = !!blockchain.smartContract;
  console.log(blockchain);

  return (
    <Paper className={classes.root} shadow="md" p="lg" my="lg">
      {!isConnected ? (
        <>
          <Text>{`Connect to the ${CONFIG.NETWORK.NAME} network`}</Text>
          <Button uppercase type="button" size="lg" variant="gradient" gradient={{ from: "indigo", to: "cyan" }} onClick={handleConnect}>
            {"Connect"}
          </Button>
        </>
      ) : (
        <Text>{`Connected to the  ${CONFIG.NETWORK.NAME} network`}</Text>
      )}
      {blockchain.errorMsg !== "" && (
        <Text mt="lg" align="center" color="red">
          {blockchain.errorMsg}
        </Text>
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
}));

export default Connector;
