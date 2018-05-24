import React from "react";
import { Link } from "react-router-dom";

const LivreItem = props => {
  //ITEM iterés

  return (
    <Link to={`/livres/${props._id}`} className="book_item">
      <div className="book_header">
        <h2>{props.name}</h2>
      </div>
      <div className="book_items">
        <div className="book_author">{props.author}</div>
        <div className="book_bubble">
          <strong>PRIX</strong> $ {props.price}
        </div>
        <div className="book_bubble">
          <strong>PAGES: </strong> {props.pages}
        </div>
        <div className="book_bubble rating">
          <strong>RATING</strong> {props.rating}
        </div>
      </div>
    </Link>
  );
};


export default LivreItem;
