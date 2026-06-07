var form = document.getElementById("registrationForm");
var dialogOverlay = document.getElementById("dialogOverlay");
var dialogClose = document.getElementById("dialogClose");

// show error under the field
function showError(inputId, errorId) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);
  input.classList.remove("input-success");
  input.classList.add("input-error");
  error.classList.add("visible");
}

// hide error and mark field as ok
function clearError(inputId, errorId) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);
  input.classList.remove("input-error");
  input.classList.add("input-success");
  error.classList.remove("visible");
}

// full name should not be empty
function validateName() {
  var name = document.getElementById("fullName").value.trim();
  if (name === "") {
    showError("fullName", "nameError");
    return false;
  }
  clearError("fullName", "nameError");
  return true;
}

// email must have @ and a domain like .com
function validateEmail() {
  var email = document.getElementById("email").value.trim();

  // checks format like something@something.something
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showError("email", "emailError");
    return false;
  }
  clearError("email", "emailError");
  return true;
}

// password needs at least 6 characters
function validatePassword() {
  var password = document.getElementById("password").value;
  if (password.length < 6) {
    showError("password", "passwordError");
    return false;
  }
  clearError("password", "passwordError");
  return true;
}

// confirm password must match the password field
function validateConfirmPassword() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  if (confirmPassword !== password || confirmPassword === "") {
    showError("confirmPassword", "confirmPasswordError");
    return false;
  }
  clearError("confirmPassword", "confirmPasswordError");
  return true;
}

// age must be a number and between 18 to 60
function validateAge() {
  var ageValue = document.getElementById("age").value.trim();
  var age = Number(ageValue);

  if (ageValue === "" || isNaN(age) || age < 18 || age > 60) {
    showError("age", "ageError");
    return false;
  }
  clearError("age", "ageError");
  return true;
}

// show the success dialog with the user's name
function showDialog() {
  var name = document.getElementById("fullName").value.trim();
  var firstName = name.split(" ")[0]; // grab just the first name
  document.getElementById("dialogTitle").textContent = "Hello " + firstName + ", Registration Complete!";
  dialogOverlay.classList.add("active");
}

// close the dialog when user clicks maybe later
dialogClose.addEventListener("click", function() {
  dialogOverlay.classList.remove("active");

  // reset the form after closing
  form.reset();
  var inputs = form.querySelectorAll("input");
  inputs.forEach(function(input) {
    input.classList.remove("input-success");
  });
});

// also close dialog if user clicks outside the box
dialogOverlay.addEventListener("click", function(e) {
  if (e.target === dialogOverlay) {
    dialogClose.click();
  }
});

// when user clicks submit, run all validations
form.addEventListener("submit", function(event) {
  event.preventDefault(); // stop page from reloading

  var isNameValid            = validateName();
  var isEmailValid           = validateEmail();
  var isPasswordValid        = validatePassword();
  var isConfirmPasswordValid = validateConfirmPassword();
  var isAgeValid             = validateAge();

  // only show dialog if everything passed
  if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
    showDialog();
  }
});

// validate each field when user moves to next field
document.getElementById("fullName").addEventListener("blur", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirmPassword").addEventListener("blur", validateConfirmPassword);
document.getElementById("age").addEventListener("blur", validateAge);
