import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const API_URL = process.env.REACT_APP_API_URL;

// import material ui smaller components to create card component

// makeStyles for material ui
const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 500
  }
});

// customize the media card from material ui to suit our user cards.
export default function BookCard({ id, user_id, title, price, description, img_url }) {
  const classes = useStyles();

  let wishlist_button = null;

  if (user_id !== false) {
    wishlist_button = (
      <Button onClick={addToWishlist.bind(undefined, id, user_id)}>
        <FavoriteIcon htmlColor="#ec407a" fontSize="large" />
      </Button>
    );
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={img_url} size="small" color="primary">
          Enlarge Image
        </Button>
        {wishlist_button}
      </CardActions>
    </Card>
  );

  async function addToWishlist(id, user_id) {
    let data = {
      book_id     : id,
      wishlist_id : user_id
    };
    let res  = await fetch(
      `${API_URL}/WishlistBooks/`,
      {
        method  : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }
    );

    try {
      res = await res.json();
      
      if (res.error) {
        alert(res.message);
      }
    } catch {}
  }
}
