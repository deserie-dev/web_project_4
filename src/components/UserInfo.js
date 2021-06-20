class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  getAvatarInfo() {
    return {
      avatar: this._avatar.src
    }
  }

  setAvatarInfo ({ avatar }) {
    this._avatar.src = avatar;
  }


}

export default UserInfo;