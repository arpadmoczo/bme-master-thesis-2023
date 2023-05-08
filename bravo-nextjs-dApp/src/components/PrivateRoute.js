import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMinterCheck } from '../utils/interact';

function PrivateRoute({ children, isLoggedIn }) {
    const router = useRouter();
    const [isMinter, setRole] = useState(null);
  
    useEffect(() => {
     
      async function minterRouting() {
        const minterRoute = await isMinterCheck(window.ethereum.selectedAddress);
        setRole(minterRoute);
      }      
      
      minterRouting();     
     
      if (!isLoggedIn) {
        router.push('/'); // redirect to login page if user is not logged in
      } 

    }, [isLoggedIn]);
  
    if (!isLoggedIn) {
      return null; // don't render anything if user is not logged in
    }
  
    return children; // render children if user is logged in
  }
  
  export default PrivateRoute;