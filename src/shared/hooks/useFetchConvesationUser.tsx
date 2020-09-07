import { useState, useEffect } from 'react';
import UserApi from 'shared/Api/UserApi';
import { ConversationUser } from 'shared/Api/@types';
import { useSelector, useDispatch } from 'react-redux';

type Status = 'idle' | 'fulfilled' | 'pending';

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
): [string, string, null | string] => {
   const [user, setUser] = useState<null | ConversationUser>(null);
   const [error, setError] = useState<null | string>(null);
   const [status, setStatus] = useState<Status>('idle');

   const participants = useSelector(selectParticipants)
   const dispatch = useDispatch();
   useEffect(() => {
      const userFromStore = participants.filter((user) => user.id === id);
      if (userFromStore) {
         setUser(userFromStore.name);
         setError('');
         setStatus('fulfilled');
      } else {
         const userApi = new UserApi();
         setStatus('loading');
         setError(null);
         userApi
            .fetchUserNameById(id)
            .then((result) => {
               const userDetails = {
                  name: result,
                  
               }
               setUser(userDetails);
               dispatch(addUserToParticipants(userDetails))
            })
            .catch((error) => {
               setError('Unable to fetch user name from the server.');
            })
            .finally(() => {
               setStatus('fulfilled');
            });
      }
   }, [dispatch, id, participants]);

   return [user, status, error];
};

export default useFetchUsernameById;
