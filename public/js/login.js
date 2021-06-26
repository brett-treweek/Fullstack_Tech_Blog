const loginBtn = document.querySelector("#loginBtn");
const loginModal = document.querySelector(".loginModal");
const signModal = document.querySelector(".signModal");
const closeLogin = document.querySelector("#closeLogin");
const closeSign = document.querySelector("#closeSign");
const signUpBtn = document.querySelector("#signBtn");

loginBtn.addEventListener("click", showLogin);
closeLogin.addEventListener("click", backToHome);
signUpBtn.addEventListener("click", showSignUp);
closeSign.addEventListener("click", backToHome);

function showLogin() {
    loginModal.classList.add("display");
  }
  
  function backToHome() {
    document.location.replace('/')
  }
  
  function showSignUp() {
    loginModal.classList.add("hide");
    signModal.classList.add("display");
  }
  
// ================= Log In =====================
const loginForm = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#loginUsername").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
        // console.log('TTTTTTTTTTTTTTTTTTTT', )
      } else {
        alert("Failed to log in");
      }
    }
  };

  // ================= Sign Up ==================

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#signUsername").value.trim();
    const password = document.querySelector("#signPassword").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up.");
      }
    }
  };

  document
  .querySelector("#signForm")
  .addEventListener("submit", signupFormHandler);
  
  document
  .querySelector("#loginForm")
  .addEventListener("submit", loginForm);








