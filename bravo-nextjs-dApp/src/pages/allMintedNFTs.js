import { useState, useEffect } from 'react';
import NftCard from '../components/NFTCard';
import { AllMintedNFTs } from '../utils/fetchNFTs';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from '../components/PrivateRoute';
import { useAccount } from "wagmi";

const bravoContractAddress = process.env.CONTRACT_ADDRESS;

const Explore = () => {

    const { address, isConnected } = useAccount();
    const [NFTs, setNFTs] = useState("")
    const [contractOwner, setContractOwner] = useState("")
    const [contractName, setContractName] = useState("")
    const [deploymentDate, setDeploymentDate] = useState("")

    useEffect(() => {
        async function readNFTs() {
            //const result = await Promise.resolve(42);
            const NFTs = await AllMintedNFTs();

            let i = 1
            //console.log("This is an nft:")
            console.log(NFTs)
            for (let NFT of NFTs) {
                console.log(`${i}. ${NFT['metadata']['description']}`);
                i++;                
            }      

            setNFTs(NFTs);
            setContractOwner(NFTs[0]['contractMetadata']['contractDeployer']);
            setContractName(NFTs[0]['contractMetadata']['name']);
            setDeploymentDate(NFTs[0]['contractMetadata']['openSea']['lastIngestedAt']);
        }

        readNFTs();
    }, []);

    return (
        <PrivateRoute isLoggedIn={isConnected}>
        <div>
            <div className="sticky top-0">
                <Navbar />
            </div>
            
            <div className=' py-12  mb-12 w-full alchemy flex flex-col items-center text-white'>
                <p className='text-5xl  font-bold font-body mb-10 mt-10 text-center'>Explore all minted Bravo! NFTs in our collection</p>
                <div className='bg-blue-950 bg-opacity-60 rounded-xl'>
                    <table>
                        
                        <tr>
                            <td className='px-10 py-3'><span className='font-bold'>Address of the Bravo! NFT contract from<br/> which the collection was generated:</span></td>
                            <td className='px-10 py-3'>{bravoContractAddress}</td>
                        </tr>
                        <tr>
                            <td className='px-10 py-3'><span className='font-bold'>Owner of the contract:</span></td>
                            <td className='px-10 py-3'>{contractOwner}</td>
                        </tr>
                        <tr>
                            <td className='px-10 py-3'><span className='font-bold'>Name of the contract:</span></td>
                            <td className='px-10 py-3'>{contractName}</td>
                        </tr>
                        <tr>
                            <td className='px-10 py-3'><span className='font-bold'>Date of the last transaction:</span></td>
                            <td className='px-10 py-3'>{deploymentDate}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                            <NftCard image={NFT['metadata']['image']} 
                                     id={NFT['id']['tokenId']} 
                                     title={NFT['title']} 
                                     address={NFT['contract']['address']} 
                                     description={NFT['metadata']['description']} 
                                     attributes={NFT['metadata']['attributes']} ></NftCard>
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

export default Explore; 