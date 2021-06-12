// const loginBtn = document.querySelector("#loginBtn");
// const loginModal = document.querySelector(".loginModal");
// const signModal = document.querySelector(".signModal");
// const content = document.querySelector("#content");
// const closeLogin = document.querySelector("#closeLogin");
// const closeSign = document.querySelector("#closeSign");
// const signUpBtn = document.querySelector("#signBtn");
// const blogs = document.querySelectorAll(".blogContainer");

// // console.log(blogs);

// loginBtn.addEventListener("click", showLogin);
// closeLogin.addEventListener("click", hideLogin);
// signUpBtn.addEventListener("click", showSignUp);
// closeSign.addEventListener("click", hideSignUp);

// blogs.forEach((blog) => {
//   blog.addEventListener("click", () => {
//     // console.log(blog.innerText)
//   });
// });

// function showLogin() {
//   loginModal.classList.add("display");
//   content.classList.add("hide");
// }

// function hideLogin() {
//   loginModal.classList.remove("display");
//   content.classList.remove("hide");
// }

// function showSignUp() {
//   loginModal.classList.remove("display");
//   signModal.classList.add("display");
// }

// function hideSignUp() {
//   signModal.classList.remove("display");
//   content.classList.remove("hide");
// }









// ================ Logout ====================

// const logout = async () => {
//   const response = await fetch("/api/users/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     document.location.replace("/");
//   } else {
//     alert("Failed to log out.");
//   }
// };

// document.querySelector("#logoutBtn").addEventListener("click", logout);
