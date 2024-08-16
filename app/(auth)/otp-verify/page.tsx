"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OTPVerificationPage: React.FC = () => {
  const router=useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [expiryTime, setExpiryTime] = useState<number | null>(null); 
  const [remainingTime, setRemainingTime] = useState<string>(''); 
  const [canResend, setCanResend] = useState<boolean>(false); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const expiryParam = urlParams.get('expiry');
    if (expiryParam) {
      setExpiryTime(Number(expiryParam));
    }
  }, []);

  const handleVerifyOtp=()=>{
    console.log(otp.join(''))
    
    router.push('/select')
  }

  useEffect(() => {
    if (expiryTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, expiryTime - now);
        const minutes = Math.floor((timeLeft / 1000) / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        if (timeLeft <= 0) {
          clearInterval(interval);
          setCanResend(true); 
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [expiryTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    console.log("OTP resent!");

    setCanResend(false); 
    const newExpiryTime = Date.now() + 2 * 60 * 1000;
    setExpiryTime(newExpiryTime);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 order-2 md:order-1">
        <div className="w-full max-w-sm ">
          <div className="md:flex justify-start flex justify-center mb-10 ">
            <img src="/logi/logo.svg" alt="Logo" className="h-24" />
          </div>
          <div className="md:mt-8 mt-2">
            <h1 className="text-2xl font-bold mb-6 text-center md:text-start">Verification Code</h1>
            <h2 className="text-gray-700 mb-4 text-center md:text-start md:text-md text-sm">You need to enter the 6-digit code we sent to your phone number.</h2>
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  className="border border-gray-300 bg-gray-200 rounded w-8 h-8 md:w-12 md:h-12 text-center text-xl text-gray-700 focus:outline-none"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <button
            onClick={()=>handleVerifyOtp()}
              className="bg-red-800 text-white font-bold py-3 px-4 rounded w-full"
              type="button"
            >
              Verify OTP
            </button>
            <div className="mt-4 text-end md:text-[14px] text-[10px] ">
              <span className="text-gray-700 md:text-[14px] text-[10px]">Didn't get the code yet? </span>
              <button 
                className={`text-red-800 font-bold ${canResend ? '' : 'opacity-50 cursor-not-allowed'}`} 
                onClick={canResend ? handleResendOtp : undefined}
                disabled={!canResend} 
              >
                Resend {remainingTime ? `(${remainingTime})` : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full relative p-4 md:p-8 order-1 md:order-2 flex flex-col justify-center">
        <img
          src="/logi/background.svg"
          alt="Background"
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8">
          <h2 className="text-white text-3xl md:text-5xl font-bold text-center">Reserve Your Onam</h2>
          <h2 className="text-white text-3xl md:text-5xl font-bold text-center">Sadhya Feast Today!</h2>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
