import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, TextField, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { getTextAvatar, getDate } from "../../tools/utils";
import Rating from "../Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#666666",
  },
  signature: {
    marginRight: "8px",
  },
}));

const getReview = (user, book) => {
  const purchase = user.purchases.find((purchase) => {
    console.log("getReview", purchase);
    return purchase.bookId === book.id;
  });
  return purchase && purchase.review;
};

export default function CommentAndRatingCard(props) {
  const { review, onCardLike } = props;
  const classes = useStyles();
  console.log("CommentAndRatingCard -=- review ", review);
  const { user, book, reviewDate, signature, comment, rating } = review || {};

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {signature && getTextAvatar(signature)}
          </Avatar>
        }
        action={<Rating score={rating} readOnly></Rating>}
        title={<Typography variant="subtitle1">{signature}</Typography>}
        subheader={reviewDate}
      />
      <CardContent>
        <Typography variant="subtitle2">{comment}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onCardLike} aria-label="add to favorites">
          <ThumbUpAltIcon color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
