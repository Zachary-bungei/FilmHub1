// import { supabase } from './supabaseClient.js';
const MAX_ATTEMPTS = 95; 
let LogMode = true; 

function getInputData() {
    const email = document.getElementById('SignEmail').value.trim();
    const username1 = document.getElementById('Us1Name').value.trim();
    const password = document.getElementById('pwd1').value.trim();
    const confirmPassword = document.getElementById('pwd2').value.trim();

    if(LogMode){
        if (!email || !password) {
            errform("warning", "red", "Email or password is missing!");
            return null;
        }
    }else{
        if (!email || !password || !username1 || !confirmPassword) {
            errform("warning", "red", "All fields are required!");
            return null;
        }
    }
    return { email, username1, password, confirmPassword};
}

// Validate input values
function validateInput(data) {
    // Email basic regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errform("warning", "red","Invalid email format!");
        return false;
    }

    // Password length and confirmation match
    if (data.password.length < 8 || data.password.length > 20) {
        errform("warning", "red", "Password must be at least 6 characters!");
        return false;
    }
    if(!LogMode){
        if (data.password !== data.confirmPassword) {
            errform("warning", "red","Passwords do not match!");
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
let SignBtn = document.getElementById('SignBtn');
document.getElementById('SignBtn').addEventListener('click', () => {
    SignBtn.disable = true;
    SignBtn.innerHTML = "Submitting.."
    const data = getInputData();
    if (!data){
      SignBtn.disabled = false;
      SignBtn.innerHTML = "Submit"
        return;
    }  // missing fields

    if (!validateInput(data)) {
      SignBtn.disabled = false;
      SignBtn.innerHTML = "Submit"
        return;
    }; // failed validation

    if (!checkAttempts()){
      SignBtn.disabled = false;
      SignBtn.innerHTML = "Submit"
        return;
    }; // exceeded attempts

    // If all validations pass, send data
    // sendData(data);
    if(LogMode){
       doSignin(data);

    }else{
      doSignup(data);
    }
    
});

// Function to send data to main.php
async function doSignup(data) {
    const result = await sendData("signup", {
      email: data.email,
      username: data.username1,
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
async function doSignin(data) {
  const result1 = await sendData("login", {
      email: data.email,
      password: data.password
  });
    if (result1.error) {
        // handle login failure
        errform("error", "red", result1.error.message);
        return;
    }
  console.log("Login:", result1);
    if(result1.success == false){
        errform("warning", "red","Failed to login");
        SignBtn.disable = false;
        SignBtn.innerText = "Submit";
    }else{
        errform("check_circle", "green", " login successfully");
        localStorage.setItem('access_token', result1.access_token)
        localStorage.setItem('refresh_token', result1.refresh_token)
        localStorage.setItem('expires_at', result1.expires_at)
        
        // alert(result1.access_token);
        let verrifysec = await fetch('https://your-render.onrender.com/protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            token: result1.access_token
          })
        });
        console.log(verrifysec);
        window.location.replace("/dashboard");
    } 
}
async function sendData(action, data ={}) {
    try {
        const response = await fetch("https://filmhub-x7on.onrender.com/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ action, data })
        });
    
        const result = await response.json();
        return result;
        
      } catch (err) {
        console.error("Request failed:", err);
        return { success: false, error: err.message };
      }
    
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

let isHidden = true; 
const pwd1 = document.getElementById('pwd1');
const pwd2 = document.getElementById('pwd2');
const toggle = document.getElementById('PwdToggle');


document.getElementById("mode-container").addEventListener('click', ()=>{
  if(LogMode){
    document.getElementById("checkboxTM").style.display = "none"; 
    document.getElementById("termsLnk").style.display = "flex";
    document.getElementById("TMagree").style.display = "none"; 
    document.getElementById("zx_register_field1").style.display = "none";
    document.getElementById("zx_register_field2").style.display = "none";
  }else{
    document.getElementById("checkboxTM").style.display = "flex";
    document.getElementById("termsLnk").style.display = "none";
    document.getElementById("TMagree").style.display = "flex"; 
    document.getElementById("zx_register_field1").style.display = "flex";
    document.getElementById("zx_register_field2").style.display = "flex";
  }
});
// document.getElementById("termsLnk").style.display = "none"
toggle.addEventListener('click', () => {
isHidden = !isHidden; 
if (isHidden) {
    pwd1.type = 'password';
    pwd2.type = 'password';
    
    // toggle.textContent = 'Show';
} else {
    pwd1.type = 'text';
    pwd2.type = 'text';
    // toggle.textContent = 'Hide';
}
});

async function checkSession() {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    console.log("No session token found");
    return;
  }

  const res = await fetch("https://filmhub-x7on.onrender.com/checksession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  // console.log("Session check:", data);
    
}
window.addEventListener("DOMContentLoaded", checkSession);



