class UserInfo {
  constructor() {
    this._nameElement = document.querySelector(".profile__name");
    this._aboutElement = document.querySelector(".profile__occupation");
    // this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
     name: this._name,
     about: this._about,
     _id: this._id,
      // avatar: this._avatar.src
    }
  }

  getUserData() {
    return this._data;
  }

  setUserElements(name, about) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserInfo({ name, about, _id, }) {
    this._name = name;
    this._about = about;
    this._id = _id;
  }

}

export default UserInfo;