class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // GET https://around.nomoreparties.co/v1/group-10/cards
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to get initial cards!" + res.statusText))
      .catch(err => console.log(err))
  }

  // https://around.nomoreparties.co/v1/group-10/users/me
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to get user info !" + res.statusText))
      .catch(err => console.log(err))
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
      .then(res => res.ok ? res.json() : Promise.reject("Add card operation failed!" + res.statusText))
      .catch(err => console.log(err))
  }

  // https://around.nomoreparties.co/v1/group-10/cards/cardId
  deleteCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to delete selected card" + res.statusText))
      .catch(err => console.log(err))
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
      .then(res => res.ok ? res.json() : Promise.reject("Failed to update user info!" + res.statusText))
      .catch(err => console.log(err))
  }

  // https://around.nomoreparties.co/v1/group-10/users/me/avatar/
  editAvatar(avatar) {
      return fetch(this._baseUrl + '/users/me/avatar/', {
          headers: this._headers,
          method: "PATCH",
          body: JSON.stringify({
            avatar
          })
      })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to update profile picture!" + res.statusText))
      .catch(err => console.log(err))
  }

  // https://around.nomoreparties.co/v1/group-10/cards/likes/cardId
  addLike(cardID) {
    return fetch(this._baseUrl + "/cards/likes/" + cardID, {
      headers: this._headers,
      method: "PUT",
    })
      .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText))
      .catch(err => console.log(err))
  }

  //https://around.nomoreparties.co/v1/group-10/cards/likes/cardId
  removeLike(cardID) {
    return fetch(this._baseUrl + "/cards/likes/" + cardID, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText))
      .catch(err => console.log(err))
  }


}


export default Api;