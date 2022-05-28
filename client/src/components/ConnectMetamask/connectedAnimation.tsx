import React, { useState, useEffect } from "react";
import { Stack, createStyles } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import classnames from "classnames";

const ANIMATION_LENGTH = 4250;
const ANIMATION_START = 500;

const ConnectedAnimation = () => {
  const [ok, setOk] = useState(true);
  const { classes } = useStyles();
  const interval = useInterval(() => setOk(false), ANIMATION_START + 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  if (!ok) {
    return null;
  }

  return (
    <Stack className={classes.root}>
      <div className={ok ? classnames(classes.successCheckmark, classes.checkmark) : classes.checkmark}>
        <div className={classes.checkIcon}>
          <span className={classnames(classes.iconLine, classes.lineTip)}></span>
          <span className={classnames(classes.iconLine, classes.lineLong)}></span>
          <div className={classes.iconCircle}></div>
          <div className={classes.iconFix}></div>
        </div>
      </div>
      <div className={ok ? classes.text : classnames(classes.text, classes.textHidden)}>{`Connected.`}</div>
    </Stack>
  );
};

const useStyles = createStyles((theme, _params, getRef) => ({
  root: {
    textAlign: "center",
    gap: theme.spacing.xs,
  },
  text: {
    color: theme.colors.green[5],
    fontWeight: 600,
    transition: `opacity 0.2s`,
  },
  textHidden: {
    opacity: 0,
  },
  checkmark: {
    width: 80,
    height: 100,
    margin: "0 auto",
  },
  successCheckmark: {
    [`& .${getRef("checkIcon")}`]: {
      width: 80,
      height: 80,
      position: "relative",
      borderRadius: "50%",
      boxSizing: "content-box",
      border: `4px solid ${theme.colors.green[5]}`,
      "&::before": {
        top: 3,
        left: -2,
        width: 30,
        transformOrigin: "100% 50%",
        borderRadius: "100px 0 0 100px",
      },
      "&::after": {
        top: 0,
        left: 30,
        width: 60,
        transformOrigin: "0 50%",
        borderRadius: "0 100px 100px 0",
        animation: `rotateCircle ${ANIMATION_LENGTH}ms ease-in`,
      },
      "&::before, &::after": {
        content: "''",
        height: 100,
        position: "absolute",
        background: theme.colors.dark[7],
        transform: "rotate(-45deg)",
      },
      [`& .${getRef("iconLine")}`]: {
        height: 5,
        backgroundColor: theme.colors.green[5],
        display: "block",
        borderRadius: 2,
        position: "absolute",
        zIndex: 10,
        [`&.${getRef("lineTip")}`]: {
          top: 46,
          left: 14,
          width: 25,
          transform: "rotate(45deg)",
          animation: "iconLineTip 0.75s",
        },
        [`&.${getRef("lineLong")}`]: {
          top: 38,
          right: 8,
          width: 47,
          transform: "rotate(-45deg)",
          animation: "iconLineLong 0.75s",
        },
      },
      [`& .${getRef("iconCircle")}`]: {
        top: -4,
        left: -4,
        zIndex: 10,
        width: 80,
        height: 80,
        borderRadius: "50%",
        position: "absolute",
        boxSizing: "content-box",
        border: "4px solid rgba(76, 175, 80, 0.5)",
      },
      [`& .${getRef("iconFix")}`]: {
        top: 8,
        width: 5,
        left: 26,
        zIndex: 1,
        height: 85,
        position: "absolute",
        transform: "rotate(-45deg)",
        backgroundColor: theme.colors.dark[7],
      },
    },
    "@keyframes rotateCircle": {
      "0%": {
        transform: "rotate(-45deg)",
      },
      "5%": {
        transform: "rotate(-45deg)",
      },
      "12%": {
        transform: "rotate(-405deg)",
      },
      "100%": {
        transform: "rotate(-405deg)",
      },
    },
    "@keyframes iconLineTip": {
      "0%": {
        width: 0,
        left: 1,
        top: 19,
      },
      "54%": {
        width: 0,
        left: 1,
        top: 19,
      },
      "70%": {
        width: 50,
        left: -8,
        top: 37,
      },
      "84%": {
        width: 17,
        left: 21,
        top: 48,
      },
      "100%": {
        width: 25,
        left: 14,
        top: 45,
      },
    },
    "@keyframes iconLineLong": {
      "0%": {
        width: 0,
        right: 46,
        top: 54,
      },
      "65%": {
        width: 0,
        right: 46,
        top: 54,
      },
      "84%": {
        width: 55,
        right: 0,
        top: 35,
      },
      "100%": {
        width: 47,
        right: 8,
        top: 38,
      },
    },
  },
  checkIcon: {
    ref: getRef("checkIcon"),
  },
  iconLine: {
    ref: getRef("iconLine"),
  },
  lineTip: {
    ref: getRef("lineTip"),
  },
  lineLong: {
    ref: getRef("lineLong"),
  },
  iconCircle: {
    ref: getRef("iconCircle"),
  },
  iconFix: {
    ref: getRef("iconFix"),
  },
}));

export default ConnectedAnimation;
