function register() {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  document.getElementById("spinner").style.display = "block"; //spiner

  fetch("https://turbo-turtle.onrender.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server response:", data);
      document.getElementById("regMessage").textContent =
        data.message || "Registered successfully";
    })
    .catch(() => {
      document.getElementById("regMessage").textContent = "Registration failed";
    })
    .finally(() => {
      document.getElementById("spinner").style.display = "none"; //spiner
    });
}
