const axios = require('axios');
const address = process.env.CONTRACT_ADDRESS;
const withMetadata = 'true';
const endpoint = process.env.NEXT_APP_ALCHEMY_KEY_GOERLI;
const baseURL = `${endpoint}/getNFTsForCollection`;
const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;

const config = {
    method: 'get',
    url: url,
};

export const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {    
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt+1)
        }
        
        const ownedNfts = data.ownedNfts;

        console.log(ownedNfts)
        setNFTs(ownedNfts)
        return data
    }
}

export const fetchMyNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
    const txHashes = await NFTwithTxHash(window.ethereum.selectedAddress);
    
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchMyNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt+1)
        }
        
        const ownedNfts = data.ownedNfts;
        const NFTs = {children: []};

        for (let i = 0; i < txHashes.length; i++) {
            const updatedObject = {
                ...ownedNfts[i],
                txHash:txHashes[i]
            }

            console.log(updatedObject)

            NFTs.children.push(updatedObject);
        }
        console.log(NFTs.children)

        setNFTs(NFTs.children)
        return data
    }
}

export const AllMintedNFTs = async () => {
    
    // Make the request and print the formatted response:
    return axios(config)
        .then(response => {
            const nfts = response['data']['nfts']
            
            return nfts;
        })
        .catch(error => console.log('error', error));

};

export const NFTwithTxHash = async (toAddress) => {
    const txHashes = [];
    
    let data = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "alchemy_getAssetTransfers",
        "params": [
          {
            "fromBlock": "0x0",
            "fromAddress": "0x0000000000000000000000000000000000000000",
            "toAddress": toAddress,
            "excludeZeroValue":true,
            "category": ["erc721"]
          }
        ]
    });
    console.log(data)
      
    var requestOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: data,
    };
    console.log(requestOptions)
      
    const res = await axios(endpoint, requestOptions);
    console.log(res.data.result.transfers);

    console.log("loop through hashes")
    for (const events of res.data.result.transfers) {
        console.log(events.rawContract.address+" + "+address);

        if (events.rawContract.address == address.toLowerCase()) {
            txHashes.push(`https://goerli.etherscan.io/tx/${events.hash}`);
            console.log("hash was added")
        } else {
            console.log("error");
            continue;            
        }
    }
    
    console.log(txHashes)

    return txHashes; 
}