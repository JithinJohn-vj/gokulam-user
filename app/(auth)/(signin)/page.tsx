"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const countryOptions = [
  { code: "+1", flag: "🇺🇸" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+46", flag: "🇸🇪" },
];

const LoginPage: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpExpiry, setOtpExpiry] = useState<number | null>(null); // State for OTP expiry time
  const [errorMessage, setErrorMessage] = useState('');

  const selectedCountry = countryOptions.find(country => country.code === selectedCode);

  // Function to send OTP
  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    setErrorMessage(''); // Clear error message if validation passes

    const expiryTime = Date.now() + 2 * 60 * 1000; // 2 minutes from now
    window.location.href = `/otp-verify?expiry=${expiryTime}`; 
  };

  const handleResendOtp = () => {
    // Logic for resending OTP
    setOtpExpiry(Date.now() + 1 * 60 * 1000); // Reset expiry time
  };

  const getExpiryTimeString = () => {
    if (!otpExpiry) return '';
    const remainingTime = Math.max(0, otpExpiry - Date.now());
    const minutes = Math.floor((remainingTime / 1000) / 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);
    return `(${minutes}:${seconds < 10 ? '0' : ''}${seconds})`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 order-2 md:order-1">
        <div className="w-full max-w-sm mb-10">
          <img src="/logi/logo.svg" alt="Logo" className="h-24 mx-auto" />
        </div>
        <div className="md:mt-8 w-full max-w-sm mt-2">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-start">Get Started</h1>
          <h2 className="text-gray-700 mb-4 text-center md:text-start">Enter Your Phone Number</h2>
          <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile-number">
              Mobile Number
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)} className="md:w-23 px-3 py-1 border-none focus:outline-none focus:ring-0 w-18">
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                className="flex-grow w-full py-3 px-3 text-gray-700 focus:outline-none"
                id="mobile-number"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          </div>
          <button
            className="bg-red-800 text-white font-bold py-3 px-4 rounded w-full"
            type="button"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full relative p-4 md:p-8 order-1 md:order-2 flex flex-col justify-center">
        <img
          src="/logi/background.svg"
          alt="Background"
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8">
          <h2 className="text-white text-3xl md:text-6xl font-bold text-center">Reserve Your Onam</h2>
          <h2 className="text-white text-3xl md:text-6xl font-bold text-center">Sadhya Feast Today!</h2>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
