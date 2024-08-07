"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';

const PaymentConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams();
  
  // Use local state to avoid direct usage of searchParams for rendering
  const [params, setParams] = useState({
    fullName: '',
    selectedOutlet: '',
    selectedTimeSlot: '',
    items: [],
    totalAmount: 0,
    gstAmount: 0,
    totalPayable: 0,
  });

  useEffect(() => {
    // Set params when component mounts
    const fullName = searchParams.get('fullName') || '';
    const selectedOutlet = searchParams.get('selectedOutlet') || '';
    const selectedTimeSlot = searchParams.get('selectedTimeSlot') || '';
    const items = searchParams.get('items') || '';
    const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
    const gstAmount = parseFloat(searchParams.get('gstAmount') || '0');
    const totalPayable = parseFloat(searchParams.get('totalPayable') || '0');
    
    const parsedItems = items ? JSON.parse(items) : [];
    
    setParams({
      fullName,
      selectedOutlet,
      selectedTimeSlot,
      items: parsedItems,
      totalAmount,
      gstAmount,
      totalPayable,
    });
  }, [searchParams]);

  const { fullName, selectedOutlet, selectedTimeSlot, items, totalAmount, gstAmount, totalPayable } = params;

  // Calculate total guests
  const totalGuests = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Generate order number and date
  const orderNumber = Math.floor(Math.random() * 1000000);
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="md:max-w-2xl md:mx-auto md:bg-white md:shadow-md md:rounded-lg md:p-6">
          <div className="flex justify-center">
            <img src="/takeaway/tick.svg" alt="Tick" className="h-16 w-16" />
          </div>
          <h1 className="text-xl font-bold mt-4 mb-2 text-center text-red-800">Thank You for Your Order!</h1>
          <div className="text-center mb-4">
            <p className="font-bold mt-4 text-black text-xl">Order Number: {orderNumber}</p>
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

          {/* Table Reservation Section */}
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="flex items-center">
              <img src="/takeaway/paripp.svg" alt="Onam Celebration" className="h-12 w-12 mr-2" />
              <div>
                <h3 className="text-sm font-bold">Table Reservation</h3>
                <p className="text-sm">Guests: {totalGuests}</p> {/* Ensure totalGuests is displayed */}
              </div>
            </div>
            <p className="text-lg font-bold text-black">₹{totalPayable.toFixed(2)}</p>
          </div>

          <div className='border-b border-gray-200'></div>

          <div className="mt-4 text-right">
            <div className="flex justify-between mb-2 text-sm ">
              <span className='md:text-lg'>Total Price:</span>
              <span className='md:text-lg'>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm mt-4">
              <span className='md:text-lg'>GST (18%):</span>
              <span className='md:text-lg'>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className='border-b border-gray-200'></div>
            <div className="flex justify-between mt-4 font-bold mb-2 text-sm">
              <span className='md:text-lg'>Total Payable:</span>
              <span className='md:text-lg'>₹{totalPayable.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
