"use strict";

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  _createUserLoginRegister() {
    const Usercontainer = document.createElement("div");
    Usercontainer.id = "user-login-register";

    const loginInput = document.createElement("input");
    loginInput.placeholder = "Enter username";
    loginInput.classList.add("user-inputfield");

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Enter password";
    passwordInput.classList.add("user-inputfield");

    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginButton.classList.add("user-inputfield");

    loginButton.addEventListener("click", () => {
      this.login(loginInput.value, passwordInput.value);
    });

    const registerButton = document.createElement("button");
    registerButton.textContent = "Register";
    registerButton.classList.add("user-inputfield");

    registerButton.addEventListener("click", () => {
      this.createUser(loginInput.value, passwordInput.value);
    });

    Usercontainer.appendChild(loginInput);
    Usercontainer.appendChild(passwordInput);
    Usercontainer.appendChild(loginButton);
    Usercontainer.appendChild(registerButton);
    document.body.appendChild(Usercontainer);
  }

  // fetchDataFromAPI() {

  // }
}
