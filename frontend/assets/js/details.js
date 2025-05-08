const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/events/${id}`);
    const event = await res.json();

    if (!event || !event.title) {
      document.body.innerHTML = "<p class='text-danger'>Event not found.</p>";
      return;
    }

    document.getElementById("event-name").textContent = event.title;
    document.getElementById("event-date").textContent = event.date;
    document.getElementById("event-location").textContent = event.location;
    document.getElementById("event-description").textContent = event.description;
    document.getElementById("event-image").src = event.image || "https://via.placeholder.com/400x200";
  } catch (err) {
    document.body.innerHTML = "<p class='text-danger'>Error loading event.</p>";
  }
});
