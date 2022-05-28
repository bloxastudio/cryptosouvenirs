import React, { useEffect } from "react";
import useMint from "@hooks/useMint";
import { Button, createStyles, Group, LoadingOverlay, Paper, Stack, Text } from "@mantine/core";

const Mint = (props: MintProps) => {
  const {
    nft: { rowKey },
    onDismiss,
  } = props;

  const { mint, transaction, loading, error } = useMint();
  const confirmed = transaction || loading || error;

  const { classes } = useStyles();

  return (
    <Stack className={classes.root}>
      <LoadingOverlay visible={loading} />
      <Stack>
        {transaction && (
          <Paper p="md">
            <Text className={classes.successMessage}>{"Successful mint!"}</Text>
            <Text mt={"md"}>
              <b>{"Transaction hash: "}</b>
              {transaction.hash}
            </Text>
            <Text>
              <b>{"Gas price: "}</b>
              {transaction.gasPrice?.toString()}
            </Text>
            <Text>
              <b>{"Nonce: "}</b>
              {transaction.nonce}
            </Text>
          </Paper>
        )}
        {error && <Text color={"red"}>{error}</Text>}
      </Stack>
      {!confirmed && (
        <Text align="center" weight={"bold"}>
          {"Are you sure you want to mint this NFT?"}
        </Text>
      )}
      <Group grow>
        {!confirmed && (
          <Button variant="outline" color="red" onClick={onDismiss}>
            {"No"}
          </Button>
        )}
        {!confirmed && (
          <Button color="green" onClick={() => mint(Number(rowKey))}>
            {"Yes"}
          </Button>
        )}
        {transaction && (
          <Button variant="outline" onClick={onDismiss}>
            {"Done"}
          </Button>
        )}
      </Group>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: 280,
    justifyContent: "space-between",
  },
  successMessage: {
    color: theme.colors.green[5],
    textAlign: "center",
    fontWeight: "bold",
  },
}));

export interface MintProps {
  nft: AvailableNFT;
  onDismiss: () => void;
}

export default Mint;
