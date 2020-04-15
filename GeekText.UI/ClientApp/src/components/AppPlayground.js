import React, { useState, useEffect } from "react";
import ReviewerCard from "./ReviewerCard";
import CommentAndRatingCard from "./CommentAndRatingCard";
import BookGrid from "./playgroundComponents/BookGrid.js";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles, Typography } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SchoolIcon from "@material-ui/icons/School";

const user1 = {
  id: 1,
  fullName: "Andy Gonzalez",
  nickname: "Mr. Andy",
  address: "11010 SW 64TH ST",
  purchases: [
    {
      bookId: 1,
      dateOfPurchase: "09/20/2020",
      review: {
        comment: "my daughter's favorite book!",
        rating: "5",
        signature: "Andy Gonzalez",
        reviewDate: "09/24/2020",
      },
    },
    {
      bookId: 2,
      dateOfPurchase: "09/21/2020",
      review: {
        comment: "great Book",
        rating: "4",
        signature: "Mr. Andy",
        reviewDate: "09/24/2020",
      },
    },
    {
      bookId: 4,
      dateOfPurchase: "09/25/2020",
      review: {},
    },
  ],
  likedReviews: [{ bookId: 3, userId: 2 }],
};
const user2 = {
  id: 2,
  fullName: "Alex Roque",
  nickname: "Mr. Alex",
  address: "11200 SW 8th St",
  purchases: [
    {
      bookId: 1,
      dateOfPurchase: "09/20/2020",
      review: {
        comment: "awesome Book",
        rating: "5",
        signature: "Mr. Alex",
        reviewDate: "09/24/2020",
      },
    },
    {
      bookId: 3,
      dateOfPurchase: "09/20/2020",
      review: {
        comment: "meh",
        rating: "2",
        signature: "Anonymous",
        reviewDate: "09/24/2020",
      },
    },
    {
      bookId: 4,
      dateOfPurchase: "09/21/2020",
      review: {},
    },
  ],
};

const booksMock = [
  {
    id: 1,
    isbn: "45678tghnui",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupery",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Littleprince.JPG/220px-Littleprince.JPG",
  },
  {
    id: 2,
    isbn: "45678atghnui",
    title: "In Search of Lost Time",
    author: "Marcel Proust",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Elizabeth%2C_Comtesse_Greffulhe_1905_%2C_by_Philip_Alexius_de_Laszlo.jpg/411px-Elizabeth%2C_Comtesse_Greffulhe_1905_%2C_by_Philip_Alexius_de_Laszlo.jpg",
  },
  {
    id: 3,
    isbn: "4567b8tghnui",
    title: "Ulysses",
    author: "James Joyce",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg",
  },
  {
    id: 4,
    isbn: "45678tgvhnui",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/El_ingenioso_hidalgo_don_Quijote_de_la_Mancha.jpg/250px-El_ingenioso_hidalgo_don_Quijote_de_la_Mancha.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  toggleUser: { margin: theme.spacing(2) },
  currentUser: { margin: theme.spacing(2), display: "inline-flex" },
}));

const AppPlayground = (props) => {
  const [selectedUser, setSelectedUser] = useState(user1);
  const [users, setUsers] = useState([user1, user2]);
  const [books, setBooks] = useState(booksMock);
  console.log("users", users);

  const [selectedBook, setSelectedBook] = useState(books[0]);
  const userHasReviewed = (user, book) => {
    const purchase = user.purchases.find(
      (purchase) => purchase.bookId === book.id
    );
    const reviewExists = purchase && purchase.review && purchase.review.comment;
    return reviewExists;
  };

  const [hasReviewed, setHasReviewed] = useState();

  const classes = useStyles();

  useEffect(() => {
    setSelectedBook(books[0]);
    setSelectedUser(user1);
  }, []);

  useEffect(() => {
    setHasReviewed(userHasReviewed(selectedUser, selectedBook));
    console.log(
      "hasReviewAppPlayground",
      userHasReviewed(selectedUser, selectedBook)
    );
  }, [selectedUser.purchases, selectedBook, selectedUser]);

  const handleCardLike = (userId) => {
    alert(`${userId}'s comment has been liked by you`);
  };
  const handleBookSelection = (id) => {
    setSelectedBook(books[id - 1]);
  };
  const handleSubmitReview = (userId, bookId, review) => {
    const newUser = users.find((user) => user.id === userId);
    console.log("new review incoming", review.comment);
    const purchaseIndex = newUser.purchases.findIndex(
      (purchase) => purchase.bookId === bookId
    );
    newUser.purchases[purchaseIndex] = {
      ...newUser.purchases[purchaseIndex],
      review,
    };
    const newUsers = [...users];
    const newUserIndex = newUsers.findIndex((user) => user.id === userId);
    newUsers[newUserIndex] = newUser;
    setUsers([...newUsers]);
  };

  const toggleUser = () => {
    setSelectedUser(selectedUser.id !== 1 ? users[0] : users[1]);
  };

  const userOwnsBook = (user, book) => {
    const bookOwned = user.purchases.find(
      (purchase) => purchase.bookId === book.id
    );
    return !!bookOwned;
  };

  const getReviewsByBook = (users, book) => {
    return users.reduce((reviews, user, index) => {
      const purchase = user.purchases.find(
        (purchase) => purchase.bookId === book.id
      );
      const review = purchase && purchase.review ? purchase.review : {};
      console.log(reviews);
      return !!review.comment
        ? [...reviews, { user: user, book: book, ...review }]
        : reviews;
    }, []);
  };

  console.log("userOwnsBook", userOwnsBook(selectedUser, selectedBook));
  return (
    <>
      <BookGrid
        books={books}
        selectedBook={selectedBook}
        onBookSelection={handleBookSelection}
      ></BookGrid>

      <Typography className={classes.currentUser} variant={"h6"}>
        {`Current Logged User: ${selectedUser.fullName}`}
      </Typography>
      <ToggleButton
        className={classes.toggleUser}
        value="check"
        selected={selectedUser.id === 1}
        onChange={toggleUser}
      >
        {selectedUser.id === 1 ? <AccountBoxIcon /> : <SchoolIcon />}
      </ToggleButton>
      {userOwnsBook(selectedUser, selectedBook) && (
        <ReviewerCard
          user={selectedUser}
          book={selectedBook}
          onSubmit={handleSubmitReview}
          previouslyReviewed={hasReviewed}
        ></ReviewerCard>
      )}
      {getReviewsByBook(users, selectedBook).map((review) => {
        return (
          <CommentAndRatingCard
            review={review}
            onCardLike={handleCardLike}
          ></CommentAndRatingCard>
        );
      })}
    </>
  );
};

export default AppPlayground;
