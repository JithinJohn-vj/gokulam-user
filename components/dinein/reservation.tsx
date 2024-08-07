import React from 'react';
import Link from 'next/link';

interface ReservationDetailsModalProps {
    isOpen: boolean;
    fullName: string;
    selectedOutlet: string;
    guestCount: number;
    onClose: () => void;
    isLargeScreen?: boolean;
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
    isOpen,
    fullName,
    selectedOutlet,
    guestCount,
    onClose,
    isLargeScreen = false,
}) => {
    if (!isOpen && !isLargeScreen) return null;

    const pricePerPerson = 300; // Amount for one person
    const totalAmount = guestCount * pricePerPerson;
    const gstAmount = totalAmount * 0.18; // 18% GST
    const totalPayable = totalAmount + gstAmount;

    return (
        <div
            className={`${
                isLargeScreen ? 'w-full md:w-1/2' : 'fixed inset-0 flex items-end justify-center bg-black bg-opacity-50'
            }`}
        >
            <div className={`bg-white ${isLargeScreen ? 'w-full h-auto p-4 rounded-lg shadow-lg' : 'w-full h-1/2 p-4 rounded-t-lg shadow-lg'}`}>
                <h2 className="text-xl font-bold">Reservation Details</h2>
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center">
                        <img src="/takeaway/paripp.svg" alt="Onam Celebration" className="h-12 w-12 mr-2" />
                        <div>
                            <h3 className="text-sm font-bold">Table Reservation</h3>
                            <p className="text-sm">Total Guests: {guestCount}</p>
                        </div>
                    </div>
                    <p className="text-lg font-bold text-red-800">₹{totalPayable.toFixed(2)}</p>
                </div>
                <ul className="mt-4 flex-grow">
                    <li className="border-b border-gray-200 py-2 flex justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </li>
                    <li className="border-b border-gray-200 py-2 flex justify-between">
                        <span className="font-semibold">GST (18%):</span>
                        <span>₹{gstAmount.toFixed(2)}</span>
                    </li>
                </ul>
                <div className="mt-4">
                    <Link
                        href={`/reservepayment?fullName=${encodeURIComponent(fullName)}&selectedOutlet=${encodeURIComponent(selectedOutlet)}&guestCount=${guestCount}&totalAmount=${totalAmount}&gstAmount=${gstAmount}&totalPayable=${totalPayable}&imageUrl=${encodeURIComponent('/takeaway/paripp.svg')}`}
                        className="bg-red-800 text-white px-4 py-2 rounded-md block text-center"
                    >
                        Confirm Reservation
                    </Link>
                </div>
            </div>
            {!isLargeScreen && (
                <button onClick={onClose} className="absolute top-0 right-0 m-4 text-white text-xl">×</button>
            )}
        </div>
    );
};

export default ReservationDetailsModal;
