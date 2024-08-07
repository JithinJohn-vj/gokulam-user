"use client"; 

import { useState, useEffect } from 'react';
import ItemCard from '../../../components/takeaway/itemcard';
import CartSummary from '../../../components/takeaway/cartsummary';
import CartSummaryLarge from '../../../components/takeaway/cartsummarylarge';
import Navbar from '@/components/navbar';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const TakeawayPage: React.FC = () => {
  const items: Item[] = [
    { id: 1, name: 'Sadhya (5 People)', description: 'Celebrate Onam with our exquisite Sadhya meal, thoughtfully curated to serve five people.', price: 1500, image: '/takeaway/paripp.svg' },
    { id: 2, name: 'Sadhya (2 People)', description: 'Celebrate Onam with our exquisite Sadhya meal, thoughtfully curated to serve two people.', price: 800, image: '/takeaway/paripp.svg' },
    { id: 3, name: 'Paalaada Payasam (1 Litre)', description: 'A rich and creamy dessert made with tender rice ada, milk, and sugar, perfect for festive celebrations.', price: 1500, image: '/takeaway/palada.svg' },
    { id: 4, name: 'Parippu Payasam (1 Litre)', description: 'A traditional Kerala dessert made with moong dal, jaggery, and coconut milk, offering a sweet and delightful taste.', price: 1500, image: '/takeaway/sadhya.svg' },
  ];

  const GST_RATE = 0.18; 

  const [cart, setCart] = useState<{ item: Item; quantity: number }[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuantityChange = (itemId: number, change: number) => {
    setQuantities(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity < 0) return prev; 
      return { ...prev, [itemId]: newQuantity };
    });
  };

  useEffect(() => {
    const updatedCart = items.map(item => {
      const quantity = quantities[item.id] || 0;
      return { item, quantity };
    }).filter(cartItem => cartItem.quantity > 0);
    setCart(updatedCart);
  }, [quantities]);

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

  const totalPrice = cart.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);
  const gstAmount = totalPrice * GST_RATE;
  const totalPayable = totalPrice + gstAmount;

  return (
    <div className="flex ">
      <div className="flex-grow">
        <Navbar /> 
        <div className='md:flex justify-around md:ml-6'>
        <div className="container mx-auto p-4 mt-4">
          <h1 className="text-xl font-bold mb-4 text-red-800">Select Your Takeaway Items</h1>
          <p className="text-[10px] mb-4 text-gray-400">Choose Your Favorite Onam Specials to Enjoy at Home</p>
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                quantity={quantities[item.id] || 0}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center md:hidden">
            <p className="font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
            <button className="bg-red-800 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(true)}>
              Next
            </button>
          </div>
          {isModalOpen && (
            <CartSummary
              cart={cart}
              totalPrice={totalPrice}
              gstAmount={gstAmount}
              totalPayable={totalPayable}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
        <div className="hidden lg:block w-[900px] mr-8 mt-[100px]">
        <CartSummaryLarge
          cart={cart}
          totalPrice={totalPrice}
          gstAmount={gstAmount}
          totalPayable={totalPayable}
        />
      </div>
      </div>
      </div>
    
    </div>
  );
};

export default TakeawayPage;
