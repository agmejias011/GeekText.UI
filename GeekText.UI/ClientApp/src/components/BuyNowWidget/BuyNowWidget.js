import React from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function BuyNowWidget() {
  const classes = useStyles();
  return (
    <Box>
      <Button className={classes.button} variant={"contained"}>
        Buy Now
      </Button>
      <Button
        className={classes.button}
        variant={"contained"}
        color={"primary"}
      >
        Add to Cart
      </Button>
    </Box>
  );
}

export default BuyNowWidget;
