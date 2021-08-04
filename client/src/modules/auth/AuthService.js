import { handleResponse, URL } from "../helpers";

export const authenticationService = {
  login,
  refreshToken,
  forgotPassword,
  logout,
};

function login({ username, password }) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/token/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.access) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function refreshToken() {
  const requestOptions = {
    method: "POST",
  };

  return fetch(`${URL}/token/refresh`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.access) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function forgotPassword() {}

function confirmPassword() {
  
}