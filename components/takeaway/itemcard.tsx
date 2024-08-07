import React from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ItemCardProps {
  item: Item;
  quantity: number;
  onQuantityChange: (itemId: number, change: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, quantity, onQuantityChange }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex items-center mt-2 md:w-[700px] md:h-[140px]">
      <img src={item.image} alt={item.name} className="w-16 h-16 md:w-[120px] md:h-[110px] object-cover mr-4 rounded-md" />
      <div className="flex-grow">
        <h2 className="text-[9px] md:text-xl font-bold">{item.name}</h2>
        <p className="text-[7px] md:text-[12px] text-gray-600">{item.description}</p>
        <p className="text-lg font-bold mt-2">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center ml-4 w-[60px] h-[40px] rounded-md bg-red-800">
        <button
          onClick={() => onQuantityChange(item.id, -1)}
          className="p-2 rounded-full text-lg font-bold text-white"
        >
          -
        </button>
        <span className="text-sm text-white">{quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, 1)}
          className="p-2 rounded-full text-lg font-bold text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
