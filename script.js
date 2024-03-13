import { login, signUp } from "./account.js";
import { changeScreen } from "./transitions.js";

const d = document,
ls = localStorage,
$signUpHeader = d.querySelector(".header-sign-up"),
$signUpHS = d.querySelector(".hero-section-sign-up"),
$closeSignUp = d.querySelector("#sign-up .close"),
$loginHeader = d.querySelector(".header-login"),
$LoginHS = d.querySelector(".hero-section-login"),
$closeLogin = d.querySelector("#login .close"),
$logo = d.querySelector(".header-logo"),
$signUpBtn = d.querySelector(".sign-up-btn"),
$loginBtn = d.querySelector(".login-btn")

d.addEventListener("DOMContentLoaded", e => {

    // Transitions

    $signUpHeader.addEventListener("click", e => changeScreen("main", "#sign-up"))
    $signUpHeader.addEventListener("click", e => changeScreen("#login", "#sign-up"))
    $signUpHS.addEventListener("click", e => changeScreen("main", "#sign-up"))
    $closeSignUp.addEventListener("click", e => changeScreen("#sign-up", "main"))
    $loginHeader.addEventListener("click", e => changeScreen("main", "#login"))
    $loginHeader.addEventListener("click", e => changeScreen("#sign-up", "#login"))
    $LoginHS.addEventListener("click", e => changeScreen("main", "#login"))
    $closeLogin.addEventListener("click", e => changeScreen("#login", "main"))
    $logo.addEventListener("click", e => changeScreen("#login", "main"))
    $logo.addEventListener("click", e => changeScreen("#sign-up", "main"))

    // Sign up

    $signUpBtn.addEventListener("click", async e => {
        e.preventDefault()
        signUp("#sign-up-email", "#sign-up-password", "#sign-up-name", "#sign-up-tel")
    })

    // Login

    $loginBtn.addEventListener("click", e => {
        e.preventDefault()
        login("#login-email", "#login-password")
    })

    if(ls.getItem["has-to-login"]){
        changeScreen("main", "#login")
        ls.setItem("has-to-login", false)
    }
})