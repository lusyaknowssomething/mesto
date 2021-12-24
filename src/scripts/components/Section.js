export default class Section {
  constructor( { items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  //добавлем карточки из массива на страничку
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  };

  //функция добавления готовой разметки
  addItem(element) {
    this._container.prepend(element);
  };
}
