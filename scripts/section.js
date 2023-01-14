export default class Section {
  // класс добавления элементов в разметку
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element, "append");
    });
  }

  addItem(item, mode) {
    if (mode === "append") {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }
}
