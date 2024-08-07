import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-start bg-white shadow-md border-b p-4">
      <div className="flex items-center md:ml-8"> 
        <img src="/logi/logo.svg" alt="Logo" className="h-12" /> {/* Adjust height as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
