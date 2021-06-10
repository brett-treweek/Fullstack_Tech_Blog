const loginBtn = document.querySelector("#loginBtn");
const loginModal = document.querySelector(".loginModal");
const signModal = document.querySelector(".signModal");
const content = document.querySelector("#content");
const closeLogin = document.querySelector('#closeLogin');
const closeSign = document.querySelector('#closeSign');
const signUpBtn = document.querySelector('#signBtn');

loginBtn.addEventListener("click", showLogin);
closeLogin.addEventListener("click", hideLogin);
signUpBtn.addEventListener("click", showSignUp);
closeSign.addEventListener("click", hideSignUp);

function showLogin() {
    loginModal.classList.add("display");
    content.classList.add('hide');
}

function hideLogin() {
    loginModal.classList.remove('display')
    content.classList.remove('hide')
}

function showSignUp() {
    loginModal.classList.remove("display");
    signModal.classList.add('display')
}

function hideSignUp() {
    signModal.classList.remove('display')
    content.classList.remove('hide')
}