export class FormValidator {
  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._form = form;
  };

  _showError (inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  };

  _hideError (inputElement, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity (inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    if(isInputNotValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    };
  };

  _toggleButtonState (button, isActive) {
    if(isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = 'disabled';
    };
  };

  _setEventListeners () {
    const inputsList = this._form.querySelectorAll(this._config.inputSelector);
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    Array.from(inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this._form.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, isFormValid);
      });
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };
  enableValidation () {
    this._setEventListeners();
  };
};

