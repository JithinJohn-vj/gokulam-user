"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLoginCustomer, useResendOtp, useVerifyOtp } from '@/api/auth/Mutations';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const countryOptions = [
  { code: "+1", flag: "🇺🇸" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+46", flag: "🇸🇪" },
];

const LoginPage: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLoginCustomer();
  const resendOtpMutation = useResendOtp()
  const verifyOtp=useVerifyOtp()

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

  const handleVerifyOtp = () => {
    const OtpData = otp.join('')
    const data={
        phonenumber: Number(phoneNumber),
        otp: OtpData
      }
      verifyOtp.mutate(data)
    }
    // router.push('/select');
  

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


  const [selectedCode, setSelectedCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpExpiry, setOtpExpiry] = useState<number | null>(null); // State for OTP expiry time
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const selectedCountry = countryOptions.find(country => country.code === selectedCode);

  const handleResendOtp = () => {
    const data = {
      phonenumber: Number(phoneNumber),
    };
    console.log(data)
    resendOtpMutation.mutate(data, {
      onSuccess: (m) => {
        toast.info(`your test otp is ${m.otp}`)
        setShowOtpField(true); // Show the OTP field on success
        const newExpiryTime = Date.now() + 2 * 60 * 1000;
        setExpiryTime(newExpiryTime);
      },
      onError: () => {
        setErrorMessage('Failed to resend OTP. Please try again.');
      },
    });
    setCanResend(false);
    const newExpiryTime = Date.now() + 2 * 60 * 1000;
    setExpiryTime(newExpiryTime);
  };

  // Function to send OTP
  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    setErrorMessage(''); // Clear error message if validation passes

    const data = {
      phonenumber: Number(phoneNumber),
    };

    loginMutation.mutate(data, {
      onSuccess: (m) => {
        console.log(m)
        toast.info(`your test otp is ${m.otp}`)
        setShowOtpField(true); // Show the OTP field on success
        const newExpiryTime = Date.now() + 2 * 60 * 1000;
        setExpiryTime(newExpiryTime);
      },
      onError: () => {
        setErrorMessage('Failed to send OTP. Please try again.');
      },
    });
  };

  return (
    <>
      {!showOtpField ?
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
        </div> :
        <div className="flex flex-col md:flex-row h-screen">
          <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 order-2 md:order-1">
            <div className="w-full max-w-sm ">
              <div className="md:flex justify-start flex justify-center mb-10 ">
                <img src="/logi/logo.svg" alt="Logo" className="h-24" />
              </div>
              <div className="md:mt-8 mt-2">
                <h1 className="text-2xl font-bold mb-6 text-center md:text-start">Verification Code</h1>
                <h2 className="text-gray-700 mb-4 text-center md:text-start md:text-md text-sm">You need to enter the 6-digit code we sent to <b>{phoneNumber}</b> .</h2>
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
                  onClick={() => handleVerifyOtp()}
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
                    Resend
                  </button>
                </div>
                <p className="text-gray-500 text-xs text-center mt-4">You can request a new code in {remainingTime} minutes.</p>
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
              <h2 className="text-white text-3xl md:text-6xl font-bold text-center">Reserve Your Onam</h2>
              <h2 className="text-white text-3xl md:text-6xl font-bold text-center">Sadhya Feast Today!</h2>

            </div>
          </div>
        </div>}
    </>
  );
};

export default LoginPage;
