import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine, RiPencilFill } from "react-icons/ri";

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

const initialPayments = [
  {
    name: "Arriendo local",
    amount: 1200000
  },
  {
    name: "Inventario",
    amount: 750000
  },
  {
    name: "Impuestos",
    amount: 645000
  },
];

function PayList() {
  const [dynamicPayments, setDynamicPayments] = useState(new DynamicArray(initialPayments.length));
  const [paymentsArray, setPaymentsArray] = useState([]);

  useEffect(() => {
    const paymentArray = new DynamicArray(initialPayments.length);
    initialPayments.forEach(payment => paymentArray.insert(payment));
    setDynamicPayments(paymentArray);
    setPaymentsArray([...paymentArray.array.slice(0, paymentArray.length)]);
  }, []);

  const swapItems = (index1, index2) => {
    dynamicPayments.swap(index1, index2);
    setPaymentsArray([...dynamicPayments.array.slice(0, dynamicPayments.length)]);
  };

  return (
    <div className="flex flex-col items-center bg-secondary pb-28 lg:pb-8 lg:bg-third lg:rounded-2xl lg:h-full lg:overflow-y-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-4 lg:mt-8">Lista de pagos</h2>
      <div className='w-full my-10 flex flex-col items-center gap-6 lg:my-4 lg:gap-3'>
        {paymentsArray.map((pay, index) => (
          <div key={index} className='flex flex-row w-full items-center'>
            <p className='w-1/6 text-center text-lg font-bold'>{index}.</p>
            <figure className='flex flex-row w-2/3 bg-black bg-opacity-5 items-center gap-3 p-2 md:p-4 md:rounded-xl rounded-lg lg:py-2'>
              <div className='w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                <RiPencilFill className='text-xl text-secondary'/>
              </div>
              <div className=''>
                <p className='text-[1.1rem] font-semibold'>{pay.name}</p>
                <p className='text-sm font-semibold text-primary'>{pay.amount.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                })}
                </p>
              </div>
            </figure>
            <div className='w-1/6 flex flex-col items-center justify-center h-full'>
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
      </div>
    </div>
  );
}

export default PayList;
