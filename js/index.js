var logInForm = document.querySelector(".login-form");
var logInEmailInput = document.getElementById("emailSignInInput");
var logInPasswordInput = document.getElementById("passwordSignInInput");
var logInBlock = document.querySelector(".welcome-block");
var logInBtn = document.querySelector(".login-btn");
var errorMsg = document.querySelector(".error-msg");
var navBar = document.querySelector(".navbar");
var logoutBtn = document.querySelector(".logout-btn");
var welcomeText = document.querySelector(".welcome-text");
console.log(welcomeText.firstElementChild.textContent);

var emailArr = [];
var passwordArr = [];
var nameArr = [];
var usersArray = [];
var userIndex = 0;

if (localStorage.getItem("users") != null) {
  usersArray = JSON.parse(localStorage.getItem("users"));
}
function getUsersInfo() {
  for (var i = 0; i < usersArray.length; i++) {
    emailArr[i] = usersArray[i].email;
    passwordArr[i] = usersArray[i].password;
    nameArr[i] = usersArray[i].name;
  }
}
function checkEmail() {
  getUsersInfo();
  var index = emailArr.indexOf(logInEmailInput.value);
  if (
    (logInEmailInput.value == emailArr[index]) &
    (logInPasswordInput.value == passwordArr[index])
  ) {
    logInForm.classList.replace("d-block", "d-none");
    logInBlock.classList.replace("d-none", "d-block");
    errorMsg.classList.replace("d-block", "d-none");
    navBar.classList.replace("d-none", "d-block");
    welcomeText.firstElementChild.textContent = `Welcome ${nameArr[index]}`;
  } else {
    errorMsg.classList.replace("d-none", "d-block");
  }
}
logInBtn.addEventListener("click", checkEmail);

//------------------------------------logout--------------------------------------------------

function logOutBtn() {
  logInForm.classList.replace("d-none", "d-block");
  logInBlock.classList.replace("d-block", "d-none");
  errorMsg.classList.replace("d-block", "d-none");
  navBar.classList.replace("d-block", "d-none");
  resetSignInForm();
}
logoutBtn.addEventListener("click", logOutBtn);
//---------------------------------------Sign Up----------------------------------------------------//

var signUpForm = document.querySelector(".sign-up-card");
var signUpBtn = document.querySelector(".sign-up-btn");
var signInBtn = document.querySelector(".sign-in-btn");
var formSignUpBtn = document.querySelector(".create-btn");

var signUpNameInput = document.getElementById("nameSignUpInput");
var signUpEmailInput = document.getElementById("emailSignUpInput");
var signUpPasswordInput = document.getElementById("passwordSignUpInput");

var nameRegex = /^[A-Z].+$/;
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passwordRegex = /^.{5,}/;

function navigateToSignUp() {
  signUpForm.classList.replace("d-none", "d-block");
  logInForm.classList.replace("d-block", "d-none");
  resetSignInForm();
}
function navigateToSignIn() {
  signUpForm.classList.replace("d-block", "d-none");
  logInForm.classList.replace("d-none", "d-block");
  resetSignUpForm();
}
function resetSignInForm() {
  logInEmailInput.value = null;
  logInPasswordInput.value = null;
  logInEmailInput.classList.remove("is-valid", "is-invalid");
  logInPasswordInput.classList.remove("is-valid", "is-invalid");
  logInEmailInput.nextElementSibling.classList.replace("d-block", "d-none");
  logInPasswordInput.nextElementSibling.classList.replace("d-block", "d-none");
}
function resetSignUpForm() {
  signUpNameInput.value = null;
  signUpEmailInput.value = null;
  signUpPasswordInput.value = null;
  signUpNameInput.classList.remove("is-valid", "is-invalid");
  signUpEmailInput.classList.remove("is-valid", "is-invalid");
  signUpPasswordInput.classList.remove("is-valid", "is-invalid");
  signUpNameInput.nextElementSibling.classList.replace("d-block", "d-none");
  signUpEmailInput.nextElementSibling.classList.replace("d-block", "d-none");
  signUpPasswordInput.nextElementSibling.classList.replace("d-block", "d-none");
}

signUpBtn.addEventListener("click", navigateToSignUp);
signInBtn.addEventListener("click", navigateToSignIn);
function createUser() {
  if (
    isValidUserField(nameRegex, signUpNameInput) &
    isValidUserField(emailRegex, signUpEmailInput) &
    isValidUserField(passwordRegex, signUpPasswordInput) &
    isRepeatedEmail()
  ) {
    var user = {
      name: signUpNameInput.value,
      email: signUpEmailInput.value,
      password: signUpPasswordInput.value,
      index: userIndex,
    };
    usersArray.push(user);
    userIndex++;
    localStorage.setItem("users", JSON.stringify(usersArray));
    navigateToSignIn();
    console.log(usersArray);
  }
}
function isRepeatedEmail() {
  getUsersInfo();
  if (emailArr.includes(signUpEmailInput.value)) {
    console.log("repeated mail");
    signUpEmailInput.classList.add("is-invalid");
    signUpEmailInput.classList.remove("is-valid");
    signUpEmailInput.nextElementSibling.textContent = "email is repeated";
    signUpEmailInput.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  } else {
    console.log("not repeated mail");
    return true;
  }
}
function isValidUserField(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

formSignUpBtn.addEventListener("click", createUser);
signUpNameInput.addEventListener("input", function () {
  isValidUserField(nameRegex, this);
});
signUpEmailInput.addEventListener("input", function () {
  isValidUserField(emailRegex, this);
});
signUpPasswordInput.addEventListener("input", function () {
  isValidUserField(passwordRegex, this);
});
