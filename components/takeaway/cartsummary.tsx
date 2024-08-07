import React from 'react';
import Link from 'next/link';

interface CartSummaryProps {
  cart: { item: any; quantity: number }[];
  totalPrice: number;
  gstAmount: number;
  totalPayable: number;
  onClose: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  totalPrice,
  gstAmount,
  totalPayable,
  onClose,
}) => {
  // Calculate total item count
  const totalItemCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full h-3/4 p-4 rounded-t-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Summary ({totalItemCount})</h2>
          <button className="text-red-800 font-bold text-xl" onClick={onClose}>✕</button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ul>
            {cart.map((cartItem, index) => (
              <li key={index} className="border-b border-gray-200 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={cartItem.item.image} alt={cartItem.item.name} className="w-12 h-12 object-cover mr-2 rounded-md" />
                  <div className="flex-grow text-sm">
                    <p className="font-bold text-[14px]">{cartItem.item.name}</p>
                    <p className="text-gray-600">x {cartItem.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[12px]">₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-[12px] mt-4">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[12px] ">
              <span>GST (18%):</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className='border-b border-gray-200 '></div>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Total Payable:</span>
          <span>₹{totalPayable.toFixed(2)}</span>
        </div>
        <div className="sticky bottom-0 bg-white p-2">
          <Link
            href={{
              pathname: '/cartpage',
              query: {
                totalPrice,
                gstAmount,
                totalPayable,
                cartItems: JSON.stringify(cart),
              },
            }}
          >
            <button className="bg-red-800 text-white px-4 py-2 rounded-md w-full">
              Confirm Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
