import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    position: "absolute",
    left: "50%",
    top: "50%",
  }
}));
export default function Loading() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}
