import { pinJSONToIPFS } from "../utils/pinata.js";
require("dotenv").config();
const alchemyKey = process.env.NEXT_APP_ALCHEMY_KEY_GOERLI;
const contractABI = require("../contract-abi.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

async function loadContract() {
  return new web3.eth.Contract(contractABI, contractAddress);
}

export const isMinterCheck = async (addressCheck) => { 
  const BNFT = await new web3.eth.Contract(contractABI, contractAddress);
  const isMinter = await BNFT.methods.isMinter(addressCheck).call();

  return isMinter;
}

export const mintNFT = async (url, awardeeAddress, name, description, attributes) => {
  if (url.trim() == "" || awardeeAddress.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;
  metadata.attributes = attributes;

  console.log(metadata);
  //alert(window.ethereum.selectedAddress);
  //alert("Creating json file...");

  const pinataResponse = await pinJSONToIPFS(metadata);
  //alert(pinataResponse);
  if (pinataResponse == null) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //alert("Setting transaction parameters...");
  //alert(awardeeAddress+" + "+window.ethereum.selectedAddress);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .safeMint(awardeeAddress, tokenURI)
      .encodeABI(),
  };

  //alert("Sending request...");
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        alert("✅ Mint was succesfull!Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
        txHash),
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
