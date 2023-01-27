/*
Класс добавления элементов в разметку
Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
Содержит публичный метод renderItems, который отвечает за отрисовку всех элементов.
Отрисовка каждого отдельного элемента осуществляется функцией renderer.
Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/
export default class Section {
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
    mode === "append"
      ? this._container.append(item)
      : this._container.prepend(item);
  }
}
