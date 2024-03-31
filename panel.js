import { validateSessionIdToken } from "./account.js";
import { activateArrows, createArray, createPay } from "./pay_list.js";
import { appearDiv, changeScreen, changeTitle, dissappearDiv } from "./transitions.js";

const d = document,
ls = localStorage,
$payListBtn = d.querySelector(".pay-list-btn"),
$closePayListBtn = d.querySelector(".pay-list .panel-div-close"),
$createPayBtn = d.querySelector(".create-pay-btn")

d.addEventListener("DOMContentLoaded", e => {

    // Validar si existe un token guardado en el navegador. Si existe, se inicia sesión

    /*const session = validateSessionIdToken(ls.getItem("id-token")).then(data => {
        if(!data) {
            ls.setItem("has-to-login", true) // Si no hay token, se pone en true para que al redirigirse a la landing page, ésta sepa que debe abrir el apartado de login
            location.href = "https://mishipay.vercel.app/index.html" // Se redirige a la landing page
        }

        // Relleno uwun't
        
        const userEmail = data["users"][0]["email"]
        d.querySelector(".userEmail").textContent = userEmail
    })*/
    $payListBtn.addEventListener("click", e => {
        appearDiv(".pay-list")
        appearDiv(".panel-list-pays")
        changeTitle(".panel-title", ".panel-list-pays")
    })
    createArray(".pay-list-pay") // La cantidad máxima de pagos en la lista será de 15
    activateArrows(".up-arrow", ".down-arrow", ".pay-list-pay")
    
    $closePayListBtn.addEventListener("click", e => {
        dissappearDiv(".pay-list")
    })

    $createPayBtn.addEventListener("click", e => {
        dissappearDiv(".panel-list-pays")
        appearDiv(".create-pay-section")
        changeTitle(".panel-title", ".create-pay-section")
    })

    createPay(".create-pay", "#create-pay-title", "#create-pay-tel", "#create-pay-amount")
})