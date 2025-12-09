async function checkSession() {
  try {
    const res = await fetch("https://filmhub-x7on.onrender.com/checksession", {
      method: "POST",             
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})              
    });
    const statusEl = document.getElementById("sesmsg");
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Server error: ${res.status} ${res.statusText}`, errorText);
      statusEl.innerTHML = `Error: Server responded with status ${res.status}`;
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await res.text();
      console.error("Expected JSON, but received:", contentType, errorText);
      statusEl.innerTHML = "Error: Did not receive JSON response";
      return;
    }

    const data = await res.json();

    if (data.loggedIn) {
      statusEl.innerTHML = `Logged in as ${data.user.email}`;
    } else {
      statusEl.innerTHML = "Not logged in";
    }

  } catch (err) {
    console.error("Error checking session:", err);
    document.getElementById("status90").innerTHML = "Error checking session";
  }
}


// Run on page load
window.addEventListener("DOMContentLoaded", checkSession);

document.getElementById("Logoutid").addEventListener("click", async () => {
  try {
    const res = await fetch("https://filmhub-x7on.onrender.com/logout", {
      method: "POST",
      // credentials: "include", // REQUIRED for session cookies
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if (data.success) {
      const deniedEl = document.getElementById("sesmsg");
      deniedEl.innerTHML = "Session ended. Please log in again.";
      deniedEl.style.display = "block";
    } else {
      console.error("Logout failed:", data);
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
});
