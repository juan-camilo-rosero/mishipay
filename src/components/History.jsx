import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { DBContext } from "../context/DBContext";
import HistoryRegister from "./HistoryRegister";

const loadHistory = async (email, setHistory, getDocumentIfExists, getTransactions) => {
  try {
    const user = await getDocumentIfExists("users", email);
    if (user && user.transactions) {
      const history = await getTransactions(user.transactions);
      setHistory(history);
    } else {
      setHistory([]);
    }
  } catch (error) {
    console.error("Error loading history:", error);
    setHistory([]);
  }
};

function History() {
  const { history, setHistory, email } = useContext(UserContext);
  const { getDocumentIfExists, getTransactions } = useContext(DBContext); // Correct way to access context

  useEffect(() => {
    if (email) {
      loadHistory(email, setHistory, getDocumentIfExists, getTransactions);
    }
  }, [email, setHistory, getDocumentIfExists, getTransactions]);

  return (
    <div className="flex flex-col items-center bg-secondary pb-28 lg:pb-8 lg:bg-third lg:rounded-2xl lg:h-full lg:overflow-y-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-4">Últimas transacciones</h2>
      <div className="mt-4 px-6 flex flex-col items-center gap-4 w-full lg:px-20">
        {history.map((register, index) => (
          <HistoryRegister
            senderName={register.sender}
            receiverName={register.receiver}
            date={register.date}
            money={register.amount}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
