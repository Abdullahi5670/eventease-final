document.getElementById("create-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const event = {
    title: document.getElementById("event-name").value,
    date: document.getElementById("event-date").value,
    location: document.getElementById("event-location").value,
    image: document.getElementById("event-image").value,
    description: document.getElementById("event-description").value
  };

  const res = await fetch("http://localhost:5000/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(event)
  });

  if (res.ok) {
    alert("Event created!");
    window.location.href = "index.html";
  } else {
    const err = await res.text();
    alert("Failed to create event. " + err);
  }
});
