const NftCard = ({ image, id, title, address, description, attributes, txHash }) => {
    return (
        <div className="flex flex-col w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <img className='w-full rounded-t-md' key={id} src={image}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p><span className="font-bold">Token ID: </span>{`${id.slice(0, 2)}...${id.slice(id.length - 3)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://goerli.etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
                </div>
                <p>{description? description.slice(0, 200) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">
                {attributes?.length > 0 && attributes.map(attribute => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col">
                            <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                            <p className="text-sm">{attribute.value}</p>
                        </div>
                    )
                })}
            </div>
            <div className="flex text-center justify-center items-center mt-auto">
                <a id="" href={txHash} target="_blank" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Check your transaction on Etherscan!
                </a>
            </div>            
        </div>
        
    )
}

export default NftCard