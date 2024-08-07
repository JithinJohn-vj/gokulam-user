"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';

const DineInPage: React.FC = () => {
    const searchParams = useSearchParams();
    const cartItems = searchParams.get('cartItems');
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [guestCount, setGuestCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="border rounded p-2 md:w-[400px] w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1 text-sm md:mt-0 mt-4">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border rounded p-2 md:w-[400px] w-full"
                                />
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
                                <SelectItem value="Outlet 1">Mattancheri</SelectItem>
                                <SelectItem value="Outlet 2">Paalarivattam</SelectItem>
                                <SelectItem value="Outlet 3">Fort Cochin</SelectItem>
                            </SelectContent>
                        </Select>
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
                        <Link
                            href={`/reservepayment?fullName=${encodeURIComponent(fullName)}&phoneNumber=${encodeURIComponent(phoneNumber)}&selectedOutlet=${encodeURIComponent(selectedOutlet)}&selectedTimeSlot=${encodeURIComponent(selectedTimeSlot || '')}&guestCount=${guestCount}&totalAmount=${totalAmount.toFixed(2)}&gstAmount=${gstAmount.toFixed(2)}&totalPayable=${totalWithGst.toFixed(2)}`}
                            onClick={closeModal}
                            className="bg-red-800 text-white rounded-md text-center py-2 w-full"
                        >
                            Confirm Payment
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal for Reservation Details - Only for Mobile Screens */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-end justify-center z-50 bg-black bg-opacity-50 md:hidden">
                    <div className="bg-white rounded-t-lg p-6 max-w-lg w-full h-[60%] relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Reservation Details</h2>
                            <button onClick={closeModal} className="text-gray-800 hover:text-red-800 focus:outline-none">
                                <img src="/takeaway/close.svg" alt="close" className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between my-4">
                            <div className="flex items-center justify-between my-4">
                                <div className="flex items-center">
                                    <img src="/takeaway/paripp.svg" alt="Onam Celebration" className="h-12 w-12 mr-2" />
                                    <div>
                                        <h3 className="text-[14px] font-bold">Table Reservation</h3>
                                        <p className="text-xs">Guests: {guestCount}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-blaxk ml-8">₹{totalAmount.toFixed(2)}</p>
                            </div>
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
                            <Link
                                href={`/reservepayment?fullName=${encodeURIComponent(fullName)}&phoneNumber=${encodeURIComponent(phoneNumber)}&selectedOutlet=${encodeURIComponent(selectedOutlet)}&selectedTimeSlot=${encodeURIComponent(selectedTimeSlot || '')}&guestCount=${guestCount}&totalAmount=${totalAmount.toFixed(2)}&gstAmount=${gstAmount.toFixed(2)}&totalPayable=${totalWithGst.toFixed(2)}`}
                                onClick={closeModal}
                                className="bg-red-800 text-white rounded-md text-center py-3 px-16"
                            >
                                Confirm Payment
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DineInPage;
