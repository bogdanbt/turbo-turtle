function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  document.getElementById("spinner").style.display = "inline-block"; //spiner
  fetch("https://turbo-turtle.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.getElementById("loginMessage").textContent =
          "Login successful";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 800);
      } else {
        document.getElementById("loginMessage").textContent = "Login failed";
      }
    })
    .catch(() => {
      document.getElementById("loginMessage").textContent = "Login error";
    })
    .finally(() => {
      document.getElementById("spinner").style.display = "none"; //spiner
    });
}
