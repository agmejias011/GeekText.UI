import React from "react";
import { Rating as MaterialRating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  container: { width: "auto" /* marginLeft: theme.spacing(1)  */ },
}));

function Rating(props) {
  const { score, readOnly, onChange } = props;
  const classes = useStyles();
  return (
    // <Box component="fieldset" mb={3} borderColor="transparent">
    <Box className={classes.container}>
      <MaterialRating
        name="book-rating"
        onChange={onChange}
        value={score}
        readOnly={readOnly}
      />
    </Box>
  );
}

export default Rating;
