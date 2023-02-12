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

  //обновление информации о пользователе
  patchUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData)
  }

  // получение стартовых карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData)
  }

  // добавление новой карточки
  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData)
  }

  // установка лайка
  setLike = (id, value) => {
    value = value ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${value}`,
      headers: this._headers,
    }).then(this._getResponseData)
  }

// удаление карточки
  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  // замена аватара
  changeAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData)
  }
}
