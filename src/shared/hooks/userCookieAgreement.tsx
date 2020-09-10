import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * A react hook to retrieve users cookie agreement information.
 *
 * Returns a null or boolean value to indicate whether to display
 * the notice, and a function to agree to the cookies - updating state.
 */
const useCookieAgreement = (): [null | boolean, () => void] => {
   const [displayNotice, setDisplayNotice] = useState<null | boolean>(null);
   useEffect(() => {
      const cookieAgreement = Cookies.get('accept_cookies');
      if (cookieAgreement && cookieAgreement === 'true') {
         setDisplayNotice(false);
      } else {
         setDisplayNotice(true);
      }
   }, []);

   const allowCookies = () => {
      setDisplayNotice(false);
      Cookies.set('accept_cookies', 'true', { expires: 2030 });
   };

   return [displayNotice, allowCookies];
};

export default useCookieAgreement;
