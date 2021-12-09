import React, { useContext } from "react";
import Card from "../components/Card.js";
import editProfile from "../images/editProfile.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img src={currentUser.avatar} alt="profile avatar" className="profile__avatar" />
          <div className="profile__avatar-overlay" onClick={onEditAvatarClick}>
            <img src={editProfile} alt="profile avatar" className="profile__avatar-edit" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button aria-label="edit" type="button" className="profile__edit" onClick={onEditProfileClick}></button>
          </div>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button aria-label="add" type="button" className="profile__add" onClick={onAddPlaceClick}></button>
      </section>

      <section className="places">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Main;
