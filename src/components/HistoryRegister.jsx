import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function HistoryRegister(props) {
  const { senderName, receiverName, date, money } = props;
  const { name } = useContext(UserContext);
  const isSender = (senderName === name);
  const registerName = (isSender) ? receiverName : senderName;

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <figure className={`${(isSender) ? "border-red-600" : "border-green-600"} border-l-4 flex items-center w-full px-6 bg-third rounded-lg py-3 lg:py-2 justify-between lg:bg-thirdDarker`}>
      <div className='flex flex-col gap-1 lg:flex-row lg:items-center'>
        <p className='text-lg font-semibold lg:text-[1.1rem] lg:w-[14vw]'>{registerName}</p>
        <p className='text-sm lg:text-md'>{formattedDate}</p>
      </div>
      <p className={`${(isSender) ? "text-red-600" : "text-green-600"} font-semibold lg:text-lg`}>{`${(isSender) ? "-" : ""}${money}`}</p>
    </figure>
  );
}

export default HistoryRegister;
