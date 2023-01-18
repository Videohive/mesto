export class Scetion {
  constructor({items, renderer}, container) {
    this._items = items; // массив объектов для отображения
    this._renderer = renderer;
    this._container = document.querySelector(container); // селектор контейнера для вставки контента
  }

_clear() { // приватный метод, для очистки контейнера перед вставкой контента
  this._container.innerHTML = '';
}

renderItems() {
  this._clear();
  this._items.forEach(item => {
    this._renderer(item);
  })
}

addItem(element) {
  this._container.prepend(element);
  }
}
