let events = [];
let visibleEvents = 5;

// Fetch events from JSON
async function loadEvents() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        events = await response.json();
        displayEvents(0, visibleEvents);
    } catch (error) {
        console.error("Error loading events:", error);
    }
}

// Display events dynamically
function displayEvents(start, end) {
    const eventContainer = document.getElementById("event-container");
    eventContainer.innerHTML = "";

    events.slice(start, end).forEach((event, index) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("col-md-4", "mb-3");

        eventCard.innerHTML = `
            <div class="card">
                <img src="${event.image}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.date} | ${event.location}</p>
                    <a href="details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        eventContainer.appendChild(eventCard);
    });
}

// Load More Events
document.getElementById("load-more").addEventListener("click", () => {
    visibleEvents += 5;
    displayEvents(0, visibleEvents);
});

// Load events on page load
document.addEventListener("DOMContentLoaded", loadEvents);
