export class UserInfo {
  constructor(selectors) {
    const { selectorProfileName, selectorProfileAbout, selectorProfileAvatar } = selectors;
    this._profileName = document.querySelector(selectorProfileName);
    this._profileAbout = document.querySelector(selectorProfileAbout);
    this._profileAvatar = document.querySelector(selectorProfileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
  }

  setUserInfo(name, about) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

  setAvatar(link) {
    this._profileAvatar.src = link;
  }
}
