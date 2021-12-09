import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const hide = { display: `${!isOwn ? "none" : ""}` };

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="place">
      <button className="place__delete" style={hide} onClick={handleDeleteClick}></button>
      <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-wrap">
          <button
            aria-label="like"
            type="button"
            className={`place__like place__like_theme_${isLiked ? "like" : "unlike"}`}
            onClick={handleLikeClick}
          ></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
export default Card;
