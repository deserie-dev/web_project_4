import { profileName, profileOccupation} from "./index.js";

class UserInfo {
  constructor({data}) {
    this._name = data.name;
    this._occupation = data.occupation;
  }

  getUserInfo() {
    return data;
  }

  setUserInfo() {
    profileName.textContent = this._name;
    profileOccupation = this._occupation;
  }
}

export default UserInfo;