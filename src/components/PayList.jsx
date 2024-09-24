import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine, RiPencilFill, RiFilter2Fill } from "react-icons/ri";

class StaticArray {
  constructor(size) {
    this.array = new Array(size);
    this.size = size;
    this.length = 0;
  }

  empty() {
    return this.length === 0;
  }

  full() {
    return this.length === this.size;
  }

  insert(item) {
    if (this.full()) throw new Error("Array is full");
    this.array[this.length] = item;
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) throw new Error("Index out of bounds");
    for (let i = index; i < this.length - 1; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.length--;
  }

  get(index) {
    if (index < 0 || index >= this.length) throw new Error("Index out of bounds");
    return this.array[index];
  }

  set(index, item) {
    if (index < 0 || index >= this.length) throw new Error("Index out of bounds");
    this.array[index] = item;
  }

  swap(index1, index2) {
    if (index1 < 0 || index1 >= this.length || index2 < 0 || index2 >= this.length) throw new Error("Index out of bounds");
    const temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }
}

class DynamicArray extends StaticArray {
  constructor(initialSize = 4) {
    super(initialSize);
  }

  insert(item) {
    if (this.length === this.size) {
      this._resize(this.size * 2);
    }
    super.insert(item);
  }

  remove(index) {
    super.remove(index);
    if (this.length > 0 && this.length === this.size / 4) {
      this._resize(this.size / 2);
    }
  }

  _resize(newSize) {
    const newArray = new Array(newSize);
    for (let i = 0; i < this.length; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
    this.size = newSize;
  }
}

function PayList() {
  const [paymentsArray, setPaymentsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePayment, setShowCreatePayment] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [type, setType] = useState('gasto_fijo');
  const [editIndex, setEditIndex] = useState(null);
  const [filterType, setFilterType] = useState('todos'); // Estado para el filtro

  useEffect(() => {
    const storedPayments = localStorage.getItem('payments');
    if (storedPayments) {
      setPaymentsArray(JSON.parse(storedPayments));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (paymentsArray.length > 0) {
      localStorage.setItem('payments', JSON.stringify(paymentsArray));
    }
  }, [paymentsArray]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    const payment = paymentsArray[index];
    setName(payment.name);
    setAmount(payment.amount);
    setFormattedAmount(payment.amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }));
    setType(payment.type);
    setShowCreatePayment(true);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    setFormattedAmount(Number(value).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }));
  };

  const handleDelete = () => {
    if (editIndex !== null) {
      const updatedPayments = paymentsArray.filter((_, index) => index !== editIndex);
      setPaymentsArray(updatedPayments);
      setEditIndex(null);
      setShowCreatePayment(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPayment = { name, amount: Number(amount), type };

    if (editIndex !== null) {
      const updatedPayments = [...paymentsArray];
      updatedPayments[editIndex] = newPayment;
      setPaymentsArray(updatedPayments);
      setEditIndex(null);
    } else {
      setPaymentsArray([...paymentsArray, newPayment]);
    }

    setName('');
    setAmount('');
    setFormattedAmount('');
    setType('gasto_fijo');
    setShowCreatePayment(false);
  };

  const swapItems = (index1, index2) => {
    const updatedPayments = [...paymentsArray];
    const temp = updatedPayments[index1];
    updatedPayments[index1] = updatedPayments[index2];
    updatedPayments[index2] = temp;
    setPaymentsArray(updatedPayments);
  };

  // Filtrar los pagos según el tipo seleccionado en el filtro
  const filteredPayments = filterType === 'todos'
    ? paymentsArray
    : paymentsArray.filter(payment => payment.type === filterType);

  return (
    <div className="w-full my-10 flex flex-col items-center gap-6 lg:my-4 lg:gap-3 overflow-y-auto h-[42vh]">
      <div className="w-full h-[42vh] overflow-y-scroll px-4 py-2">
        <div className='w-full flex items-center justify-center mb-4'>
          <figure className='py-2 flex items-center justify-between rounded-lg w-2/3'>
            {/* Filtro */}
            <select
              className='w-full outline-none border-opacity-50 text-black rounded-lg bg-third py-3 px-4 text-lg transition-all focus:border-opacity-100 mb-3'
              onChange={(e) => setFilterType(e.target.value)} // Actualizar el estado del filtro
              value={filterType}
            >
              <option value="todos">Ver todos</option>
              <option value="gasto_fijo">Gastos fijos</option>
              <option value="gasto_variable">Gastos variables</option>
              <option value="gasto_innecesario">Gastos innecesarios</option>
            </select>
          </figure>
        </div>
        {filteredPayments.map((pay, index) => (
          <div key={index} className="flex flex-row w-full items-center mb-2">
            <p className="w-1/6 text-center text-lg font-bold">{index + 1}.</p>
            <figure className="flex flex-row w-2/3 bg-black bg-opacity-5 items-center gap-3 p-2 md:p-4 md:rounded-xl rounded-lg lg:py-2">
              <div
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                onClick={() => handleEditClick(index)}
              >
                <RiPencilFill className="text-xl text-secondary" />
              </div>
              <div className="">
                <p className="text-[1.1rem] font-semibold">{pay.name}</p>
                <p className="text-sm font-semibold text-primary">
                  {pay.amount.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                  })}
                </p>
              </div>
            </figure>
            <div className="w-1/6 flex flex-col items-center justify-center h-full">
              <RiArrowUpSLine
                className={`text-4xl text-primary ${index === 0 ? "opacity-50" : "opacity-100 cursor-pointer"}`}
                onClick={() => index > 0 && swapItems(index, index - 1)}
              />
              <RiArrowDownSLine
                className={`text-4xl text-primary ${index === paymentsArray.length - 1 ? "opacity-50" : "opacity-100 cursor-pointer"}`}
                onClick={() => index < paymentsArray.length - 1 && swapItems(index, index + 1)}
              />
            </div>
          </div>
        ))}
        <div className='w-full flex items-center justify-center'>
          <button onClick={() => setShowCreatePayment(true)} className='w-2/3 md:w-1/4 lg:w-2/3 mt-2 py-2 px-4 bg-primary text-secondary font-semibold text-center rounded-lg text-lg'>Crear pago</button>
        </div>
      </div>

      {showCreatePayment && (
        <div className="absolute w-full h-full px-8 bg-secondary z-40 rounded-2xl flex-col items-center pb-28 lg:pb-8 lg:bg-third lg:h-[45vh] lg:overflow-y-auto lg:w-[34vw] flex">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 py-6 lg:py-0 md:w-1/2 lg:w-3/4">
            <h2 className="text-2xl font-semibold mt-4 mb-4 lg:mt-8">{editIndex !== null ? 'Editar Pago' : 'Crear Pago'}</h2>
            <label className="text-lg font-semibold">Nombre</label>
            <input
              type="text"
              placeholder="Arriendo Local"
              className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg transition-all focus:border-opacity-100 mb-4"
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <label className="text-lg font-semibold">Valor</label>
            <input
              type="text"
              placeholder="$0.00"
              className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg transition-all focus:border-opacity-100 mb-3"
              onChange={handleAmountChange}
              value={formattedAmount}
            />
            <label className="text-lg font-semibold">Categoría</label>
            <select
              className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-2 px-4 text-lg transition-all focus:border-opacity-100 mb-3"
              onChange={e => setType(e.target.value)}
              value={type}
            >
              <option value="gasto_fijo">Gasto fijo</option>
              <option value="gasto_variable">Gasto variable</option>
              <option value="gasto_innecesario">Gasto innecesario</option>
            </select>
            <button type="submit" className="w-full rounded-lg bg-primary text-secondary py-2 text-xl font-semibold transition-all">
              {editIndex !== null ? 'Guardar cambios' : 'Crear pago'}
            </button>
            {editIndex !== null && (
              <button onClick={handleDelete} className="w-full rounded-lg bg-red-500 text-secondary py-2 text-xl font-semibold transition-all mt-2">
                Eliminar
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}


export default PayList;
