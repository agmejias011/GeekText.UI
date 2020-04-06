import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Rating from "@material-ui/lab/Rating";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 120,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function BookCardInCart({ book }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={book.img_url}
          title={book.name}
        />
        <Typography style={{ fontWeight: "bold", textAlign: "center" }}>
          {book.name}
        </Typography>
        <CardContent>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Author:</span> {book.author}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>publisher:</span>{" "}
            {book.publisher}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>genre:</span> {book.genre}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={book.rating}
            precision={0.5}
            readOnly
            className={classes.root}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
