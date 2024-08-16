import { useQuery } from '@tanstack/react-query';
import { profileAdmin } from './Services';

// import { loggedInUser, refreshToken } from './Services';

// export function useGetRefreshToken() {
//   return useQuery({
//     queryKey: ['refreshToken'],
//     queryFn: () => refreshToken(),
//   });
// }

export function useGetProfileAdmin() {
  return useQuery({
    queryKey: ['loggedInUser'],
    queryFn: () => profileAdmin()
  });
}
