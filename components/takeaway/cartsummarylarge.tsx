import React from 'react';
import Link from 'next/link';

interface CartSummaryLargeProps {
  cart: { item: any; quantity: number }[];
  totalPrice: number;
  gstAmount: number;
  totalPayable: number;
  currentPage: string; // Add this prop to indicate the current page
}

const CartSummaryLarge: React.FC<CartSummaryLargeProps> = ({
  cart,
  totalPrice,
  gstAmount,
  totalPayable,
  currentPage,
}) => {
  const totalItemCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  return (
    <div className="bg-gray-100 w-full p-4 shadow-lg">
      <h2 className="text-xl font-bold">Order Summary ({totalItemCount})</h2>
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
      <div className="border-b border-gray-200"></div>
      <div className="flex justify-between text-sm font-bold">
        <span>Total Payable:</span>
        <span>₹{totalPayable.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        {currentPage === 'takeaway' ? (
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
        ) : (
          <Link
            href={{
              pathname: '/payment',
              query: {
                totalPrice,
                gstAmount,
                totalPayable,
                cartItems: JSON.stringify(cart),
              },
            }}
          >
            <button className="bg-red-800 text-white px-4 py-2 rounded-md w-full">
              Next
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSummaryLarge;
