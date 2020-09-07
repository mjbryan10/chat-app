import { useState, useEffect } from 'react';
import UserApi from 'shared/Api/UserApi';

type Status = 'idle' | 'fulfilled' | 'pending';

/**
 * A react custom Hook for fetching a username by the userId.
 *
 * Returns an array containing the `name` string value, the
 * loading `status` and and if there is an `error`.
 * @param id The user id, of which to retreive the name of.
 * @param initialValue The intial name value, optional.
 */
const useFetchUsernameById = (id: number): [string, string, null | string] => {
   const [user, setUser] = useState<string>('');
   const [error, setError] = useState<string>('');
   const [status, setStatus] = useState<Status>('idle');

   useEffect(() => {
      if (id) {
         const userApi = new UserApi();
         setStatus('pending');
         setError('');
         userApi
            .fetchUserNameById(id)
            .then((result) => {
               setUser(result);
            })
            .catch(() => {
               setError('Unable to fetch user name from the server.');
            })
            .finally(() => {
               setStatus('fulfilled');
            });
      }
   }, [id]);

   return [user, status, error];
};

export default useFetchUsernameById;
