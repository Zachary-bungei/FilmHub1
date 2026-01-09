// const MAX_ATTEMPTS = 15; 
// let LogMode = true; 

// function getInputData() {
//     const email = document.getElementById('SignEmail').value.trim();
//     const password = document.getElementById('pwd1').value.trim();
//     const confirmPassword = document.getElementById('pwd2').value.trim();

//     if(LogMode){
//         if (!email || !password) {
//             errform("All fields are required!");
//             return null;
//         }
//     }else{
//         if (!email || !password || !confirmPassword) {
//             errform("All fields are required!");
//             return null;
//         }
//     }
//     return { email, password, confirmPassword };
// }

// // Validate input values
// function validateInput(data) {
//     // Email basic regex check
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(data.email)) {
//         errform("Invalid email format!");
//         return false;
//     }

//     // Password length and confirmation match
//     if (data.password.length < 8 || data.password.length > 20) {
//         errform("Password must be at least 6 characters!");
//         return false;
//     }
//     if(!LogMode){
//         if (data.password !== data.confirmPassword) {
//             errform("Passwords do not match!");
//             return false;
//         }
//     }

//     return true;
// }

// // Track attempts in localStorage
// function checkAttempts() {
//     const today = new Date().toDateString();
//     let attemptsData = JSON.parse(localStorage.getItem('formAttempts')) || {};

//     // Reset attempts if new day
//     if (attemptsData.date !== today) {
//         attemptsData = { date: today, attempts: 0 };
//     }

//     if (attemptsData.attempts >= MAX_ATTEMPTS) {
//         errform("Maximum attempts reached for today.");
//         return false;
//     }

//     // Increment attempts
//     attemptsData.attempts++;
//     localStorage.setItem('formAttempts', JSON.stringify(attemptsData));
//     return true;
// }

// // Handle submit button click
// document.getElementById('SignBtn').addEventListener('click', () => {
//     this.disable = true;
//     const data = getInputData();
//     if (!data){
//         this.disabled = false;
//         return;
//     }  // missing fields

//     if (!validateInput(data)) {
//         this.disabled = false;
//         return;
//     }; // failed validation

//     if (!checkAttempts()){
//         this.disabled = false;
//         return;
//     }; // exceeded attempts

//     // If all validations pass, send data
//     // sendData(data);
//     doSignup(data);
// });

// // Function to send data to main.php
// async function doSignup(data) {
//     const result = await sendData("signup", {
//       email: data.email,
//       password: data.password
//     });
  
//     console.log("Signup:", result);
//   }
// async function sendData(data) {
//     try {
//         const response = await fetch("/assets.server.js", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ action, data })
//         });
    
//         const result = await response.json();
//         return result;
        
//       } catch (err) {
//         console.error("Request failed:", err);
//         return { success: false, error: err.message };
//       }
// //       .finally(() => {
// //         document.getElementById("SignBtn").disabled = false;
// //   });
// }



// async function sendAction(action, data = {}) {
//     try {
//       const response = await fetch("http://localhost:3000/api", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ action, data })
//       });
  
//       const result = await response.json();
//       return result;
//     } catch (err) {
//       console.error("Request failed:", err);
//       return { success: false, error: err.message };
//     }
//   }
  
// function errform(error) {
//      const ErrP = document.getElementById('ErrForm');
//         ErrP.textContent = error;
//         ErrP.style.visibility = "visible";

//         setTimeout(() => {
//             ErrP.style.visibility = "hidden";
//         }, 5000);
// }


// const slider = document.getElementById("slider");
// const loginBtn = document.getElementById("loginBtn");
// const signupBtn = document.getElementById("signupBtn");

// loginBtn.addEventListener("click", () => {
//     slider.style.transform = "translateX(0%)";
//     LogMode = true;
// });

// signupBtn.addEventListener("click", () => {
//     slider.style.transform = "translateX(113%)";
//     LogMode = false;
// });

// let isHidden = true; 
// const pwd1 = document.getElementById('pwd1');
// const pwd2 = document.getElementById('pwd2');
// const toggle = document.getElementById('PwdToggle');

// toggle.addEventListener('click', () => {
// isHidden = !isHidden; 
// if (isHidden) {
//     pwd1.type = 'password';
//     pwd2.type = 'password';
    
//     // toggle.textContent = 'Show';
// } else {
//     pwd1.type = 'text';
//     pwd2.type = 'text';
//     // toggle.textContent = 'Hide';
// }
// });

const MAX_ATTEMPTS = 800; 
let LogMode = true; 

function getInputData() {
    const email = document.getElementById('SignEmail').value.trim();
    const password = document.getElementById('pwd1').value.trim();
    const confirmPassword = document.getElementById('pwd2').value.trim();

    if(LogMode){
        if (!email || !password) {
            errform("All fields are required!");
            return null;
        }
    }else{
        if (!email || !password || !confirmPassword) {
            errform("All fields are required!");
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
        errform("Invalid email format!");
        return false;
    }

    // Password length and confirmation match
    if (data.password.length < 8 || data.password.length > 20) {
        errform("Password must be at least 6 characters!");
        return false;
    }
    if(!LogMode){
        if (data.password !== data.confirmPassword) {
            errform("Passwords do not match!");
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
        errform("Maximum attempts reached for today.");
        return false;
    }

    // Increment attempts
    attemptsData.attempts++;
    localStorage.setItem('formAttempts', JSON.stringify(attemptsData));
    return true;
}

// Handle submit button click
document.getElementById('SignBtn').addEventListener('click', () => {
    this.disable = true;
    const data = getInputData();
    if (!data){
        this.disabled = false;
        return;
    }  // missing fields

    if (!validateInput(data)) {
        this.disabled = false;
        return;
    }; // failed validation

    if (!checkAttempts()){
        this.disabled = false;
        return;
    }; // exceeded attempts

    // If all validations pass, send data
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
         errform("Created account successfully");
         setTimeout(() => {
            window.location.replace("/assets");

        }, 1000);
    }else{
        errform("Failed to create account");
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
         errform(" login successfully");
         setTimeout(() => {
            window.location.replace("/assets");
        }, 1000);
    }else{
        errform("Failed to login");
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


function errform(error) {
     const ErrP = document.getElementById('ErrForm');
        ErrP.textContent = error;
        ErrP.style.visibility = "visible";

        setTimeout(() => {
            ErrP.style.visibility = "hidden";
        }, 5000);
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
      // credentials: "include", // 👈 sends cookies
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
