import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Link from "@material-ui/core/Link";

// import material ui smaller components to create card component

// makeStyles for material ui
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
});

// customize the media card from material ui to suit our user cards.
export default function BookCardDetail({
  title,
  author,
  publisher,
  price,
  rating,
  description,
  img_url,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card} style={{ width: 250 }}>
      <CardActionArea href={img_url} size="large" color="primary">
        <CardMedia className={classes.media} image={img_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            by {publisher}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {author}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            $ {price}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
}
