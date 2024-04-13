import { getUserInfoTel } from "./account.js";
import { StackArray } from "./data_structures.js";
import { showError } from "./transitions.js";

const d = document,
transationsStack = new StackArray(50)

export async function createTransaction(sender_tel, reciever_tel, sender_name, reciever_name, amount, date) {
    const transaction = {
        sender_tel,
        reciever_tel,
        sender_name,
        reciever_name,
        amount,
        date
    },
    url = `https://mishipay-api-rest.onrender.com/transactions`; // URL para conectar con la API REST

    try {

        // Petición a la API REST

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        const data = await response.json();

        if (response.ok) {
            // Si el usuario se crea exitosamente
            return data;
        } else {
            // Hubo un error en la creación del usuario
            showError("Error al hacer la transacción");
            return data;
        }
    } catch (error) {
        console.error('Error de red:', error.message);
        return false
    }
}

function getCurrentDateTimeString() {
    const currentDate = new Date();

    // Obteniendo el día, mes y año
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    // Obteniendo la hora, minutos y formato AM/PM
    let hour = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const ampm = hour >= 12 ? 'p.m' : 'a.m';
    hour = hour % 12;
    hour = hour ? hour : 12; // Hora '0' debería ser '12' en formato de 12 horas

    // Construyendo la cadena de fecha y hora
    const dateTimeString = `${day}/${month}/${year} - ${hour}:${minutes} ${ampm}`;
    
    return dateTimeString;
}

export async function pay(user, tel, amount) {
    const $userMoney = d.querySelector(".credit-card-money")
    try {
        const telValue = parseInt(d.querySelector(tel).value),
        amountValue = parseInt(d.querySelector(amount).value),
        otherUser = await getUserInfoTel(telValue)
    
        if(tel === user.tel) return showError("No te puedes enviar dinero a ti mismo")
        const transaction = await createTransaction(user.tel, telValue, user.name, otherUser.name, amountValue, getCurrentDateTimeString())
        d.querySelector(".transactions").insertAdjacentHTML('afterbegin', createTransactionHTML(transaction, user));
    } catch (err) {
        showError("No se pudo realizar la transacción")
    }
}


function createTransactionHTML(transaction, user) {
    const {
        sender_tel,
        reciever_tel,
        sender_name,
        reciever_name,
        amount,
        date
    } = transaction,
    currentUserTel = user.tel

    const isCurrentUserSender = sender_tel === currentUserTel;
    const isCurrentUserReciever = reciever_tel === currentUserTel;
    console.log(isCurrentUserSender);

    const transactionClass = isCurrentUserSender ? 'red' : 'green';
    const transactionSign = isCurrentUserSender ? '-' : '+';
    const transactionName = isCurrentUserSender ? reciever_name : sender_name;

    console.log(transactionName);

    const html = `
        <figure class="transaction">
            <div class="transaction-status bg-${transactionClass}"></div>
            <div class="transaction-info">
                <p class="transaction-name">${transactionName}</p>
                <p class="transaction-date">${date}</p>
            </div>
            <div class="transaction-money">
                <p class="transaction-amount ${transactionClass}">${transactionSign} ${amount}</p>
            </div>
        </figure>
    `;

    return html;
}

export async function getTransaction(id) {
    const url = `https://mishipay-api-rest.onrender.com/transactions/${id}`; // URL para conectar con la API REST

  try {

    // Petición a la API REST

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      const data = await response.json();

      if (response.ok) {
          // Si la transacción se obtuvo exitosamente
          return data;
      } else {
          // Hubo un error al obtener la transacción
          showError("Error al obtener la transacción");
          return false;
      }
  } catch (error) {
      console.error('Error de red:', error.message);
      return false
  }
}

export async function createTransactionsHTML(transactions, user) {
    const $history = d.querySelector(".transactions")
    const promises = transactions.map(async id => {
        return await getTransaction(id);
    });

    const results = await Promise.all(promises);
    results.forEach(transaction => {
        transationsStack.push(transaction);
    });

    while(!transationsStack.empty()){
        const $transaction = createTransactionHTML(transationsStack.pop(), user)
        $history.innerHTML += $transaction
    }
}