//require('dotenv').config();
const key = process.env.NEXT_APP_PINATA_KEY;
const secret = process.env.NEXT_APP_PINATA_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    //alert(url)
    //alert("Axios request started...")
    try {
    return axios
        .post(url, JSONBody, {
            maxBodyLength: "Infinity",
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            //alert("Response creating started...")
            return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
    } catch (e) {
        alert(e);
    }
};

export const pinFileToIPFS = async(fileImg) => {

    if (fileImg) {
        //alert(key+", "+secret);
        //alert("form data processing started...");
        const formData = new FormData();
        formData.append("file", fileImg);
        //alert("file is appended..."+fileImg);

        //alert(fileImg.name)
        
        //alert("axios post request started");
            var config = {
                method: 'get',
                url: 'https://api.pinata.cloud/data/testAuthentication',
                headers: { 
                    'pinata_api_key': key,
                    'pinata_secret_api_key': secret,
                }
            };
            
            const res = await axios(config)
            
            console.log(res.data);
            //alert(res.data);
            try{
                const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                        maxBodyLength: "Infinity",
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                            pinata_api_key: key,
                            pinata_secret_api_key: secret,
                    }
                });
            //alert("axios post request finished");

            //alert(resFile.data.IpfsHash);
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            //alert(ImgHash);
            
            return ImgHash;

        } catch (error) {
            alert(error);
        }
    }
};