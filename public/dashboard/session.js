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
