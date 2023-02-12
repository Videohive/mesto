import {Popup} from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit()
    })
  }

  handleSubmit(newHandleSubmit) {
    this._handleFormSubmit = newHandleSubmit;
  }

  open() {
    super.open();
  }
}
