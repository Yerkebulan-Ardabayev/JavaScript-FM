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

class Validate {
    constructor(fname, email, password, confirmPasswordError) {
        this.fname = fname
        this.email = email
        this.password = password
        this.confirmPasswordError = confirmPasswordError
    }
    showErrorMessage = (field, message) => {
        const errorYouSee = field.parentElement.querySelector(".error");
        errorYouSee.innerText = message;
        errorYouSee.className = "error invalid";
    };

    hideErrorMessage = (field) => {
        const errorYouSee = field.parentElement.querySelector(".error");
        errorYouSee.innerText = "";
        errorYouSee.classList.remove("invalid");
    };
    hideErrors = () => {
        requiredFields.map((field) => {
            if (field.validity.valid) {
                this.hideErrorMessage(field);
            }
        });
    };
    showFnameError = () => {
        if (fname.validity.valueMissing) {
            return this.showErrorMessage(fname, "Enter first name");
        }
        if (fname.validity.tooShort) {
            return this.showErrorMessage(fname, "Enter minimum 3 letter");
        }
        if (fname.validity.patternMismatch) {
            return this.showErrorMessage(fname, "Enter a letter");
        }
    };
    showMailError = () => {
        if (email.validity.valueMissing) {
            return this.showErrorMessage(email, "Enter e-mail");
        }
        if (email.validity.typeMismatch) {
            return this.showErrorMessage(email, "Enter valid e-mail");
        }
    };
    showPasswordError = () => {
        if (password.validity.valueMissing) {
            return this.showErrorMessage(password, "Enter password");
        }
        if (password.validity.tooShort) {
            return this.showErrorMessage(password, "Enter minimum 6 characters");
        }
        if (password.value == 0 || password.value == null) {
            return this.showErrorMessage(password, "Empty field");
        }
    };
    showConfirmPasswordError = () => {
        if (confirmPasswordError.validity.valueMissing) {
            return this.showErrorMessage(confirmPasswordError, "Need confirm password");
        }
        if (confirmPasswordError.validity.tooShort) {
            return this.showErrorMessage(
                confirmPasswordError,
                "Enter minimum 6 characters"
            );
        }
        if (password.value !== confirmPasswordError.value) {
            return this.showErrorMessage(confirmPasswordError, "Password not match");
        }
        if (confirmPasswordError.value == 0 || confirmPasswordError.value == null) {
            return this.showErrorMessage(confirmPasswordError, "Empty field");
        }
    };
    showError = () => {
        if (!fname.validity.valid) {
            this.showFnameError();
        }
        if (!email.validity.valid) {
            this.showMailError();
        }
        if (!password.validity.valid) {
            this.showPasswordError();
        }
        if (!confirmPasswordError.validity.valid) {
            this.showConfirmPasswordError();
        }
    };
    validateFields = () => {
        const isFormValid = requiredFields.every((field) => field.validity.valid);
        const hasFormInvalidField = Array.from(
            document.querySelectorAll(".error")
        ).some((error) => error.classList.contains("invalid"));
        if (isFormValid) {
            if (hasFormInvalidField) {
                this.hideErrors();
                setTimeout(function () {
                    alert("success");
                }, 10);
            } else {
                alert("success");
            }
        } else {
            if (hasFormInvalidField) {
                this.hideErrors();
            } else {
                this.showError();
            }
        }
    };
};

const ValidateForm = new Validate(fname, email, password, confirmPasswordError);

buttonSubmit.addEventListener("click", ValidateForm.validateFields);
