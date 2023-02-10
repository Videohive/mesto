export class Api {
  constructor(key) {
    this._baseUrl = key.baseUrl;
    this._headers = {
      authorization: key.headers.authorization,
      'Content-Type': 'application/json',
    };
  }

  _getResponseData = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  // получение информации о пользователе
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData)
  }

  // получение стартовых карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData)
  }
}
