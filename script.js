import { login, signUp } from "./account.js";
import { changeScreen, closeAlert } from "./transitions.js";
import { testStack, testStaticArray, testing } from "./stack_testing.js";

const d = document,
ls = localStorage,

// Botones

//$signUpHeader = d.querySelector(".header-sign-up"),
$signUpHS = d.querySelector(".hero-section-sign-up"),
$closeSignUp = d.querySelector("#sign-up .close"),
//$loginHeader = d.querySelector(".header-login"),
$LoginHS = d.querySelector(".hero-section-login"),
$closeLogin = d.querySelector("#login .close"),
$logo = d.querySelector(".header-logo-div"),
$signUpBtn = d.querySelector(".sign-up-btn"),
$loginBtn = d.querySelector(".login-btn")

d.addEventListener("DOMContentLoaded", e => {

    // Generalidades
    
    closeAlert()

    // Transiciones
    
    $signUpHS.addEventListener("click", e => changeScreen("main", "#sign-up"))
    $closeSignUp.addEventListener("click", e => changeScreen("#sign-up", "main"))
    $LoginHS.addEventListener("click", e => changeScreen("main", "#login"))
    $closeLogin.addEventListener("click", e => changeScreen("#login", "main"))
    $logo.addEventListener("click", e => changeScreen("#login", "main"))
    $logo.addEventListener("click", e => changeScreen("#sign-up", "main"))

    // Crear cuenta

    $signUpBtn.addEventListener("click", async e => {
        e.preventDefault()
        $signUpBtn.setAttribute("disabled", "disabled")
        await signUp("#sign-up-email", "#sign-up-password", "#sign-up-name", "#sign-up-tel")
        $signUpBtn.removeAttribute("disabled")
    })

    // Iniciar sesión

    $loginBtn.addEventListener("click", async e => {
        e.preventDefault()
        $loginBtn.setAttribute("disabled", "disabled")
        await login("#login-email", "#login-password")
        $loginBtn.removeAttribute("disabled")
    })

    if(ls.getItem["has-to-login"] == "true"){
        changeScreen("main", "#login")
    }
})