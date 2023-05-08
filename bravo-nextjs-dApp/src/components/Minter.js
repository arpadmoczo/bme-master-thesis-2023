import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  isMinterCheck,
  mintNFT,
} from "../utils/interact";

import { useAccount } from "wagmi";

import { pinFileToIPFS } from "../utils/pinata.js";

const Minter = (props) => {
  const [status, setStatus] = useState("");

  const [awardeeAddress, setAwardeeAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [wholeLeadership, setWholeLeadership] = useState("");
  const [globaAcumen, setGlobalAcumen] = useState("");
  const [businessAcumen, setBusinessAcumen] = useState("");
  const [relationship, setReliationship] = useState("");
  const [technicalCapabilities, setTechnicalCapabilities] = useState("");

  const [fileImg, setFileImg] = useState(null);

  const [pinataURL, setPinataURL] = useState("");

  useEffect(() => {
    if(fileImg != null) {console.log(fileImg)}
  }, [fileImg])

  const uploadImg = async (event) => {
    const pinataResponse = await pinFileToIPFS(fileImg);
    console.log(pinataResponse);

    if (!pinataResponse) {
        console.log("😢 Something went wrong while uploading your tokenURI.")
    }
    
    setPinataURL(pinataResponse);
  }

  const onMintPressed = async () => {
    const attributes = [];

    if(wholeLeadership) {attributes.push({"trait_type": "Whole Leadership","value": wholeLeadership});}
    if(globaAcumen) {attributes.push({"trait_type": "Global Acumen","value": globaAcumen});}
    if(businessAcumen) {attributes.push({"trait_type": "Business Acumen","value": businessAcumen});}
    if(relationship) {attributes.push({"trait_type": "Relationship","value": relationship});}
    if(technicalCapabilities) {attributes.push({"trait_type": "Technical Capabilities","value": technicalCapabilities});}

    console.log(attributes);
    
    const { success, status } = await mintNFT(pinataURL, awardeeAddress, name, description, attributes);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
      setAwardeeAddress("");
      setWholeLeadership("");
      setGlobalAcumen("");
      setBusinessAcumen("");
      setReliationship("");
      setTechnicalCapabilities("");
      setPinataURL("");
      setFileImg(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-3">
    
      <p>
        Simply upload your image, then IPFS link will generate automatically, after add name, description, optionally attributes then press "Mint NFT".
      </p><br/>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form encType="multipart/form-data">
            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Upload the Bravo! NFT image to IPFS: </h2> 
            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative">
                <input type="file" 
                      multiple 
                      className="cursor-pointer relative block opacity-0 w-full h-full p-5 z-50"
                      onChange={(event) =>setFileImg(event.target.files[0])}
                      required/>
                <div className="text-center items-center justify-center h-40 p-5 absolute top-0 right-0 left-0 m-auto flex flex-col ">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <label className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Drop images</span> (PNG, JPG) anywhere in the box to upload
                        <br/>or <span className="font-semibold">select file</span>!<br/>
                        <span className="font-semibold text-red-500 text-lg">{fileImg ? fileImg.name : ""}</span>
                    </label>
                </div>
            </div>
            <br/>
        </form>
        {pinataURL!="" ? 
        
        <><div className="flex justify-center items-center">
            <img className="object-fill max-h-60 content-center" src={pinataURL} alt="The image will be displayed if the upload to IPFS was successful!"/>
        </div><br/></>
        
        :
        
        <p className="flex justify-center items-center mb-5">The image will be displayed if the upload to IPFS was successful!</p>
        }            
        <div className="text-center">
            <button id="mintButton" onClick={uploadImg} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Upload to IPFS
            </button>
            <br/>
        </div>
    </div>

    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-blue-700 text-1xl font-bold mb-2">NFT URI:</h2>
        <input
          id="ipfs_hash"
          type="text"
          value={pinataURL}
          className="w-full py-2 px-3 text-gray-500 mb-3 leading-tight"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
          disabled
        />
        <h2 className="block text-blue-700 text-1xl font-bold mb-2">Address of the awardee: </h2>
        <input
          type="text"
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. 0x0000000000000000000000000000000000000000"
          onChange={(event) => setAwardeeAddress(event.target.value)}
        />
        <h2 className="block text-blue-700 text-1xl font-bold mb-2">Name: </h2>
        <input
          type="text"
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2 className="block text-blue-700 text-1xl font-bold mb-2">Description: </h2>
        <textarea
          type="text"
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
        <h2 className="block text-blue-700 text-1xl font-bold mb-2">Attributes: </h2>
        <label className="text-blue-700 text-base" htmlFor="wl">Whole Leadership: </label>
        <input
          id="wl"
          type="text"
          onChange={(event) => setWholeLeadership(event.target.value)}
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Excellent"/>
        <label className="text-blue-700 text-base" htmlFor="ga">Global Acumen: </label>
        <input
          id="ga"
          type="text"
          onChange={(event) => setGlobalAcumen(event.target.value)}
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Outstanding"/>
        <label className="text-blue-700 text-base" htmlFor="ba">Business Acumen: </label>
        <input
          id="ba"
          type="text"
          onChange={(event) => setBusinessAcumen(event.target.value)}
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Next Elon Musk"/>
        <label className="text-blue-700 text-base" htmlFor="rel">Relationship: </label>
        <input
          id="rel"
          type="text"
          onChange={(event) => setReliationship(event.target.value)}
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Client-friendly"/>
        <label className="text-blue-700 text-base" htmlFor="tc">Technical Capabilities: </label>
        <input
          id="tc"
          type="text"
          onChange={(event) => setTechnicalCapabilities(event.target.value)}
          className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Exemplary"/>
      </form>
           
      <div className="text-center">
        <button id="mintButton" onClick={onMintPressed} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Mint NFT
        </button>
      </div>
            
    </div>

      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
