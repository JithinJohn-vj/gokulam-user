
import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginCustomer, resendOtp, SignUpAgent, verifyOtp } from './Services';
import { toDashboard, toOtpVerify, toSignIn } from '@/paths/ShowMeTheWayFrontend';



export function useLoginCustomer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginParams) => loginCustomer(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('OTP sent. Check your phone.');
        // const expiryTime = Date.now() + 2 * 60 * 1000; // 2 minutes from now
        // router.push(`/otp-verify?expiry=${expiryTime}`)
        await queryClient.invalidateQueries({ queryKey: ['getAgent'] });
      }
    }
  });
}

export function useResendOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginParams) => resendOtp(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('OTP resent. Check your phone');
        // const expiryTime = Date.now() + 2 * 60 * 1000; // 2 minutes from now
        // router.push(`/otp-verify?expiry=${expiryTime}`)
        await queryClient.invalidateQueries({ queryKey: ['getAgent'] });
      }
    }
  });
}

export function useVerifyOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TOtp) => verifyOtp(data),
    onMutate: () => {
      console.log('mutate');
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.success('OTP Verified');
        router.push(`/select`)
        await queryClient.invalidateQueries({ queryKey: ['getAgent'] });
      }
    }
  });
}
// export function useSignUpAdmin() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: SignUpParams) => SignUpAgent(data),
//     onSettled: async (_, error) => {
//       if (error) {
//         console.log(error);
//         toast.error(error.message);
//       } else {
//         toast.success('Registration successfull');
//         router.push(toSignIn);
//         await queryClient.invalidateQueries({ queryKey: ['getAgent'] });
//       }
//     }
//   });
// }

// export function useLogoutEmployees() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => logoutUser(),
//     onMutate: () => {
//       console.log('mutate');
//     },
//     onSettled: async (_, error) => {
//       if (error) {
//         console.log(error);
//         toast.error(error.message);
//       } else {
//         toast.success('Logout success');
//         router.push(toLogin);
//         await queryClient.invalidateQueries({ queryKey: ['getEmployees'] });
//       }
//     },
//   });
// }
