class UserInfo {
  constructor({ name, occupation, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({name, occupation, avatarSrc}) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
    this._avatar.src = avatarSrc;
  }

}

export default UserInfo;