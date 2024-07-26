import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import HistoryRegister from "./HistoryRegister";

function History() {
  const { history } = useContext(UserContext);
  console.log("Rendering History with:", history); // Verifica los datos

  return (
    <div className="flex flex-col items-center bg-secondary pb-28 lg:pb-8 lg:bg-third lg:rounded-2xl lg:h-full lg:overflow-y-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-4">Últimas transacciones</h2>
      <div className="mt-4 px-6 flex flex-col items-center gap-4 w-full lg:px-20">
        {history.map((register, index) => (
          <HistoryRegister
            senderName={register.senderName}
            receiverName={register.receiverName}
            date={register.date}
            money={register.money}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
