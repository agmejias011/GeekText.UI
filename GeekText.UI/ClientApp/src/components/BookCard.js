import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CartBar from "./ShoppingCart/CartBar";

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

let addToCartEvent = (id, title, description, price, img_url, e) => {
  window.$cartTotal = window.$cartTotal + 1;

  const book = window.$item_line.filter(p => p.id === id);

  if (book.length === 0) {
    let booknew = {
      id: id,
      name: title,
      description: description,
      price: price,
      orderQTY: 1,
      itemSubtotal: price,
      img_url: img_url
    };

    window.$item_line = window.$item_line.concat(booknew);
  } else {
    let updateBook = {
      id: book[0].id,
      name: book[0].name,
      description: description,
      price: book[0].price,
      orderQTY: book[0].orderQTY,
      itemSubtotal: book[0].itemSubtotal,
      img_url: book[0].img_url
    };

    const books = [...window.$item_line];
    const index = books.findIndex(item => item.id === updateBook.id);
    books[index] = { ...updateBook };
    books[index].orderQTY++;
    books[index].itemSubtotal = books[index].price * books[index].orderQTY;

    window.$item_line = books;
    window.$cartTotal = window.$cartTotal + 1;
    localStorage.setItem("item_total", JSON.stringify(window.$cartTotal));

    window.updateTopMostParent();
  }
};

// customize the media card from material ui to suit our user cards.
export default function BookCard({ id, title, price, description, img_url }) {
  const classes = useStyles();

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
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ height: "4em" }}
          onClick={e =>
            addToCartEvent(id, title, description, price, img_url, e)
          }
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
