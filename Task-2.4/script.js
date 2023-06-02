const range_slider = document.getElementById("myRange");
const output = document.getElementById("income_dynamic");
output.innerHTML = myRange.value;
myRange.oninput = function () {
  output.innerHTML = this.value;
};

const buttonSubmit = document.getElementById("create");
const fname = document.getElementById("fname");
const email = document.getElementById("email_label");
const password = document.getElementById("password");
const confirmPasswordError = document.getElementById("confirm_password");
const requiredFields = [fname, email, password, confirmPasswordError];

const showErrorMessage = (field, message) => {
  const errorYouSee = field.parentElement.querySelector(".error");
  errorYouSee.innerText = message;
  errorYouSee.className = "error invalid";
};

const hideErrorMessage = (field) => {
  const errorYouSee = field.parentElement.querySelector(".error");
  errorYouSee.innerText = "";
  errorYouSee.classList.remove("invalid");
};

const hideErrors = () => {
  requiredFields.map((field) => {
    if (field.validity.valid) {
      hideErrorMessage(field);
    }
  });
};

const showFnameError = () => {
  if (fname.validity.valueMissing) {
    return showErrorMessage(fname, "Enter first name");
  }
  if (fname.validity.tooShort) {
    return showErrorMessage(fname, "Enter minimum 3 letter");
  }
  if (fname.validity.patternMismatch) {
    return showErrorMessage(fname, "Enter a letter");
  }
};

const showMailError = () => {
  if (email.validity.valueMissing) {
    return showErrorMessage(email, "Enter e-mail");
  }
  if (email.validity.typeMismatch) {
    return showErrorMessage(email, "Enter valid e-mail");
  }
};

const showPasswordError = () => {
  if (password.validity.valueMissing) {
    return showErrorMessage(password, "Enter password");
  }
  if (password.validity.tooShort) {
    return showErrorMessage(password, "Enter minimum 6 characters");
  }
  if (password.value == 0 || password.value == null) {
    return showErrorMessage(password, "Empty field");
  }
};

const showConfirmPasswordError = () => {
  if (confirmPasswordError.validity.valueMissing) {
    return showErrorMessage(confirmPasswordError, "Need confirm password");
  }
  if (confirmPasswordError.validity.tooShort) {
    return showErrorMessage(confirmPasswordError, "Enter minimum 6 characters");
  }
  if (password.value !== confirmPasswordError.value) {
    return showErrorMessage(confirmPasswordError, "Password not match");
  }
  if (confirmPasswordError.value == 0 || confirmPasswordError.value == null) {
    return showErrorMessage(confirmPasswordError, "Empty field");
  }
};

const showError = () => {
  if (!fname.validity.valid) {
    showFnameError();
  }
  if (!email.validity.valid) {
    showMailError();
  }
  if (!password.validity.valid) {
    showPasswordError();
  }
  if (!confirmPasswordError.validity.valid) {
    showConfirmPasswordError();
  }
};

const validateFields = () => {
  const isFormValid = requiredFields.every((field) => field.validity.valid);
  const hasFormInvalidField = Array.from(document.querySelectorAll('.error')).some((error) => error.classList.contains('invalid'));
  if (isFormValid) {
    if (hasFormInvalidField) {
        hideErrors();
        setTimeout(function() {
            alert('success');
        },10)
    } else {
        alert('success');
    }
  } else {
    if (hasFormInvalidField) {
        hideErrors();
    } else {
        showError();
    }
  }
}   

buttonSubmit.addEventListener("click", validateFields);
