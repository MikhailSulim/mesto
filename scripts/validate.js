const formConfig = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } =
    config;
  const forms = [...document.querySelectorAll(formSelector)]; // приведение списка всех найденных форм в попапах к массиву

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)]; // приведение списка всех найденных инпутов в попапах к массиву
    const button = form.querySelector(submitButtonSelector); // поиск кнопки сохранить на форме

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkFormValid(input, restConfig);
        toggleStyleSubmitBtn(inputs, button, restConfig);
      });
    });
  });
};

function clearError(popup) {
  // функция очистки ошибок валидации в случае, если попап был закрыт без сохранения
  const inputs = [...popup.querySelectorAll(`.${formConfig.inputErrorClass}`)];
  const errors = [...popup.querySelectorAll(`.${formConfig.errorClass}`)];
  inputs.forEach((input) => {
    input.classList.remove(formConfig.inputErrorClass);
  });

  errors.forEach((error) => {
    error.textContent = "";
  });
}

function checkFormValid(input, config) {
  //функция проверки валидности инпутов и установка соответствующих стилей
  const error = document.querySelector(`#${input.id}-error`); //  поиск спан-элемента ошибки для текущего инпута
  // демонстрация ошибки
  if (input.validity.valid) {
    error.textContent = "";
    input.classList.remove(config.inputErrorClass); // убрать стиль ошибки для инпута
  } else {
    error.textContent = input.validationMessage; // добавить подпись ошибки ввода в инпут
    input.classList.add(config.inputErrorClass); // добавить стиль ошибки для инпута
  }
}

function toggleStyleSubmitBtn(inputs, button, config) {
  // функция включения/отключения работоспособности кнопки отправки на форме
  const formValid = inputs.every((input) => {
    return input.validity.valid;
  });
  if (formValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = "";
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
}

enableValidation(formConfig);
