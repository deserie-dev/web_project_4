class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
  }

  // GET https://around.nomoreparties.co/v1/group-10/cards
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/users/me
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/cards
  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/cards/cardId
  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/users/me
  editProfile({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/users/me/avatar/
  editAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkResponse)
  }

  // https://around.nomoreparties.co/v1/group-10/cards/likes/cardId
  addLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "PUT",
    })
      .then(this._checkResponse)
  }

  //https://around.nomoreparties.co/v1/group-10/cards/likes/cardId
  removeLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(this._checkResponse)
  }


}


export default Api;