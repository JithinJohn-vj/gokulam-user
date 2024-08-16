"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import CartSummaryLarge from '../../../components/takeaway/cartsummarylarge';
import { useCheckoutData, useDineInData } from '@/api/orders/Mutations';

const CartPage: React.FC = () => {
  const DineInMutation = useDineInData();
  const CheckOutDataMutation = useCheckoutData();
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const gstAmount = parseFloat(searchParams.get('gstAmount') || '0');
  const totalPayable = parseFloat(searchParams.get('totalPayable') || '0');
  const cartItems = searchParams.get('cartItems');
  const parsedCartItems: any = cartItems ? JSON.parse(cartItems) : [];

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // State for individual error messages
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [outletError, setOutletError] = useState<string | null>(null);
  const [timeSlotError, setTimeSlotError] = useState<string | null>(null);

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    setTimeSlotError(null);
  };

  const [slots, setSlots] = useState([{
    branch: "",
    timeslot: "",
    available_slots: 0
  }]);

  useEffect(() => {
    if (selectedOutlet) {
      const data = {
        branch: selectedOutlet,
        order_type: "Takeaway",
      };
      DineInMutation.mutate(data, {
        onSuccess: (m) => {
          console.log(m);
          setSlots(m.slots);
        },
        onError: () => {
          console.log("error");
        },
      });
    }
  }, [selectedOutlet]);

  const totalItemCount: any = parsedCartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  const handleNextClick = () => {
    // Validate all fields again before proceeding
    let isValid = true;

    if (!fullName) {
      setFullNameError("Full Name is required.");
      isValid = false;
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required.");
      isValid = false;
    }

    if (!selectedOutlet) {
      setOutletError("Please select an outlet.");
      isValid = false;
    }

    if (!selectedTimeSlot) {
      setTimeSlotError("Please select a time slot.");
      isValid = false;
    }
    
    // const data={
    //   name: fullName,
    //   items:parsedCartItems,
    //   // items: [
    //   //     {
    //   //         menu_id: 1,
    //   //         name: "5 Pack",
    //   //         price: 224,
    //   //         quantity: 201
    //   //     },
    //   //     {
    //   //         menu_id: 2,
    //   //         name: "2 Pack",
    //   //         price: 24,
    //   //         quantity: 100
    //   //     },
    //   //     {
    //   //         menu_id: 3,
    //   //         name: "1 Litre Pallada Payasam",
    //   //         price: 24,
    //   //         quantity: 3
    //   //     }
    //   // ],

    //   branch: selectedOutlet,
    //   order_type: "Takeaway",
    //   timeslot: selectedTimeSlot,
    //   net_amount: totalPayable
    // }

    const transformedItems:any = parsedCartItems.map(({ item, quantity }) => ({
      menu_id: item.id,
      name: item.name,
      price: item.price,
      quantity
    }));
    

    const data={
      name: fullName,
      items:transformedItems,
      // items: [
      //     {
      //         menu_id: 1,
      //         name: "5 Pack",
      //         price: 224,
      //         quantity: 201
      //     },
      //     {
      //         menu_id: 2,
      //         name: "2 Pack",
      //         price: 24,
      //         quantity: 100
      //     },
      //     {
      //         menu_id: 3,
      //         name: "1 Litre Pallada Payasam",
      //         price: 24,
      //         quantity: 3
      //     }
      // ],

      branch: selectedOutlet,
      order_type: "Takeaway",
      timeslot: selectedTimeSlot,
      net_amount: totalPayable
    }
    console.log(data)
    
  
  


    if (isValid) {
      CheckOutDataMutation.mutate(data)
      // Navigate to the payment page with the provided data
      // window.location.href = `/payment?fullName=${fullName}&phoneNumber=${phoneNumber}&selectedOutlet=${selectedOutlet}&selectedTimeSlot=${selectedTimeSlot}&items=${encodeURIComponent(JSON.stringify(parsedCartItems))}&totalPrice=${totalPrice}&gstAmount=${gstAmount}&totalPayable=${totalPayable}`;
    }
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
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (e.target.value) {
                      setFullNameError(null);
                    } else {
                      setFullNameError("Full Name is required.");
                    }
                  }}
                  className="border rounded p-2 w-full"
                />
                {fullNameError && (
                  <div className="text-red-600 text-sm mt-1">
                    {fullNameError}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (e.target.value) {
                      setPhoneNumberError(null);
                    } else {
                      setPhoneNumberError("Phone Number is required.");
                    }
                  }}
                  className="border rounded p-2 w-full"
                />
                {phoneNumberError && (
                  <div className="text-red-600 text-sm mt-1">
                    {phoneNumberError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 md:w-[370px]">
            <h2 className="text-md font-bold mb-2">Select Your Takeaway Outlet</h2>
            <Select value={selectedOutlet} onValueChange={(value) => {
              setSelectedOutlet(value);
              if (value) {
                setOutletError(null);
              } else {
                setOutletError("Please select an outlet.");
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select an outlet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mattancheri">Mattancheri</SelectItem>
                <SelectItem value="Paalarivattam">Paalarivattam</SelectItem>
                <SelectItem value="Fort Cochin">Fort Cochin</SelectItem>
              </SelectContent>
            </Select>
            {outletError && (
              <div className="text-red-600 text-sm mt-1">
                {outletError}
              </div>
            )}
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
            {timeSlotError && (
              <div className="text-red-600 text-sm mt-1">
                {timeSlotError}
              </div>
            )}
          </div>

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
            <button
              onClick={handleNextClick}
              className="bg-red-800 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>

        <div className="hidden md:block w-[600px]">
          <div className="bg-gray-100 w-full p-4 shadow-lg">
            <h2 className="text-xl font-bold">Order Summary ({totalItemCount})</h2>
            <ul>
              {parsedCartItems.map((cartItem, index) => (
                <li key={index} className="border-b border-gray-200 py-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={cartItem.item.image} alt={cartItem.item.name} className="w-12 h-12 object-cover mr-2 rounded-md" />
                    <div className="flex-grow text-sm">
                      <p className="font-bold text-[14px]">{cartItem.item.name}</p>
                      <p className="text-gray-600">x {cartItem.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">₹{cartItem.item.price}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4 border-t border-gray-300 pt-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-gray-700">GST (18%)</span>
              <span className="font-bold">₹{gstAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-lg font-bold text-red-800">Total Payable</span>
              <span className="text-lg font-bold text-red-800">₹{totalPayable.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNextClick}
              className="bg-red-800 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
