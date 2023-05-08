import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import Minter from '../components/Minter';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAccount } from "wagmi";
import PrivateRoute from '../components/PrivateRoute';

export default function NFTAdminAndMinter() {
    const { address, isConnected } = useAccount();
    
    return (
        <PrivateRoute isLoggedIn={isConnected}>
        <div>
            <div className="sticky top-0">
                <Navbar />
            </div>
            <div className="flex alchemy h-fit">
                <div className="w-1/2 h-fit pl-12 py-8 mr-5">
                    <div className=""></div><h1 id="title" className="block text-white text-3xl font-bold font-body mb-10"><span className="bg-white text-blue-900 rounded-full px-5 py-3 justify-center">1.</span> Employee Reward Administration</h1>
                    <div className="bg-white rounded-xl p-3">
                        <div>
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="block text-blue-700 text-1xl font-bold mb-2">Check if your colleague has registered digital wallet!</h2>
                                <input
                                        id="colleague-name-check"
                                        type="text"
                                        className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Please write the name of the awardee..."
                                        />                            
                            </form>
                            <table className="w-full">
                                <tbody>
                                <tr>
                                    <td className="w-1/2 m-1">
                                        <button id="wallet-check" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Check registered wallet
                                        </button>                                        
                                    </td>
                                    <td className="w-1/2 m-1">
                                        <button id="wallet-check" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Send e-mail to colleague
                                        </button> 
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Name of the colleague:</h2>
                            <input
                                    id="colleague-name"
                                    type="text"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Please write the name of the awardee..."
                                    />
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">The project on which your colleague has excelled: </h2>
                            <input
                                    id="project-name"
                                    type="text"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Please write the name of the project..."
                                    /><br/>
                            <input type="checkbox" id="approval" value="Approved" className="mb-7 mt-7"/>
                            <label htmlFor="approval" className=" text-blue-700 text-1xl font-bold">The responsible partner has approved the nomination.</label><br/>
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Date of the approval: </h2>
                            <input
                                    id="approval-date"
                                    type="date"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Name of the approval partner: </h2>
                            <input
                                    id="partner-name"
                                    type="text"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Please write the name of the approval partner..."
                                    />
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Line of Service: </h2>
                            <input
                                    id="los-name"
                                    type="text"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Please write the line of service..."
                                    />
                            <h2 className="block text-blue-700 text-1xl font-bold mb-2">Reasons for the nomination: </h2>
                            <textarea
                                    id="los-name"
                                    type="text"
                                    className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Please write the reasons for the nomination..."
                                    />
                        </form>
                        <div className="text-center">
                            <button id="" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Record approved Bravo! Reward
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-fit pr-12 py-8 ml-5">
                    <h1 id="title" className="block text-white text-3xl font-bold font-body mb-10"><span className="bg-white text-blue-900 rounded-full px-5 py-3 justify-center">2.</span> Bravo! NFT Minter</h1>
                    <Minter />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div> 
        </PrivateRoute>
  );
}