import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePlacePopup from "./DeletePlacePopup.js";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api.js";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [confirmedCardToDelete, setConfirmedCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [infoToolTipSuccess, setInfoToolTipSuccess] = useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`There was a problem getting data from the server ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`There was a problem getting data from the server ${err}`);
      });
  }, []);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setDeletePlacePopupOpen(true);
    setConfirmedCardToDelete(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  };

  const handleUpdateUser = (userInfo) => {
    setIsSending(true);
    api
      .saveUserInfo(userInfo.name, userInfo.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`There was a problem saving data on the server ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsSending(true);
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`There was a problem saving the avatar on the server ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    setIsSending(true);
    api
      .saveCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`There was a problem adding new place to the server ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleCardLike = (card) => {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`There was a problem liking this place ${err}`);
      });
  };

  const handleConfirmDeleteCard = () => {
    setIsSending(true);
    api
      .deleteCard(confirmedCardToDelete._id)
      .then(() => {
        setCards(cards.filter((c) => confirmedCardToDelete._id !== c._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`There was a problem deleting this place ${err}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        setInfoToolTipMessage("Success! You have now been registered.");
        setInfoToolTipSuccess(true);
        history.push("/signin");
      })
      .catch((err) => {
        if (err === 400) {
          console.log("400 - one of the fields was filled in incorrectly");
        }
        setInfoToolTipMessage("Oops, something went wrong! Please try again.");
        setInfoToolTipSuccess(false);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        history.push("/");
      })
      .catch((err) => {
        if (err === 400) {
          console.log("400 - one or more of the fields were not provided");
        } else if (err === 401) {
          console.log("401 - the user with the specified email not found ");
        }
        setIsInfoToolTipOpen(true);
        setInfoToolTipSuccess(false);
        setInfoToolTipMessage("Oops, something went wrong! Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    history.push("/signin");
  };

  const checkIfLoggedIn = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          if (err === 400) {
            console.log("400 — Token not provided or provided in the wrong format");
          } else if (err === 401) {
            console.log("401 — The provided token is invalid ");
          }
        });
    } else {
      history.push("/signin");
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          message={infoToolTipMessage}
          success={infoToolTipSuccess}
          onClose={closeAllPopups}
        />
        <Switch>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <EditProfilePopup
              isSending={isSending}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isSending={isSending}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isSending={isSending}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
            <DeletePlacePopup
              isSending={isSending}
              isOpen={isDeletePlacePopupOpen}
              onClose={closeAllPopups}
              onDeletePlace={handleConfirmDeleteCard}
            />
            <Footer />
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
