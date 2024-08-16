"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import { Button } from '@/components/ui/button';
import { useCheckoutData, useDineInData } from '@/api/orders/Mutations';
import { toast } from 'sonner';

const DineInPage: React.FC = () => {

    const DineInMutation = useDineInData()
    const CheckOutDataMutation=useCheckoutData()
    const searchParams = useSearchParams();
    const cartItems = searchParams.get('cartItems');
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [guestCount, setGuestCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const pricePerGuest = 300;

    const totalAmount = guestCount * pricePerGuest; // Total price without GST
    const gstAmount = totalAmount * 0.18; // GST calculation (18%)
    const totalWithGst = totalAmount + gstAmount; // Total amount including GST

    const handleTimeSlotSelect = (slot: string) => {
        setSelectedTimeSlot(slot);
    };

    const incrementGuestCount = () => setGuestCount(guestCount + 1);
    const decrementGuestCount = () => setGuestCount(guestCount > 0 ? guestCount - 1 : 0);

    const handleNextClick = () => {
        // Perform validation
        if (!fullName || !phoneNumber || !selectedOutlet || !selectedTimeSlot || guestCount <= 0) {
            setValidationError('Please fill out all required fields.');
            return;
        }
        const data = {
            name: fullName,
            branch: selectedOutlet,
            order_type: "Dine In",
            // timeslot: "01:00 PM TO 02:00 PM",
            timeslot: selectedTimeSlot,
            count: guestCount,
            net_amount: totalAmount,
        }
        CheckOutDataMutation.mutate(data)
        console.log(data)
        // If validation passes, proceed to open the modal
        // setIsModalOpen(true);
        setValidationError(null); // Clear any previous validation errors
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const [slots, setSlots] = useState([{
        branch: "",
        timeslot: "",
        available_slots: 0
    }])


    // Extract unique outlet names from the slots array
    const uniqueOutlets = [
        "Parivattom",
        "Kadavanthra",
        "Panampilly Nagar",
        "Forum Mall outlet",
    ]



    useEffect(() => {
        if (selectedOutlet && guestCount > 0) {
            // Example API call
            const data = {
                branch: selectedOutlet,
                order_type: "Dine In",
                count: guestCount
            }
            DineInMutation.mutate(data, {
                onSuccess: (m) => {
                    // toast.info(`your test otp is ${m.otp}`)
                    console.log(m)
                    setSlots(m.slots)
                },
                onError: () => {
                    console.log("error")
                },
            });

        }
    }, [selectedOutlet, guestCount]);

    return (
        <div>
            <Navbar />
            <div className="flex container mx-auto p-4 mt-4">
                <div className="flex-grow mr-4">
                    <h1 className="text-xl font-bold mb-4 text-red-800">Reserve Your Table</h1>
                    <p className="mb-4 text-sm text-gray-500">Enter Your Details, Number of Guests, and Select Your Location</p>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-2 mt-4">Personal Information</h2>
                        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                            <div className="flex-1">
                                <label className="block mb-1 text-sm">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="border rounded p-2 md:w-[400px] w-full"
                                />
                                {validationError && !fullName && (
                                    <p className="text-red-600 text-sm mt-1">Full Name is required.</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1 text-sm md:mt-0 mt-4">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border rounded p-2 md:w-[400px] w-full"
                                />
                                {validationError && !phoneNumber && (
                                    <p className="text-red-600 text-sm mt-1">Phone Number is required.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 md:w-[400px]">
                        <h2 className="text-md font-bold mb-2">Select Your Dine-In Outlet</h2>
                        <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an outlet" />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueOutlets.map((outlet, index) => (
                                    <SelectItem key={index} value={outlet}>
                                        {outlet}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {validationError && !selectedOutlet && (
                            <p className="text-red-600 text-sm mt-1">Please select an outlet.</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-md font-bold mb-2">Guest Information</h2>
                        <label className="block mb-1 text-sm">Guest Count</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={guestCount}
                                readOnly
                                className="text-center border rounded p-2 md:w-[400px] w-full pr-16"
                            />
                            <button
                                onClick={incrementGuestCount}
                                className="absolute right-0 md:mr-[500px] top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-800 rounded-md h-[30px] w-[30px] border border-gray-400"
                            >
                                +
                            </button>
                            <button
                                onClick={decrementGuestCount}
                                className="absolute right-10 top-1/2 md:mr-[500px] transform -translate-y-1/2 bg-gray-200 text-gray-800 rounded-md h-[30px] w-[30px] border border-gray-400"
                            >
                                -
                            </button>
                        </div>
                        {validationError && guestCount <= 0 && (
                            <p className="text-red-600 text-sm mt-1">Please add at least one guest.</p>
                        )}
                    </div>

                    <div>
                        {slots[0]?.branch === '' ? '' :
                            <>
                                <h2 className="text-md font-bold mb-2">Available Time Slots</h2>
                                <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-4">
                                    {slots
                                        .filter(slot => slot?.branch === selectedOutlet)
                                        .map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleTimeSlotSelect(slot.timeslot)}
                                                className={`p-2 border md:w-[140px] rounded-lg ${selectedTimeSlot === slot.timeslot ? 'text-white bg-red-800' : 'border border-red-800'}`}
                                            >
                                                {slot.timeslot}
                                            </button>
                                        ))}
                                </div>
                            </>

                        }
                        {validationError && !selectedTimeSlot && (
                            <p className="text-red-600 text-sm mt-1">Please select a time slot.</p>
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


                {/* Reservation Details for Large Screens */}
                <div className="hidden md:block w-1/2 ml-4">
                    <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
                    <div className="flex items-center justify-between my-4">
                        <div className="flex items-center">
                            <img src="/takeaway/paripp.svg" alt="Onam Celebration" className="h-12 w-12 mr-2" />
                            <div>
                                <h3 className="text-sm font-bold">Table Reservation</h3>
                                <p className="text-sm">Total Guests: {guestCount}</p>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-red-800">₹{totalAmount.toFixed(2)}</p>
                    </div>
                    <ul className="mt-4">
                        <li className="border-b border-gray-200 py-2 flex justify-between">
                            <span className="font-semibold">Total Amount:</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </li>
                        <li className="border-b border-gray-200 py-2 flex justify-between">
                            <span className="font-semibold">GST (18%):</span>
                            <span>₹{gstAmount.toFixed(2)}</span>
                        </li>
                        <li className="border-b border-gray-200 py-2 flex justify-between font-bold">
                            <span className="font-semibold">Total Amount with GST:</span>
                            <span>₹{totalWithGst.toFixed(2)}</span>
                        </li>
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleNextClick}
                            className="bg-red-800 text-white w-full py-2 rounded-md mt-4"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>


                {/* Modal for Small Screens */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg">
                            <h2 className="text-lg font-bold mb-4">Reservation Summary</h2>
                            <p>Full Name: {fullName}</p>
                            <p>Phone Number: {phoneNumber}</p>
                            <p>Selected Outlet: {selectedOutlet}</p>
                            <p>Time Slot: {selectedTimeSlot}</p>
                            <p>Total Guests: {guestCount}</p>
                            <p className="font-bold mt-4">Total Amount with GST: ₹{totalWithGst.toFixed(2)}</p>
                            <div className="flex mt-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                                >
                                    Close
                                </button>
                                {/* <Link
                                href={`/reservepayment?fullName=${encodeURIComponent(fullName)}&phoneNumber=${encodeURIComponent(phoneNumber)}&selectedOutlet=${encodeURIComponent(selectedOutlet)}&selectedTimeSlot=${encodeURIComponent(selectedTimeSlot)}&guestCount=${guestCount}&totalWithGst=${totalWithGst}`}
                                className="bg-red-800 text-white px-4 py-2 rounded-md"
                            >
                                Proceed to Payment
                            </Link> */}
                                <button
                                    onClick={handleNextClick}
                                    className="bg-red-800 text-white w-full py-2 rounded-md mt-4"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}



            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Reservation</h2>
                        <p className="mb-4">Total amount to be paid: ₹{totalWithGst.toFixed(2)}</p>
                        <button
                            onClick={closeModal}
                            className="bg-red-800 text-white px-4 py-2 rounded-md"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DineInPage;
