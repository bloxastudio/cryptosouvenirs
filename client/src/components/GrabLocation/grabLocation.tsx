import { useState, useCallback } from "react";
import { Stack, Text, TextInput, createStyles, Button } from "@mantine/core";
import { useGeolocation } from "@hooks/useGeolocation";

const GrabLocation = () => {
  const { classes } = useStyles();
  const [enableGeolocation, setEnableGeolocation] = useState(false);

  const handleShowLocation = useCallback(() => {
    setEnableGeolocation(true);
  }, []);

  const { position, error } = useGeolocation({ enabled: enableGeolocation });

  const inputValue = position ? `${position.coords.latitude}, ${position.coords.longitude}` : "";

  return (
    <Stack className={classes.root}>
      {!position ? (
        <Button onClick={handleShowLocation} size="lg" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
          {"Show my location!"}
        </Button>
      ) : (
        <Text size="lg" p="xs">
          {"Your location is:"}
        </Text>
      )}
      <TextInput className={classes.textInput} placeholder="Waiting for your location info..." disabled size="xl" value={inputValue} error={error}></TextInput>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.lg,
    rowGap: theme.spacing.lg,
  },
  textInput: {
    minWidth: "20rem",
  },
}));

export default GrabLocation;
