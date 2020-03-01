import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, Box } from "@material-ui/core";
import BookCover from "../BookCover";
import BookInfo from "../BookInfo";
import BuyNowWidget from "../BuyNowWidget/BuyNowWidget";
import CommentCard from "../CommentCard";
import TopBar from "../TopBar";
import {productInfoMock as productInfo} from '../tools/mockdata'

const useStyles = makeStyles(theme => ({
  info: {
    width: "50%"
  },
  commentsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(300px,2fr))"
  },
  cover: {
    float: "left"
  }
}));

function BookDetailsPage(props) {
  // const { productInfo } = props;
  const classes = useStyles();
  return (
    <>
      <BookCover className={classes.cover} productInfo={productInfo} />
      <BookInfo className={classes.info} productInfo={productInfo} />
      <BuyNowWidget />
      <Box className={classes.commentsContainer}>
        {productInfo.comments.map((x, key) => {
          return (
            <CommentCard
              key={key}
              author={x.name}
              comment={x.text}
              profilePicture={x.profilePicture}
            />
          );
        })}
      </Box>
    </>
  );
}

export default BookDetailsPage;
