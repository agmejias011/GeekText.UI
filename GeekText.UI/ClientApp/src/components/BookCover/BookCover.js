import React from "react";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BookInfo from "../BookInfo";

const useStyles = makeStyles(theme => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: theme.spacing(30),
  //     height: theme.spacing(40)
  //   }
  // },
  cover: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "yellow"
  }
}));

function BookCover(props) {
  const { productInfo } = props;
  const classes = useStyles();

  const aspectRatio = 0.75;
  return (
    <div className={classes.root}>
      <Paper className={classes.cover} elevation={3}>
        <Image src={productInfo.coverURL} aspectRatio={aspectRatio}></Image>
      </Paper>
    </div>
  );
}

export default BookCover;
