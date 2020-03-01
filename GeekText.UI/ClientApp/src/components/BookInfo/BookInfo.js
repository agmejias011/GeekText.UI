import React from "react";
import { Typography, Box, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookRating from "../Rating";

const useStyles = makeStyles(theme => ({
  infoContainer: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(0.5, 0, 0.5, 0)
    }
  },
  title: { marginLeft: theme.spacing(1), float: "left" },
  by: {
    float: "left",
    marginLeft: theme.spacing(1),
    color: "grey"
  },
  author: {},
  rating: {},
  divider: {
    margin: theme.spacing(0,1,0,1)
  }
}));
const Nbsp = () => <span style={{ float: "left" }}>{"\u00A0"}</span>;
function BookInfo(props) {
  const { productInfo } = props;
  const classes = useStyles();
  return (
    <>
      <Grid
        className={classes.infoContainer}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item auto xs={12}>
          <Typography className={classes.title} variant={"h2"}>
            {productInfo.title}
          </Typography>
        </Grid>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <Grid item xs={3}>
          <BookRating score={productInfo.rating}></BookRating>
          <Typography
            component={"div"}
            className={classes.by}
            variant={"subtitle2"}
          >
            by
          </Typography>
          <Nbsp />
          <Typography className={classes.author} variant={"body1"}>
            {productInfo.author}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default BookInfo;
