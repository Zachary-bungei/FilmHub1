async function checkSession() {
  // get the JWT from sessionStorage
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    console.log("No session token found");
    return;
  }

  const res = await fetch("https://filmhub-x7on.onrender.com/checksession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // send JWT to backend
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log("Session check:", data);

}

// check session on page load
checkSession();


async function logout() {
  // remove the token from sessionStorage
  sessionStorage.removeItem("access_token");

  // optionally notify the backend if you want to blacklist JWTs
  const res = await fetch("https://filmhub-x7on.onrender.com/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("Logout:", data);

  if (data.loggedOut) {
    alert("Logout successful");
    location.reload();
  }
}
