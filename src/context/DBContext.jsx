import { createContext, useState} from "react"
import { db } from "../firebase/firebase.config";
import { collection, doc, getDoc, getDocs, query, setDoc, where, addDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const DBContext = createContext()

async function getDocumentIfExists(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
  
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      return false;
    }
}

const getUserWithTel = async (tel) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("tel", "==", tel));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } else {
    return false;
  }
};

async function getUser(email) {
  const userRef = doc(db, "users", email)
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return { id: userSnapshot.id, ...userSnapshot.data() };
  } else {
    return false;
  }
}

async function createUser(tel, email, name) {
  try {
    const docRef = doc(db, "users", email);
    const userData = {
      money: 0,
      name: name, // Añadir el campo de nombre
      tel: tel, // Añadir el campo de correo electrónico
      paylist: [],
      transactions: [] // Inicializa las transacciones como un arreglo vacío
    };
    await setDoc(docRef, userData);

    return { id: tel, ...userData };
  } catch (error) {
    console.error("Error creating document:", error);
    throw new Error("Error creating document: " + error.message);
  }
}

const getTransactions = async (transactions) => {
  const collectionRef = collection(db, "transactions");
  
  const promises = transactions.map(id => {
    const docRef = doc(collectionRef, id);
    return getDoc(docRef);
  });

  try {
    const snapshots = await Promise.all(promises);
    
    const documents = snapshots
        .filter(snapshot => snapshot.exists())
        .map(snapshot => ({ id: snapshot.id, ...snapshot.data() }));

    return documents;
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw new Error('Error al obtener documentos');
  }
};

const createTransaction = async (amount, sender, receiver, date, senderTel, receiverTel) => {
  try {
    const transactionRef = collection(db, "transactions");
    const transactionData = {
      amount,
      sender,
      receiver,
      date,
      senderTel,
      receiverTel
    };
    const docRef = await addDoc(transactionRef, transactionData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Error creating transaction: " + error.message);
  }
};

const newTransaction = async (sender, receiver, amount, money, name, tel, email) => {
  try {
    const receiverData = await getUserWithTel(receiver);
    console.log(amount);

    if (amount <= 0) {
      alert("La idea es que envíes algo de dinero, no? ._.");
      return;
    }
    
    if (amount > money) {
      alert("No tienes suficiente dinero para hacer esa transacción");
      return;
    }

    if (!receiverData) {
      alert("No existe ningún usuario con el número que ingresaste");
      return;
    }

    const date = new Date().toISOString();
    const transactionId = await createTransaction(amount, name, receiverData.name, date, tel, receiverData.tel);

    // Actualizar el documento del usuario que envía el dinero
    const senderRef = doc(db, "users", email);
    await updateDoc(senderRef, {
      transactions: arrayUnion(transactionId),
      money: money - amount
    });

    // Actualizar el documento del usuario que recibe el dinero
    const receiverRef = doc(db, "users", receiverData.id);
    await updateDoc(receiverRef, {
      transactions: arrayUnion(transactionId),
      money: receiverData.money + amount
    });

  } catch (error) {
    console.error("Error en la transacción:", error);
    alert("Error en la transacción. Por favor, intenta de nuevo.");
  }
};

export function DBContextProvider(props) {
    return (
        <DBContext.Provider value={{
            getDocumentIfExists,
            createUser,
            getUser,
            getTransactions,
            newTransaction,
            getUserWithTel
        }}>
            {props.children}
        </DBContext.Provider>
    )
}