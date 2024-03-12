import { changeScreen } from "./transitions.js";

const d = document,
$signUpHeader = d.querySelector(".header-sign-up"),
$signUpHS = d.querySelector(".hero-section-sign-up")

d.addEventListener("DOMContentLoaded", e => {
    console.log("Hola uwu");
    $signUpHeader.addEventListener("click", e => changeScreen("main", "#sign-up"))
    $signUpHS.addEventListener("click", e => changeScreen("main", "#sign-up"))
})