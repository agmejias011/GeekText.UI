import React from "react";
import { Rating as RatingMUI } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  container: { width: "auto" /* marginLeft: theme.spacing(1)  */ }
}));

function Rating(props) {
  const { score } = props;
  const classes = useStyles();
  return (
    // <Box component="fieldset" mb={3} borderColor="transparent">
    <Box className={classes.container}>
      <RatingMUI name="read-only" value={score} readOnly />
    </Box>
  );
}

export default Rating;
