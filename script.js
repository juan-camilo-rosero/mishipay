import { changeScreen } from "./transitions.js";

const d = document,
$signUpHeader = d.querySelector(".header-sign-up"),
$signUpHS = d.querySelector(".hero-section-sign-up"),
$closeSignUp = d.querySelector("#sign-up .close"),
$loginHeader = d.querySelector(".header-login"),
$LoginHS = d.querySelector(".hero-section-login"),
$closeLogin = d.querySelector("#login .close"),
$logo = d.querySelector(".header-logo")

d.addEventListener("DOMContentLoaded", e => {
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
})