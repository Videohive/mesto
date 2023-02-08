import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupLinkImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    super.open(link, name);
    this._popupImageCaption.alt = name;
    this._popupImageCaption.textContent = name;
    this._popupLinkImage.src = link;
  }
}
