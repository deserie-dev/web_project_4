class UserInfo {
  constructor({ name, occupation}) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    // this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
      // avatar: this._avatar.src
    }
  }

  setUserInfo({name, occupation}) {
    this._name.textContent = name;
    this._occupation.textContent = occupation
    // this._avatar.src = avatar;
  }

}

export default UserInfo;