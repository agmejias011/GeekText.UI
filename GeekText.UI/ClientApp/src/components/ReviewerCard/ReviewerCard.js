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
import { getTextAvatar, getDate } from "../../tools/utils";
import Rating from "../Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function ReviewerCard(props) {
  const { user, book, onSubmit, previouslyReviewed } = props;
  console.log("previouslyReviewed", previouslyReviewed);

  const classes = useStyles();
  const [signature, setSignature] = React.useState(user.fullName);
  const [reviewText, setReviewText] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [reviewDate, _] = React.useState(getDate(new Date().getTime()));
  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };
  const handleReviewCommentChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };
  const handleSubmit = () => {
    const review = {
      comment: reviewText,
      rating: rating,
      signature: signature,
      reviewDate,
    };
    console.log(review);
    onSubmit(user.id, book.id, review);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {getTextAvatar(signature)}
          </Avatar>
        }
        action={<Rating score={rating} onChange={handleRating}></Rating>}
        title={<Typography variant="subtitle1">{signature}</Typography>}
        subheader={reviewDate}
      />
      <CardContent>
        <TextField
          id="standard-multiline-flexible"
          label={
            previouslyReviewed ? "Edit your review" : "Review your purchase"
          }
          multiline
          fullWidth
          rowsMax={4}
          value={reviewText}
          onChange={handleReviewCommentChange}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleSubmit} aria-label="submit review">
          <PublishIcon color="primary" />
        </IconButton>
        <IconButton edge="end" disabled aria-label="signature">
          <FingerprintIcon />
        </IconButton>
        <Select
          className={classes.signature}
          labelId="signature-select-label"
          id="signature-select-id"
          fullWidth
          value={signature}
          onChange={handleSignatureChange}
        >
          <MenuItem value={"Anonymous"}>Anonymously</MenuItem>
          <MenuItem value={user.nickname}>Nickname</MenuItem>
          <MenuItem value={user.fullName}>Full Name</MenuItem>
        </Select>
      </CardActions>
    </Card>
  );
}
