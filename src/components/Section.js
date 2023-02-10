export class Section {
  constructor({renderer}, container) {
    this._renderer = renderer; // колбэк функция обработки элемента массива
    this._container = document.querySelector(container); // селектор контейнера для вставки контента
  }

_clear() { // приватный метод, для очистки контейнера перед вставкой контента
  this._container.innerHTML = '';
}

renderItems = (items) => {
  this._clear(); // оцищение контента
  items.forEach(item => { // использование колбэк для каждого элемента массива
    this._renderer(item)
  })
}

addItem(element) {
  this._container.prepend(element);
  }
}
