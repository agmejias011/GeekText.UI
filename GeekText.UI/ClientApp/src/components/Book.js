import React from "react";

export const Book = props => {
  const { title, author, img, price, rating } = props;
  return (
    <div className="book">
      {img ? (
        <img src={`${img}`} alt={`${title} book cover`} className="bookCover" />
      ) : (
        <div className="empty-book">Coming Soon</div>
      )}
      <h4>{title}</h4>
      <p>By: {author}</p>
      <p>${price}</p>
      <p>Rating: {rating}/5</p>
    </div>
  );
};
