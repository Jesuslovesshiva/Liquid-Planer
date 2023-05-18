class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  _createUserLoginRegister() {
    const Usercontainer = document.createElement("div");
    Usercontainer.id = "user-login-register";

    const form = document.createElement("form");
    form.addEventListener("submit", (e) => e.preventDefault()); // Prevent form submission

    const loginInput = document.createElement("input");
    loginInput.type = "text";
    loginInput.placeholder = "Enter username";
    loginInput.classList.add("user-inputfield");
    loginInput.setAttribute("autocomplete", "username");

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Enter password";
    passwordInput.classList.add("user-inputfield");
    passwordInput.setAttribute("autocomplete", "current-password");

    const loginButton = document.createElement("button");
    loginButton.type = "submit";
    loginButton.textContent = "Login";
    loginButton.classList.add("user-inputfield");

    loginButton.addEventListener("click", () => {
      this.login(loginInput.value, passwordInput.value);
    });

    const registerButton = document.createElement("button");
    registerButton.type = "submit";
    registerButton.textContent = "Register";
    registerButton.classList.add("user-inputfield");

    registerButton.addEventListener("click", () => {
      this.createUser(loginInput.value, passwordInput.value);
    });

    form.appendChild(loginInput);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);
    form.appendChild(registerButton);
    Usercontainer.appendChild(form);
    document.body.appendChild(Usercontainer);
  }

  // fetchDataFromAPI() {

  // }
}
