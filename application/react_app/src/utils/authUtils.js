const $ = require('jquery');

export function getAuthToken() {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return `Token ${token}`;
  }
  return false;
}

export function makeAuthToken(email, password) {
  const errors = [];
  $.ajax({
    url: `${process.env.NODE_ENV}/api/signin/`,
    type: 'POST',
    async: false,
    data: {
      email,
      password,
    },
    success(data) {
      localStorage.setItem('token', data.token);
      window.location.reload();
    },
    error(jqXHR) {
      Object.keys(jqXHR.responseJSON).forEach((key) => {
        errors.push(jqXHR.responseJSON[key]);
      });
    },
  });
  return errors;
}

export function logout() {
  window.localStorage.removeItem('token');
  window.location.reload();
}

export function register(registerData, callback) {
  const errors = [];
  $.ajax({
    url: `${process.env.NODE_ENV}/api/users/`,
    type: 'POST',
    async: false,
    data: registerData,
    success(data) {
      if ($.isFunction(callback)) {
        callback(data);
      }
    },
    error(jqXHR) {
      Object.keys(jqXHR.responseJSON).forEach((key) => {
        errors.push(jqXHR.responseJSON[key]);
      });
    },
  });
  return errors;
}
