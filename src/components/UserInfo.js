import { profileName, profileOccupation} from "../pages/index.js";

class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
  }

  getUserInfo() {
    return {
      name: this._name,
      occupation: this._occupation
    };
  }

  setUserInfo({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
    profileName.textContent = this._name;
    profileOccupation = this._occupation;
  }
}

export default UserInfo;