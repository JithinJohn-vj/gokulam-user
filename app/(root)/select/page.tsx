import React from 'react';
import Link from 'next/link';

const OptionSelect: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-800 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mb-6 md:mb-8">
        <img src="/logi/logtrans.svg" alt="Logo" className="h-24 md:h-32 lg:h-40" />
      </div>
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 text-center">
        Choose Your Onam Sadhya Experience
      </h1>
      <div className="flex flex-wrap justify-center items-center w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <Link href="/dinein">
          <button className="w-full sm:w-[300px] md:w-[350px] p-4 flex flex-col items-center text-white border border-gray-400 m-4 rounded-lg bg-transparent transition-transform transform hover:bg-white hover:text-red-800">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300">Dine-In</h2>
            <p className="text-white text-center text-sm sm:text-base md:text-lg transition-colors duration-300">
              Enjoy your traditional feast in our beautifully decorated dining area.
            </p>
          </button>
        </Link>

        <Link href="/takeaway">
          <button className="w-full sm:w-[300px] md:w-[350px] p-4 flex flex-col items-center text-white border border-gray-400 m-4 rounded-lg bg-transparent transition-transform transform hover:bg-white hover:text-red-800">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300">Takeaway</h2>
            <p className="text-white text-center text-sm sm:text-base md:text-lg transition-colors duration-300">
              Enjoy Onam Sadhya at home with our convenient takeaway option.
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OptionSelect;
