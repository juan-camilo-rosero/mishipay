import { useContext, useState } from "react";
import { DBContext } from "../context/DBContext";
import { UserContext } from "../context/UserContext";

function Send() {
  const [amount, setAmount] = useState(undefined);
  const [tel, setTel] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { newTransaction, getDocumentIfExists, getTransactions } = useContext(DBContext);
  const { number, name, money, email, setMoney, setHistory } = useContext(UserContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if(!amount || !tel) {
      alert("Te falla? 🧠")
      return
    }

    setLoading(true);

    const res = await newTransaction(number, tel, amount, money, name, tel, email);
    if (res) {
      setMoney(money - amount);
    }

    const user = await getDocumentIfExists("users", email);
    const history = await getTransactions(user.transactions);
    setHistory(history);

    setAmount('');  // Limpiar input de monto
    setTel('');     // Limpiar input de teléfono
    e.target.reset(); // Limpiar inputs del formulario

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center bg-secondary pb-28 lg:pb-8 lg:bg-third lg:rounded-2xl lg:h-full lg:overflow-y-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-4 lg:hidden">Realizar pago</h2>
      <form onSubmit={handleSend} className="flex flex-col w-full px-6 mt-8 gap-4 lg:gap-2 lg:px-14 lg:mt-6 lg:w-4/5">
        <label className="text-lg lg:text-[1rem] font-semibold">¿Cuánto dinero?</label>
        <input 
          type="text" 
          placeholder="$0.00" 
          className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0" 
          onChange={e => {
              const value = e.target.value;
              const numberValue = parseInt(value.replace(/[^0-9]/g, ''), 10);

              if (!isNaN(numberValue)) {
                const formattedValue = numberValue.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                });
                e.target.value = formattedValue;
                setAmount(numberValue);
              } else {
                e.target.value = '';
                setAmount('');
              }
            }}
        />
        <label className="text-lg lg:text-[1rem] font-semibold lg:mt-2">Número del que recibe</label>
        <input 
          type="tel"
          placeholder="311 123 4567"
          className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-8 lg:mb-6" 
          onChange={e => {
            const value = e.target.value;
            const cleanedValue = value.replace(/\D/g, '');

            if (cleanedValue.length <= 10) {
              const formattedValue = cleanedValue.replace(/(\d{3})(\d{3})(\d{0,4})/, (match, p1, p2, p3) => {
                if (p3) {
                  return `${p1} ${p2} ${p3}`;
                } else if (p2) {
                  return `${p1} ${p2}`;
                } else if (p1) {
                  return p1;
                }
                return '';
              });
              e.target.value = formattedValue;
              setTel(cleanedValue);
            }
          }}
        />

        <button type="submit" className={`w-full rounded-lg bg-primary text-secondary hover:bg-primaryDarker py-2 text-xl lg:text-lg font-semibold transition-all focus:border-opacity-100 ${loading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"}`}>{loading ? "Enviando..." : "Enviar"}</button>
      </form>
    </div>
  );
}

export default Send;
