function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

async function fetchStats() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found. Please log in.");
    return;
  }

  try {
    const res = await fetch(
      "https://turbo-turtle.onrender.com/api/auth/stats",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await res.json();
    console.log(data);
    document.getElementById("username").textContent =
      data.username ?? "username";
    document.getElementById("total-tests").textContent =
      data.testsCompleted ?? 0;
    document.getElementById("total-time").textContent = formatTime(
      data.totalTimeTyping ?? 0
    );

    const container = document.getElementById("history-container");
    container.innerHTML = "";

    if (Array.isArray(data.results)) {
      data.results
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((entry) => {
          const group = document.createElement("div");
          group.className = "result-group";

          const date = document.createElement("p");
          date.className = "date";
          date.textContent = entry.date?.split("T")[0] ?? "Unknown date";

          const cards = document.createElement("div");
          cards.className = "result-cards";

          const fields = [
            { label: "time typing", value: `${entry.timeTyping ?? 0}s` },
            { label: "CPM", value: entry.cpm ?? "0" },
            {
              label: "accuracy",
              value: entry.accuracy !== undefined ? `${entry.accuracy}%` : "0%",
            },
            { label: "consistency", value: entry.consistency ?? "0" },
          ];

          fields.forEach(({ label, value }) => {
            const card = document.createElement("div");
            card.className = "card";

            const val = document.createElement("p");
            val.className = "value";
            val.textContent = value;

            const lab = document.createElement("p");
            lab.className = "label";
            lab.textContent = label;

            card.appendChild(val);
            card.appendChild(lab);
            cards.appendChild(card);
          });

          group.appendChild(date);
          group.appendChild(cards);
          container.appendChild(group);
        });
    } else {
      container.innerHTML = "<p>No results available.</p>";
    }
  } catch (err) {
    console.error("Error fetching stats:", err.message);
  }
}
