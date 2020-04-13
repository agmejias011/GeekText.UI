import React from "react";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

export default function Comments({ id, img, name, email, body, rating}){
    const classes = useStyles();
    return (
        <List className={classes.root}>
                
                    <React.Fragment>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                        <Avatar alt="avatar" src={img} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography className={classes.fonts}>
                                        {name}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {email}
                                        </Typography>
                                        {` - ${body}`}
                                        <Typography>
                                            {<Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />}
                                        </Typography>
                                    </>
                                }
                                     
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
        </List>
    );
}