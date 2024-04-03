import { validateSessionIdToken } from "./account.js";
import { StackArray } from "./data_structures.js";
import { activateArrows, createArray, createPay } from "./pay_list.js";
import { appearDiv, changeScreen, changeTitle, dissappearDiv } from "./transitions.js";

const d = document,
ls = localStorage,
$payListBtn = d.querySelector(".pay-list-btn"),
$closePanelBtn = d.querySelector(".pay-list .panel-div-close"),
$createPayBtn = d.querySelector(".create-pay-btn"),
$secondCreatePayBtn = d.querySelector(".create-pay"),
$cancelCreatePayBtn = d.querySelector(".cancel-create-pay")

d.addEventListener("DOMContentLoaded", e => {

    // Validar si existe un token guardado en el navegador. Si existe, se inicia sesión

    /*const session = validateSessionIdToken(ls.getItem("id-token")).then(data => {
        if(!data) {
            ls.setItem("has-to-login", true) // Si no hay token, se pone en true para que al redirigirse a la landing page, ésta sepa que debe abrir el apartado de login
            location.href = "https://mishipay.vercel.app/index.html" // Se redirige a la landing page
        }
    })*/
    
    $payListBtn.addEventListener("click", e => {
        appearDiv(".pay-list")
        appearDiv(".panel-list-pays")
        changeTitle(".panel-title", ".panel-list-pays")
        $closePanelBtn.setAttribute("data-section", ".panel-list-pays")
    })
    createArray(".pay-list-pay") // La cantidad máxima de pagos en la lista será de 15
    activateArrows(".up-arrow", ".down-arrow", ".pay-list-pay")
    
    $closePanelBtn.addEventListener("click", e => {
        const relations = {
            ".create-pay-section": ".panel-list-pays"
        }
        let section = $closePanelBtn.getAttribute("data-section")

        if(section == relations[section]) return
        if (section == ".panel-list-pays") {
            dissappearDiv(".pay-list")
            return
        }
        dissappearDiv(section)
        console.log(relations[section]);
        appearDiv(relations[section])
        changeTitle(".panel-title", relations[section])
        $closePanelBtn.setAttribute("data-section", relations[section])
    })

    $createPayBtn.addEventListener("click", e => {
        dissappearDiv(".panel-list-pays")
        appearDiv(".create-pay-section")
        changeTitle(".panel-title", ".create-pay-section")
        $closePanelBtn.setAttribute("data-section", ".create-pay-section")
    })

    $secondCreatePayBtn.addEventListener("click", e => {
        if (createPay("#create-pay-title", "#create-pay-tel", "#create-pay-amount")){
            dissappearDiv(".create-pay-section")
            appearDiv(".panel-list-pays")
            changeTitle(".panel-title", ".panel-list-pays")
            $closePanelBtn.setAttribute("data-section", ".panel-list-pays")
        }
    })

    $cancelCreatePayBtn.addEventListener("click", e => {
        dissappearDiv(".create-pay-section")
        appearDiv(".panel-list-pays")
        changeTitle(".panel-title", ".panel-list-pays")
        $closePanelBtn.setAttribute("data-section", ".panel-list-pays")
    })


    /*Implementación de la pila*/

    /*const testData = [
        {
            "sender_email": "andres@example.com",
            "receiver_email": "bernardo@example.com",
            "sender_name": "Andrés García",
            "receiver_name": "Bernardo López",
            "amount": 600.50
        },
        {
            "sender_email": "diana@example.com",
            "receiver_email": "carlos@example.com",
            "sender_name": "Diana Martinez",
            "receiver_name": "Carlos Rodriguez",
            "amount": 300.25
        },
        {
            "sender_email": "carlos@example.com",
            "receiver_email": "diana@example.com",
            "sender_name": "Carlos Rodriguez",
            "receiver_name": "Diana Martinez",
            "amount": 543.75
        },
        {
            "sender_email": "andres@example.com",
            "receiver_email": "bernardo@example.com",
            "sender_name": "Andrés García",
            "receiver_name": "Bernardo López",
            "amount": 600.50
        },
        {
            "sender_email": "diana@example.com",
            "receiver_email": "carlos@example.com",
            "sender_name": "Diana Martinez",
            "receiver_name": "Carlos Rodriguez",
            "amount": 300.25
        },
        {
            "sender_email": "carlos@example.com",
            "receiver_email": "diana@example.com",
            "sender_name": "Carlos Rodriguez",
            "receiver_name": "Diana Martinez",
            "amount": 543.75
        }
    ]    

    const pila = new StackArray(30) // El historial guardará hasta 30 registros

    testData.forEach(transaction => {
        pila.push(transaction) // Se van a guardar las 6 transacciones
    });
    
    while(!pila.empty()){
        // Se imprimen las transacciones hasta que no haya ningún elemento en la pila
        let transaction = pila.pop()
        console.log(transaction);
    }*/
})