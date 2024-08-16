// // import { getTokenFromLocalStorage } from "constants/token";
// // import { isValidToken, setSession } from "utils/jwt";


import { axiosAdmin } from '@/lib/axios';
import {
  B_loginCustomer,
  B_profile,
  B_resendOtp,
  B_SignUpAgent,
  B_verifyOtp
} from '@/paths/ShowMeTheWayBackend';

// import { axiosAdmin } from 'src/utils/axios';

// import UserCredentials from 'src/zustand/UserCredentials';
// import {
//   B_getUserInfo,
//   B_loginEmployee,
//   B_logoutEmployee,
//   B_updateAcessToken,
// } from 'src/paths/ShowMeTheWayBackend';




interface SignUpParams {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  company_name: string;
}


//use only these
export const loginCustomer = async ({ phonenumber }: LoginParams) => {
  console.log(phonenumber)
  try {
    const response = await axiosAdmin.post(B_loginCustomer, { phonenumber: phonenumber });
    console.log(response);
    // UserCredentials.setState({ user: response.data });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const resendOtp = async ({ phonenumber }: LoginParams) => {
  console.log(phonenumber)
  try {
    const response = await axiosAdmin.post(B_resendOtp, { phonenumber: phonenumber });
    console.log(response);
    // UserCredentials.setState({ user: response.data });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};


export const verifyOtp = async (data: TOtp) => {
  console.log(data)
  try {
    const response = await axiosAdmin.post(B_verifyOtp, data);
    console.log(response);
    const token = response.data?.Autorization
    if (token) {
      localStorage.setItem("token", token)
    }
    // UserCredentials.setState({ user: response.data });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};










//dont use these




export const SignUpAgent = async (data: SignUpParams) => {
  try {
    const response = await axiosAdmin.post(B_SignUpAgent, data);
    console.log(response);
    // UserCredentials.setState({ user: response.data });
    return response.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export const profileAdmin = async () => {
  try {
    const response = await axiosAdmin.get(B_profile);
    console.log(response);
    // UserCredentials.setState({ user: response.data });
    return response.data.data;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};




// export const refreshToken = async () => {
//   try {
//     const response = await axiosAdmin.get(B_updateAcessToken);
//     UserCredentials.setState({ user: response.data });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log('err', error);
//     throw error;
//   }
// };

// export const loggedInUser = async () => {
//   try {
//     const response = await axiosAdmin.get(B_getUserInfo);
//     console.log(response.data);
//     UserCredentials.setState({ user: response.data });
//     return response.data;
//   } catch (error) {
//     console.log('err', error);
//     throw error;
//   }
// };

// export const logoutUser = async () => {
//   try {
//     const response = await axiosAdmin.post(B_logoutEmployee);
//     return response.data;
//   } catch (error) {
//     console.log('err', error);
//     throw error;
//   }
// };
