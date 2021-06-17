class UserInfo {
  constructor({ name, occupation, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._occupation.textContent = about;
    this._avatar.src =avatar;
  }

  // getUserAvatar() {
  //   return {avatar: this._avatar.src}
  // }

  // setUserAvatar({avatar}) {
  //   this._avatar.src = avatar;
  // }

}

export default UserInfo;