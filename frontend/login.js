function toggleForm(form) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (form === "register") {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  } else {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
  }
}
