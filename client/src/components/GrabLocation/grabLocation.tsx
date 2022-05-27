import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Stack, Text, TextInput, createStyles, Button, Table } from "@mantine/core";
import { useGeolocation } from "@hooks/useGeolocation";
import { setPosition } from "@redux/data/actions";

const GrabLocation = () => {
  const { classes } = useStyles();
  const [enableGeolocation, setEnableGeolocation] = useState(
    true
    // false
  );
  const dispatch = useDispatch();

  const handlePositionChange = useCallback((position: GeolocationPosition) => {
    dispatch(setPosition(position));
  }, []);

  const { position, error } = useGeolocation({
    enabled: enableGeolocation,
    onChange: handlePositionChange,
  });

  const handleShowLocation = useCallback(() => {
    setEnableGeolocation(true);
  }, []);

  const inputValue = position ? `${position.coords.latitude}, ${position.coords.longitude}` : "";

  return (
    <Stack className={classes.root}>
      {!position && (
        <Button onClick={handleShowLocation} size="lg" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
          {"Show my location!"}
        </Button>
      )}
      <TextInput
        label={"Your location:"}
        className={classes.textInput}
        placeholder="Waiting for your location info..."
        disabled
        size="xl"
        value={inputValue}
        error={error}
      ></TextInput>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.lg,
    rowGap: theme.spacing.md,
  },
  textInput: {
    minWidth: "20rem",
  },
}));

export default GrabLocation;
