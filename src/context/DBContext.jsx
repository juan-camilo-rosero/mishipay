import { createContext, useState} from "react"
import { db } from "../firebase/firebase.config";
import { collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";

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

async function getUser(tel) {
  const userRef = doc(db, "users", tel)
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return { id: userSnapshot.id, ...userSnapshot.data() };
  } else {
    return false;
  }
}

async function createUser(tel) {
    try {
      const docRef = doc(db, "users", tel);
      const userData = {
        money: 0,
        name: null,
        paylist: [],
        transactions: []
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

const newTransaction = async (sender, receiver, amount) => {
  console.log(receiver);
  const receiverData = await getUser(receiver)
  if(!receiverData) console.log("No existe ningún usuario con el número que ingresaste");
  else console.log(receiverData);
}

export function DBContextProvider(props) {
    return (
        <DBContext.Provider value={{
            getDocumentIfExists,
            createUser,
            getUser,
            getTransactions,
            newTransaction
        }}>
            {props.children}
        </DBContext.Provider>
    )
}