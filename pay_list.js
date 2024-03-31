import { StaticArray } from "./data_structures.js";
import { appearDiv, dissappearDiv } from "./transitions.js";

const d = document

let array = new StaticArray(15)

export function createArray(pays) {
    const $pays = d.querySelectorAll(pays),
    $payTitles = d.querySelectorAll(`${pays} .pay-title`),
    $payAmounts = d.querySelectorAll(`${pays} .pay-amount`),
    payTels = Array.from(document.querySelectorAll(pays), el => el.getAttribute("data-tel"))

    $pays.forEach(($pay, i) => {
        const dict = {
            title: $payTitles[i].textContent,
            amount: parseInt($payAmounts[i].getAttribute("data-amount")),
            tel: parseInt(payTels[i])
        }

        array.insert(dict)
    });
}

export function activateArrows(upArrows, downArrows, pays) {
    const $upArrows = d.querySelectorAll(upArrows),
    $downArrows = d.querySelectorAll(downArrows)

    $upArrows.forEach(($arrow, i) => {
        $arrow.addEventListener("click", e => {
            const $pays = d.querySelectorAll(pays),
            $payTitles = d.querySelectorAll(`${pays} .pay-title`),
            $payAmounts = d.querySelectorAll(`${pays} .pay-amount`),
            payTels = Array.from(document.querySelectorAll(pays), el => el.getAttribute("data-tel"))
            if (i !== 0){
                array.swap(i, i-1)
                let temp = $payTitles[i].textContent
                $payTitles[i].textContent = $payTitles[i-1].textContent
                $payTitles[i-1].textContent = temp

                temp = $payAmounts[i].textContent
                $payAmounts[i].textContent = $payAmounts[i-1].textContent
                $payAmounts[i-1].textContent = temp

                temp = payTels[i]
                payTels[i] = payTels[i-1]
                payTels[i-1] = temp
                $pays[i].setAttribute("data-tel", payTels[i])
                $pays[i-1].setAttribute("data-tel", payTels[i-1])
            }
        })
    });

    $downArrows.forEach(($arrow, i) => {
        $arrow.addEventListener("click", e => {
            const $pays = d.querySelectorAll(pays),
            $payTitles = d.querySelectorAll(`${pays} .pay-title`),
            $payAmounts = d.querySelectorAll(`${pays} .pay-amount`),
            payTels = Array.from(document.querySelectorAll(pays), el => el.getAttribute("data-tel"))
            if (i !== (array.length - 1)){
                array.swap(i, i+1)
                let temp = $payTitles[i].textContent
                $payTitles[i].textContent = $payTitles[i+1].textContent
                $payTitles[i+1].textContent = temp

                temp = $payAmounts[i].textContent
                $payAmounts[i].textContent = $payAmounts[i+1].textContent
                $payAmounts[i+1].textContent = temp

                temp = payTels[i]
                payTels[i] = payTels[i+1]
                payTels[i+1] = temp
                $pays[i].setAttribute("data-tel", payTels[i])
                $pays[i+1].setAttribute("data-tel", payTels[i+1])
            }
        })
    });
}

function validateCreatePayInputs(title, tel, amount) {
    if (!title || !tel || !amount) {
        alert("Algún input está vacío o es inválido");
        return false; // Si alguno está vacío, retorna falso
    }
    
    // Convertir teléfono a entero
    tel = parseInt(tel);
    // Validar si la conversión fue exitosa
    if (isNaN(tel)) {
        alert("El número de teléfono debe ser un número");
        return false; // Si la conversión falla, retorna falso
    }
    
    // Convertir monto a entero
    amount = parseInt(amount);
    // Validar si la conversión fue exitosa
    if (isNaN(amount)) {
        alert("El monto debe ser un número");
        return false; // Si la conversión falla, retorna falso
    }
    
    // Validar teléfono
    if (!(/^\d{10}$/.test(tel))) {
        alert("El número de teléfono debe tener 10 dígitos");
        return false; // Si el teléfono no tiene 10 dígitos, retorna falso
    }
    
    // Validar título
    if (title.length < 3 || title.length > 15) {
        alert("El nombre debe tener entre 3 y 15 caracteres");
        return false; // Si el título no tiene entre 3 y 15 caracteres, retorna falso
    }
    
    // Validar monto
    if (!Number.isInteger(amount) || amount <= 200 || amount >= 5000000) {
        alert("El monto a enviar debe ser un número entre 200 y 5000000");
        return false; // Si el monto no es un entero mayor a 200 y menor a 5000000, retorna falso
    }
    
    return true; // Si pasa todas las validaciones, retorna verdadero
}

function generatePayDiv(index, data) {
    // Crear un nuevo elemento div
    var div = document.createElement('div');
    // Asignar la clase 'pay-list-pay' al div
    div.classList.add('pay-list-pay');
    // Asignar el atributo data-tel al div
    div.setAttribute('data-tel', data.tel);

    // Crear un nuevo elemento p
    var pIndex = document.createElement('p');
    // Asignar la clase 'pay-list-index' al elemento p
    pIndex.classList.add('pay-list-index');
    // Establecer el texto del elemento p como el índice pasado como parámetro más 1
    pIndex.textContent = (index + 1) + '.';

    // Crear un nuevo elemento figure
    var figure = document.createElement('figure');
    // Asignar la clase 'pay-list-item' al figure
    figure.classList.add('pay-list-item');

    // Crear un nuevo elemento div
    var divLeft = document.createElement('div');
    // Asignar la clase 'pay-list-left' al div
    divLeft.classList.add('pay-list-left');

    // Crear un nuevo elemento div
    var divEditPay = document.createElement('div');
    // Asignar la clase 'edit-pay' al div
    divEditPay.classList.add('edit-pay');

    // Crear un nuevo elemento p
    var pTitle = document.createElement('p');
    // Asignar la clase 'pay-title' al elemento p
    pTitle.classList.add('pay-title');
    // Establecer el texto del elemento p como el título pasado en el objeto
    pTitle.textContent = data.title;

    // Crear un nuevo elemento p
    var pAmount = document.createElement('p');
    // Asignar la clase 'pay-amount' al elemento p
    pAmount.classList.add('pay-amount');
    // Establecer el atributo data-amount al elemento p
    pAmount.setAttribute('data-amount', data.amount);
    // Establecer el texto del elemento p como el monto formateado
    pAmount.textContent = '$' + data.amount.toLocaleString();

    // Añadir divEditPay como hijo de divLeft
    divLeft.appendChild(divEditPay);
    // Añadir pTitle como hijo de divLeft
    divLeft.appendChild(pTitle);

    // Añadir divLeft como hijo de figure
    figure.appendChild(divLeft);
    // Añadir pAmount como hijo de figure
    figure.appendChild(pAmount);

    // Crear un nuevo elemento div
    var divArrows = document.createElement('div');
    // Asignar la clase 'arrows' al div
    divArrows.classList.add('arrows');

    // Crear un nuevo elemento img para la flecha hacia arriba
    var imgUpArrow = document.createElement('img');
    // Establecer el atributo src del elemento img
    imgUpArrow.setAttribute('src', 'assets/arrow.png');
    // Establecer el atributo alt del elemento img
    imgUpArrow.setAttribute('alt', 'Arriba');
    // Asignar la clase 'up-arrow' al elemento img
    imgUpArrow.classList.add('up-arrow');
    // Establecer el atributo data-pay al elemento img
    imgUpArrow.setAttribute('data-pay', index);

    // Crear un nuevo elemento img para la flecha hacia abajo
    var imgDownArrow = document.createElement('img');
    // Establecer el atributo src del elemento img
    imgDownArrow.setAttribute('src', 'assets/arrow.png');
    // Establecer el atributo alt del elemento img
    imgDownArrow.setAttribute('alt', 'Abajo');
    // Asignar la clase 'down-arrow' al elemento img
    imgDownArrow.classList.add('down-arrow');
    // Asignar la clase 'opacity-medium' al elemento img
    imgDownArrow.classList.add('opacity-medium');
    // Establecer el atributo data-pay al elemento img
    imgDownArrow.setAttribute('data-pay', index);

    // Añadir imgUpArrow como hijo de divArrows
    divArrows.appendChild(imgUpArrow);
    // Añadir imgDownArrow como hijo de divArrows
    divArrows.appendChild(imgDownArrow);

    // Añadir pIndex como hijo de div
    div.appendChild(pIndex);
    // Añadir figure como hijo de div
    div.appendChild(figure);
    // Añadir divArrows como hijo de div
    div.appendChild(divArrows);

    // Devolver el fragmento HTML creado
    return div;
}

function activateLastUpArrow(arrow, i, pays) {
    const $arrow = d.querySelectorAll(arrow)[i]

    console.log(arrow);
    console.log(pays);
    console.log(d.querySelectorAll(pays));

    $arrow.addEventListener("click", e => {
        const $pays = d.querySelectorAll(pays),
        $payTitles = d.querySelectorAll(`${pays} .pay-title`),
        $payAmounts = d.querySelectorAll(`${pays} .pay-amount`),
        payTels = Array.from(document.querySelectorAll(pays), el => el.getAttribute("data-tel"))
            if (i !== 0){
                array.swap(i, i-1)
                let temp = $payTitles[i].textContent
                $payTitles[i].textContent = $payTitles[i-1].textContent
                $payTitles[i-1].textContent = temp

                temp = $payAmounts[i].textContent
                $payAmounts[i].textContent = $payAmounts[i-1].textContent
                $payAmounts[i-1].textContent = temp

                temp = payTels[i]
                payTels[i] = payTels[i-1]
                payTels[i-1] = temp
                $pays[i].setAttribute("data-tel", payTels[i])
                $pays[i-1].setAttribute("data-tel", payTels[i-1])
            }
    })
}

export function createPay(btn, title, tel, amount) {
    const $title = d.querySelector(title),
    $tel = d.querySelector(tel),
    $amount = d.querySelector(amount),
    $btn = d.querySelector(btn)

    $btn.addEventListener("click", e => {
        if(array.full()) return alert("El máximo de pagos en la lista es de 15")

        if(!validateCreatePayInputs($title.value, $tel.value, $amount.value)) return

        const pay = {
            title: $title.value,
            amount: parseInt($amount.value),
            tel: parseInt($tel.value)
        }
        array.insert(pay)
        const $parentDiv = d.querySelector(".panel-list-pays"),
        $afterDiv = d.querySelector(".panel-create-pay")

        const $lastArrow = d.querySelectorAll(".down-arrow")[array.length - 2]
        $lastArrow.classList.remove("opacity-medium")
        
        $parentDiv.insertBefore(generatePayDiv(array.length - 1, pay), $afterDiv)
        
        activateLastUpArrow(".up-arrow", array.length - 1, ".pay-list-pay")
        dissappearDiv(".create-pay-section")
        appearDiv(".panel-list-pays")
    })
}