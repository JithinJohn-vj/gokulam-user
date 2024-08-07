"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';

const PaymentConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const fullName = searchParams.get('fullName');
  const selectedOutlet = searchParams.get('selectedOutlet');
  const selectedTimeSlot = searchParams.get('selectedTimeSlot');
  const items = searchParams.get('items');
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const gstAmount = parseFloat(searchParams.get('gstAmount') || '0');
  const totalPayable = parseFloat(searchParams.get('totalPayable') || '0');
  const parsedItems = items ? JSON.parse(items) : [];
  const orderNumber = Math.floor(Math.random() * 1000000);
  
  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <div className="container mx-auto p-4"> {/* Added mt-4 for spacing below the navbar */}
        {/* Centered box for md screens and above */}
        <div className="md:max-w-2xl md:mx-auto md:bg-white md:shadow-md md:rounded-lg md:p-6">
          <div className="flex justify-center">
            <img src="/takeaway/tick.svg" alt="Tick" className="h-16 w-16" />
          </div>
          <h1 className="text-xl font-bold mt-8 mb-2 text-center text-red-800 ">Thank You for Your Order!</h1>
          <div className="text-center mb-4">
            <p className="font-bold mt-8 text-black text-xl">Order Number: {orderNumber}</p>
          </div>
          <div className='border-b border-gray-200'></div>

          {/* Centered section for name, date, outlet, and time */}
          <div className="flex flex-col mb-4 mt-4">
            <div className="flex justify-between w-full mb-2">
              <span className="text-xs md:text-lg">Name: {fullName}</span>
              <span className="text-xs md:text-lg text-right">Date: {currentDate}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs md:text-lg">Outlet: {selectedOutlet}</span>
              <span className="text-xs md:text-lg text-right">Time: {selectedTimeSlot}</span>
            </div>
          </div>

          <div className='border-b border-gray-200'></div>
          
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="text-left text-[8px] md:text-lg">Item Name</th>
                <th className="px-2 py-1 text-left text-[8px] md:text-lg">Quantity</th>
                <th className="px-2 py-1 text-left text-[8px] md:text-lg">Price</th>
                <th className="px-2 py-1 text-left text-[7px] md:text-lg">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {parsedItems.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-1 text-[8px] md:text-lg flex items-center">
                    <img src={item.item.image} alt={item.item.name} className="h-6 w-6 mr-2" /> {/* Adjust the size as needed */}
                    {item.item.name}
                  </td>
                  <td className="py-1 text-[8px] border-b md:text-lg text-center">{item.quantity}</td>
                  <td className="py-1 text-[8px] border-b md:text-lg">₹{item.item.price.toFixed(2)}</td>
                  <td className="py-1 text-[8px] border-b md:text-lg text-center">
                    ₹{(item.item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <div className="flex justify-between mb-2 text-sm ">
              <span className='md:text-lg '>Total Price:</span>
              <span className='md:text-lg '>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm mt-4">
              <span className='md:text-lg'>GST (18%):</span>
              <span className='md:text-lg'>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className='border-b border-gray-200 mt-4'></div>
            <div className="flex justify-between mt-6">
              <span className="font-bold md:text-lg">Total Amount Paid:</span>
              <span className="font-bold md:text-lg">₹{totalPayable.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
