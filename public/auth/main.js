const MAX_ATTEMPTS = 800; 
let LogMode = true; 

function getInputData() {
    const email = document.getElementById('SignEmail').value.trim();
    const password = document.getElementById('pwd1').value.trim();
    const confirmPassword = document.getElementById('pwd2').value.trim();

    if(LogMode){
        if (!email || !password) {
            errform("warning", "red", "Email or password is missing!");
            return null;
        }
    }else{
        if (!email || !password || !confirmPassword) {
            errform("warning", "red", "All fields are required!");
            return null;
        }
    }
    return { email, password, confirmPassword };
}

// Validate input values
function validateInput(data) {
    // Email basic regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errform("warning", "red", "Invalid email format!");
        return false;
    }

    // Password length and confirmation match
    if (data.password.length < 8 || data.password.length > 20) {
        errform("warning", "red", "Password must be at least 6 characters!");
        return false;
    }
    if(!LogMode){
        if (data.password !== data.confirmPassword) {
            errform("warning", "red", "Passwords don't match!");
            return false;
        }
    }

    return true;
}


// Track attempts in localStorage
function checkAttempts() {
    const today = new Date().toDateString();
    let attemptsData = JSON.parse(localStorage.getItem('formAttempts')) || {};

    // Reset attempts if new day
    if (attemptsData.date !== today) {
        attemptsData = { date: today, attempts: 0 };
    }

    if (attemptsData.attempts >= MAX_ATTEMPTS) {
        errform("warning", "red", "Maximum attempts reached for today.");
        return false;
    }

    // Increment attempts
    attemptsData.attempts++;
    localStorage.setItem('formAttempts', JSON.stringify(attemptsData));
    return true;
}

// Handle submit button click
const SignBtn = document.getElementById('SignBtn');
document.getElementById('SignBtn').addEventListener('click', () => {
    SignBtn.innerText = "Submitting…";
    SignBtn.disable = true;
    const data = getInputData();
    if (!data){
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
        return;
    }  // missing fields

    if (!validateInput(data)) {
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
        return;
    }; // failed validation

    if (!checkAttempts()){
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
        return;
    }; // exceeded attempts

    // sendData(data);
    if(LogMode == true){
        doLogin(data);
    }else{
       doSignup(data);
    }
});

// Function to send data to main.php
async function doSignup(data) {
    const result = await sendData("signup", {
      email: data.email,
      username: data.username,  
      password: data.password
    });
     console.log("Signup:", result);
    if(result.success == true){
         errform("check_circle", "green", "Created account successfully");
         window.location.replace("/verify");
    }else{
        errform("warning", "red", "Failed to create account");
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
    }    
  }
async function doLogin(data) {
    const result = await sendData("login", {
      email: data.email, 
      username: data.username,
      password: data.password
    });
    console.log("Login:", result);
    if(result.success == true){
         errform("check_circle", "green", " login successfully");
         window.location.replace("/dashboard");
    }else{
        errform("warning", "red","Failed to login");
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
    } 
  }
async function sendData(action1, data = {}) {
   try {
       const response = await fetch("https://filmhub-x7on.onrender.com/auth", {
         method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ action: action1, data })
        });
    
        const result = await response.json();
        return result;
        
      } catch (err) {
        console.error("Request failed:", err);
        return { success: false, error: err.message };
      }
//       .finally(() => {
//         document.getElementById("SignBtn").disabled = false;
//   });
    
}


function errform(icon1, bgcolor, error) {
    const ErrP = document.getElementById('ErrForm');
    const errorbox = document.getElementById('LogMsg');
    const ErrIocn = document.getElementById('errIocn');
    errorbox.style.outlineColor = bgcolor;
    errorbox.style.backgroundColor = bgcolor;
    ErrIocn.innerText = icon1;
    ErrP.textContent = error;
    errorbox.style.visibility = "visible";
    setTimeout(() => {
        errorbox.style.visibility = "hidden";
    }, 10000);
}


const slider = document.getElementById("slider");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

loginBtn.addEventListener("click", () => {
    slider.style.transform = "translateX(0%)";
    LogMode = true;
});

signupBtn.addEventListener("click", () => {
    slider.style.transform = "translateX(113%)";
    LogMode = false;
});

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
