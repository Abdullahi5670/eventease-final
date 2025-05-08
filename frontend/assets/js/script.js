document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("register-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
    document.getElementById("create-btn").style.display = "inline-block";
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });

  loadEvents();
});

async function loadEvents() {
  const container = document.getElementById("events-container");
  container.innerHTML = "";
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/events");
  const events = await res.json();

  events.forEach(event => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    card.innerHTML = `
      <img src="${event.image || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${event.title}">
      <div class="card-body">
        <h5 class="card-title">${event.title}</h5>
        <p class="card-text">${event.description}</p>
        <p class="card-text text-muted">${event.date} | ${event.location}</p>
        <a href="details.html?id=${event._id}" class="btn btn-primary me-2">View Details</a>
      </div>`;

    if (token) {
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.className = "btn btn-danger mt-2";
      btn.onclick = () => deleteEvent(event._id);
      card.querySelector(".card-body").appendChild(btn);
    }

    col.appendChild(card);
    container.appendChild(col);
  });
}

async function deleteEvent(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:5000/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    alert("Event deleted");
    loadEvents();
  } else {
    alert("Delete failed");
  }
}
