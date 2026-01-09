async function checkSession() {
    const res = await fetch("https://filmhub-x7on.onrender.com/checksession", {
      method: "POST",
      credentials: "include", // 👈 sends cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await res.json();
    console.log("Session check:", data);
  
    if (data.loggedIn) {
      console.log("User email:", data.user.email);
      console.log("Username:", data.user.name);
    //   console.log("Profile image:", data.user.profile_img);
    }
  }

 checkSession();

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid"); // default cookie name
    res.json({ loggedOut: true });
  });
    if (data.loggedOut) {
        // document.getElementById("logoutBtn").style.display = "none";
        alert("logout successfully");
        location.reload(); // optional, but clean
        
    }
});
