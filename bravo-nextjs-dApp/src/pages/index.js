import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { isMinterCheck } from "../utils/interact";

export default function HomePage() {
  
  const router = useRouter();  
  const { address, isConnected } = useAccount();
  const [isMinter, setRole] = useState(null);

  useEffect(() => {
    
    async function minterRouting() {
      const minterRoute = await isMinterCheck(window.ethereum.selectedAddress);
      setRole(minterRoute);
    }
    
    minterRouting();

    if (isConnected) {
      router.push('/nftAdminAndMinter')
      if (!isMinter) {
        router.push('/nftExplorer'); // redirect to nftExplorer page if user has not minter role
      } else {
        router.push('/nftAdminAndMinter');
      }     
    }

  }, [isConnected]);

  return (
    
    <div className="flex h-screen justify-center items-center home-bg-img">
      <div className="bg-blue-200 shadow-md rounded pb-8 mb-4 w-2/4 text-center align-middle">
        <div className="flex bg-blue-950 shadow-md pt-2 w-full justify-center items-center">
          <img className="block h-20 w-auto" src="https://gateway.pinata.cloud/ipfs/QmQipMU6MftjKA1dcDnnfBNyvBnCriHHbt9daP2si6UHWz"/>        
        </div>
        <h1 className="block text-blue-900 text-3xl font-bold mb-2 mt-10">Welcome to the Bravo! NFT minter application!</h1>
        <h3 className="block text-blue-900 text-2xl mb-2">Please connect to your wallet directly...</h3><br/>
        {/* Predefined button  */}
        <Web3Button icon="show" label="Connect Wallet" balance="show" />
        <br /><br />

        <h3 className="block text-blue-900 text-2xl mb-2">...or select the blockchain network!</h3><br />
        {/* Network Switcher Button */}
        <Web3NetworkSwitch />
        <br />
      </div>
    </div>      

  );
}
