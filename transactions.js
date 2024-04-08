import { getUserInfoTel } from "./account.js";

const d = document

export async function createTransaction(sender_tel, reciever_tel, sender_name, reciever_name, amount) {
    const transaction = {
        sender_tel,
        reciever_tel,
        sender_name,
        reciever_name,
        amount,
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
            alert("Error al hacer la transacción");
            return data;
        }
    } catch (error) {
        console.error('Error de red:', error.message);
        return false
    }
}

export async function pay(user, tel, amount) {
    const $userMoney = d.querySelector(".credit-card-money")
    try {
        const telValue = parseInt(d.querySelector(tel).value),
        amountValue = parseInt(d.querySelector(amount).value),
        otherUser = await getUserInfoTel(telValue)
    
        if(tel === user.tel) return alert("No te puedes enviar dinero a ti mismo")
        await createTransaction(user.tel, telValue, user.name, otherUser.name, amountValue)
    } catch (err) {
        alert("No se pudo realizar la transacción")
    }
}