import { useState, useEffect } from 'react';
import UserApi from 'Api/UserApi';


/**
 * A react custom Hook for fetching a username by the userId.
 * 
 * Returns an array containing the `name` string value, the 
 * loading `status` and and if there is an `error`.
 * @param id The user id, of which to retreive the name of.
 * @param initialValue The intial name value, optional.
 */
const useFetchUsernameById = (
   id: number,
   initialValue = ''
): [string, string, null | string] => {
   const [name, setName] = useState(initialValue);
   const [error, setError] = useState<null | string>(null);
   const [status, setStatus] = useState('idle');
   useEffect(() => {
      const userApi = new UserApi();
      setStatus('loading');
      setError(null);
      userApi
         .fetchUserNameById(id)
         .then((result) => {
            setName(result);
         })
         .catch((error) => {
            setError('Unable to fetch user name from the server.');
         })
         .finally(() => {
            setStatus('fulfilled');
         });
   }, [id]);

   return [name, status, error];
};

export default useFetchUsernameById;
