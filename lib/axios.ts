// import axios from 'axios';

// // config
// import { AGENT_API } from './config';

// // ----------------------------------------------------------------------

// const axiosAdmin = axios.create({
//   // withCredentials: true,
//   baseURL: AGENT_API
// });

// axiosAdmin.interceptors.response.use(
//   (response) => response,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || 'Something went wrong'
//     )
// );

// export { axiosAdmin };
import axios from 'axios';

// config
import { AGENT_API } from './config';

// ----------------------------------------------------------------------

const axiosAdmin = axios.create({
  baseURL: AGENT_API,
});

// Request interceptor to add the token to the headers
axiosAdmin.interceptors.request.use(
  (config) => {
    console.log('Request Config:', config);
    if (
      !config?.url?.includes('/login') &&
      !config?.url?.includes('/sign-in')
    ) {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      console.log(token)
      // If the token exists, add it to the request headers
      if (token) {
        config.headers.Authorization =token;
      }
    }
console.log(config)
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosAdmin.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export { axiosAdmin };
