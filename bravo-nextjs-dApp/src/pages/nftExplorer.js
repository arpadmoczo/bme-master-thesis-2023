import { useState } from 'react';
import NftCard from '../components/NFTCard';
import { fetchNFTs, fetchMyNFTs } from '../utils/fetchNFTs';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from '../components/PrivateRoute';
import { useAccount } from "wagmi";

const bravoContractAddress = process.env.CONTRACT_ADDRESS;

const Explore = () => {

    const { address, isConnected } = useAccount();
    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    

    return (
        <PrivateRoute isLoggedIn={isConnected}>
        <div>
            <div className="sticky top-0">
                <Navbar />
            </div>
            <header className=' py-24  mb-12 w-full alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Bravo! NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner</p>
                    </div>
                    <div className='mb-16 w-2/6 flex justify-center'>
                        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full' 
                                onClick={() => {fetchMyNFTs(window.ethereum.selectedAddress, bravoContractAddress, setNFTs    )}}>My Bravo! NFTs</button>
                    </div>
                    <p className='text-white text-center'>Or...</p><br/>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" 
                               value={owner} 
                               onChange={(e) => setOwner(e.target.value)} 
                               placeholder='Insert your wallet address'></input>
                        <input className="focus:outline-none rounded-sm py-2 px-3 w-full" 
                               value={contractAddress} 
                               onChange={(e) => setContractAddress(e.target.value)} 
                               placeholder='Insert NFT Contract address (optional)'></input>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full' onClick={() => {fetchNFTs(owner, contractAddress, setNFTs    )}}>Search by address and contracts</button>
                    </div>
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {                   
                   NFTs ? NFTs.map(NFT => {
                        
                        return (
                           <NftCard image={NFT.media[0].gateway} 
                                    id={NFT.id.tokenId } 
                                    title={NFT.title} 
                                    address={NFT.contract.address} 
                                    description={NFT.description} 
                                    attributes={NFT.metadata.attributes}
                                    txHash={NFT.txHash} >
                            </NftCard>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
            <div>
                <Footer />
            </div>
        </div>
        </PrivateRoute>
    )
}


export default Explore