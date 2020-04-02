import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
export default function BookCard({ title, price, description, img_url }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={img_url}
                />
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
        </Card>
    );
}