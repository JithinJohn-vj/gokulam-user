"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import CartSummaryLarge from '../../../components/takeaway/cartsummarylarge';

const CartPage: React.FC = () => {
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const gstAmount = parseFloat(searchParams.get('gstAmount') || '0');
  const totalPayable = parseFloat(searchParams.get('totalPayable') || '0');
  const cartItems = searchParams.get('cartItems');
  const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  return (
    <div>
      <Navbar />
      <div className="flex container mx-auto p-4 mt-4">
        <div className="flex-grow mr-4">
          <h1 className="text-xl font-bold mb-4 text-red-800">Enter Your Details</h1>
          <p className="mb-4 text-sm text-gray-500">Provide Your Information for a Seamless Takeaway Experience</p>

          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2 mt-4">Personal Information</h2>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 md:w-[370px]">
            <h2 className="text-md font-bold mb-2">Select Your Takeaway Outlet</h2>
            <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
              <SelectTrigger>
                <SelectValue placeholder="Select an outlet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mattancheri">Mattancheri</SelectItem>
                <SelectItem value="Paalarivattam">Paalarivattam</SelectItem>
                <SelectItem value="Fort Cochin">Fort Cochin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-md font-bold mb-2">Available Time Slots</h2>
            <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-4">
              <button
                onClick={() => handleTimeSlotSelect('9 AM - 12 PM')}
                className={`p-2 border md:w-[140px] rounded-lg ${selectedTimeSlot === '9 AM - 12 PM' ? 'text-white bg-red-800' : 'border border-red-800'}`}
              >
                9 AM - 12 PM
              </button>
              <button
                onClick={() => handleTimeSlotSelect('1 PM - 5 PM')}
                className={`p-2 border md:w-[140px] rounded-lg ${selectedTimeSlot === '1 PM - 5 PM' ? 'text-white bg-red-800' : 'border border-red-800'}`}
              >
                1 PM - 5 PM
              </button>
            </div>
          </div>

          {/* Hide buttons on large screens */}
          <div className="mt-4 flex justify-between md:hidden">
            <Link
              href="/takeaway"
              className="flex items-center text-gray-800 px-4 py-2 rounded-md"
            >
              <img
                src="/takeaway/back.svg"
                alt="Back"
                className="h-3 w-4 mr-1"
              />
              Back
            </Link>
            <Link
              href={{
                pathname: '/payment',
                query: {
                  fullName,
                  phoneNumber,
                  selectedOutlet,
                  selectedTimeSlot,
                  items: JSON.stringify(parsedCartItems),
                  totalPrice,
                  gstAmount,
                  totalPayable
                },
              }}
              className="bg-red-800 text-white px-4 py-2 rounded-md"
            >
              Next
            </Link>
          </div>
        </div>

        <div className="hidden md:block w-[600px]">
          <CartSummaryLarge
            cart={parsedCartItems}
            totalPrice={totalPrice}
            gstAmount={gstAmount}
            totalPayable={totalPayable}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
