/*
Класс FormValidator, настраивает валидацию полей формы:
  принимает в конструктор объект настроек с селекторами и классами формы;
  принимает вторым параметром элемент той формы, которая валидируется;
  имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
    изменяют состояние кнопки сабмита, устанавливают все обработчики;
  имеет публичный метод enableValidation, который включает валидацию формы.
*/

// класс валидации всех полей формы
export default class FormValidator {
  constructor(formSelectors, formElement) {
    // сама форма
    this._formElement = formElement;

    // селекторы
    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formSelectors.submitButtonSelector;
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._errorClass = formSelectors.errorClass;

    // инпуты и кнопка
    this._formInputs = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _setEveentListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkFormValid(input);
        this._toggleStyleSubmitBtn();
      });
    });
  }

  clearErrors() {
    // функция очистки ошибок валидации в случае, если попап был закрыт без сохранения
    const inputs = this._formElement.querySelectorAll(
      `.${this._inputErrorClass}`
    );
    const errors = this._formElement.querySelectorAll(`.${this._errorClass}`);

    inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });

    errors.forEach((error) => {
      error.textContent = "";
    });

    this._disableSubmitBtn();
  }

  _showInputErrors(input, error) {
    // функция показа стиля ошибок валидации
    error.textContent = input.validationMessage; // добавить подпись ошибки ввода в инпут
    input.classList.add(this._inputErrorClass); // добавить стиль ошибки для инпута
  }

  _hideInputErrors(input, error) {
    // функция скрытия стиля ошибок валидации
    error.textContent = "";
    input.classList.remove(this._inputErrorClass); // убрать стиль ошибки для инпута
  }

  _checkFormValid(input) {
    //функция проверки валидности инпутов и установка соответствующих стилей
    const error = this._formElement.querySelector(`#${input.id}-error`); //  поиск спан-элемента ошибки для текущего инпута
    // демонстрация ошибки
    if (input.validity.valid) {
      this._hideInputErrors(input, error);
    } else {
      this._showInputErrors(input, error);
    }
  }

  _enableSubmitBtn() {
    // функция для активации кнопки отправки
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  _disableSubmitBtn() {
    // функция деактивации кнопки отправки
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = "disabled";
  }

  _toggleStyleSubmitBtn() {
    // функция включения/отключения работоспособности кнопки отправки на форме
    const formValid = this._formInputs.every((input) => {
      return input.validity.valid;
    });
    if (formValid) {
      this._enableSubmitBtn();
    } else {
      this._disableSubmitBtn();
    }
  }

  enableValidation() {
    this._setEveentListeners();
  }
}
