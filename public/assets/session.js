async function checkSession() {
  try {
    const res = await fetch("https://filmhub-x7on.onrender.com/check-session", {
      method: "POST",
      credentials: "include",               
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})              
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Server error: ${res.status} ${res.statusText}`, errorText);
      statusEl.textContent = `Error: Server responded with status ${res.status}`;
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await res.text();
      console.error("Expected JSON, but received:", contentType, errorText);
      statusEl.textContent = "Error: Did not receive JSON response";
      return;
    }

    const data = await res.json();

    if (data.loggedIn) {
      statusEl.textContent = `Logged in as ${data.user.email}`;
    } else {
      statusEl.textContent = "Not logged in";
    }

  } catch (err) {
    console.error("Error checking session:", err);
    document.getElementById("status").textContent = "Error checking session";
  }
}


// Run on page load
window.addEventListener("DOMContentLoaded", checkSession);

document.getElementById("Logoutid").addEventListener("click", async () => {
  try {
    const res = await fetch("https://filmhub-x7on.onrender.com/logout", { method: "POST" });
    const data = await res.json();

    if (data.success) {
      // Hide protected content
      // document.getElementById("sesmsg").style.display = "none";
      // Show session ended message
      const deniedEl = document.getElementById("sesmsg");
      deniedEl.textContent = "Session ended. Please log in again.";
      deniedEl.style.display = "block";
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
});
