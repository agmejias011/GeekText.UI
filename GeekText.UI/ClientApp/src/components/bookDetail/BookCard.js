import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';
import { BookConsumer } from './Context'

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
export default function BookCard({ id, title, author, publisher, price, rating, description, img_url, gg }) {


    const classes = useStyles();
    return (
        <Card className={classes.card}>

            <CardActionArea  >

                <CardMedia
                    className={classes.media}
                    image={img_url}
                />
                <CardContent>
                    
                    <Typography gutterBottom variant="h5" component="h2">
                        <span style={{ fontWeight: "bold", textAlign: "center" }}>{title}</span>
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h4">
                        <span style={{fontSize: 20 }}>by {author}</span>
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h5">
                        <span style={{ fontSize: 20}}>${price}</span>  
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h2">
                        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                    </Typography>
                   
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h2">

                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}