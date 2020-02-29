import React from "react";

export const Book = props => {
  const { title, author, img, price } = props;
  return (
    <div>
      <img src={`${img}`} alt={`${title} book cover`} className="bookCover" />
      <h3>{title}</h3>
      <p>By: {author}</p>
      <p>{price}</p>
    </div>
  );
};
