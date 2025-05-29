window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) {
    window.location.href = "login.html";
    return;
  }

  let userData;
  try {
    userData = JSON.parse(userRaw);
  } catch (e) {
    // JSON bozuksa localStorage'ı temizleyip login sayfasına yönlendir
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
    return;
  }

  // Şimdi kullanıcı adı ekranda görünsün
  document.querySelector(".username").textContent = userData.username;

  // Log out butonu
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Klavye ikonu index.html'e yönlendirsin
  document.getElementById("keyboard-icon").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
