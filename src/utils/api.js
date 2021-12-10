class Api {
  /** constructor of API class.
   * @param  baseUrl - the URL to make the request to.
   * @param headers  contain information about the resource to be fetched.
   */
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  /** this function returns the name and the about information from the server. */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function returns the cards from the server. */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves new user info on the server(name, about).
   * @param  name - the new name to be saved.
   * @param about - the new about to be saved.
   */
  saveUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves new card on the server.
   * @param  name - the name of the new card.
   * @param link - link to the card's image.
   */
  saveCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function deletes a card from the server.
   * @param  cardId - the id of the deleted card.
   */
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function add a like to a card.
   * @param  cardId - the id of the liked card.
   */
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves a user's avatar on the server.
   * @param  link - link to the new avatar's image.
   */
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "8c2c5758-c6d8-42fc-a2ad-abb452a760a2",
    "Content-Type": "application/json",
  },
});

export default api;
