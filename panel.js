import { deleteUser, deleteUserInDB, getUserInfo, validateSessionIdToken } from "./account.js";
import { StackArray } from "./data_structures.js";
import { activateArrows, createArray, createPay } from "./pay_list.js";
import { createTransactionsHTML, getTransaction, pay } from "./transactions.js";
import { appearDiv, changeScreen, changeTitle, closeAlert, dissappearDiv, showError, showSuccess } from "./transitions.js";

const d = document,
ls = localStorage,
$payListBtn = d.querySelector(".pay-list-btn"),
$closePanelBtn = d.querySelector(".pay-list .panel-div-close"),
$createPayBtn = d.querySelector(".create-pay-btn"),
$secondCreatePayBtn = d.querySelector(".create-pay"),
$cancelCreatePayBtn = d.querySelector(".cancel-create-pay"),
$newTransactionBtn = d.querySelector(".pay-btn"),
$closeNewTransactionBtn = d.querySelector(".transaction-div-close"),
$userName = d.querySelector(".user-name"),
$userMoney = d.querySelector(".credit-card-money"),
$payBtn = d.querySelector(".transaction-btn"),
$profile = d.querySelector(".profile-div"),
$logoutBtn = d.querySelector(".logout"),
$deleteAccount = d.querySelector(".delete-account")

let userInfo = {},
profileOpen = false

d.addEventListener("DOMContentLoaded", e => {

    // Validar si existe un token guardado en el navegador. Si existe, se inicia sesión

    const idToken = ls.getItem("id-token"),
    session = validateSessionIdToken(idToken).then(async user => {
        if(!user) {
            location.href = "https://mishipay.vercel.app/index.html" // Se redirige a la landing page
        }
        const email = user.users[0].email,
        info = await getUserInfo(email),
        name = info.name,
        money = info.money
        $userName.textContent = name
        $userMoney.textContent = '$' + money.toLocaleString()
        userInfo = info
        createTransactionsHTML(userInfo.transactions, userInfo)
    })
    

    // Generalidades

    closeAlert()
    
    $payListBtn.addEventListener("click", e => {
        appearDiv(".pay-list")
        appearDiv(".panel-list-pays")
        dissappearDiv(".transaction-div")
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

    $newTransactionBtn.addEventListener("click", e => {
        appearDiv(".transaction-div")
    })

    $closeNewTransactionBtn.addEventListener("click", e => {
        dissappearDiv(".transaction-div")
    })

    $payBtn.addEventListener("click", async e =>{
        const res = await pay(userInfo, "#transaction-tel", "#transaction-amount")
        console.log(res);
        if(!res.ok) return
        let email = userInfo.email
        userInfo = await getUserInfo(email)
        $userMoney.textContent = '$' + userInfo.money.toLocaleString()
        showSuccess("Transacción exitosa")
        dissappearDiv(".transaction-div")
        appearDiv(".history")
    })

    $profile.addEventListener("click", e => {
        if(profileOpen){
            dissappearDiv(".profile-options")
            profileOpen = false
        } else{
            appearDiv(".profile-options")
            profileOpen = true
        }
    })

    $logoutBtn.addEventListener("click", e => {
        ls.removeItem("id-token")
        location.href = "https://mishipay.vercel.app/"
    })

    $deleteAccount.addEventListener("click", async e => {
        const email = userInfo.email
        if(confirm("Desea eliminar el usuario con el email " + email + "?")){
            await deleteUser(email, idToken)
            await deleteUserInDB(email)
            ls.removeItem("id-token")
            location.href = "https://mishipay.vercel.app/"
        }
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