document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
      window.location.href = "login.html";
    } else {
      alert("Registration failed: " + (data.error || res.statusText));
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Something went wrong. See console.");
  }
});
