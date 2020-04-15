import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const tileData = [
  {
    img: "/static/images/grid-list/breakfast.jpg",
    title: "Breakfast",
    author: "jill111",
    cols: 2,
    featured: true,
  },
  {
    img: "/static/images/grid-list/burgers.jpg",
    title: "Tasty burger",
    author: "director90",
  },
  {
    img: "/static/images/grid-list/camera.jpg",
    title: "Camera",
    author: "Danson67",
  },
  {
    img: "/static/images/grid-list/morning.jpg",
    title: "Morning",
    author: "fancycrave1",
    featured: true,
  },
  {
    img: "/static/images/grid-list/hats.jpg",
    title: "Hats",
    author: "Hans",
  },
  {
    img: "/static/images/grid-list/honey.jpg",
    title: "Honey",
    author: "fancycravel",
  },
  {
    img: "/static/images/grid-list/vegetables.jpg",
    title: "Vegetables",
    author: "jill111",
    cols: 2,
  },
  {
    img: "/static/images/grid-list/plant.jpg",
    title: "Water plant",
    author: "BkrmadtyaKarki",
  },
  {
    img: "/static/images/grid-list/mushroom.jpg",
    title: "Mushrooms",
    author: "PublicDomainPictures",
  },
  {
    img: "/static/images/grid-list/olive.jpg",
    title: "Olive oil",
    author: "congerdesign",
  },
  {
    img: "/static/images/grid-list/star.jpg",
    title: "Sea star",
    cols: 2,
    author: "821292",
  },
  {
    img: "/static/images/grid-list/bike.jpg",
    title: "Bike",
    author: "danfador",
  },
];
export default function BookGrid(props) {
  const classes = useStyles();
  const { books, selectedBook, onBookSelection } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
          <ListSubheader component="div">BOOK LIST</ListSubheader>
        </GridListTile>
        {books.map((book) => (
          <GridListTile key={book.img}>
            <img src={book.imgUrl} alt={book.title} />
            <GridListTileBar
              title={book.title}
              subtitle={<span>by: {book.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${book.title}`}
                  className={classes.icon}
                  onClick={() => onBookSelection(book.id)}
                >
                  {book.id === selectedBook.id ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
