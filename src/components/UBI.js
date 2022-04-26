import React, {useState} from 'react';
import {ethers} from "ethers";
import UBI from "../contract/UBI.json";
import {parseEther} from "ethers/lib/utils";

function Ubi(props) {

    const contractAddress = "0xa53c232aE15e67D7c25CecB6f4E4bd8470b7A136";;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract =  new ethers.Contract(contractAddress, UBI.abi, signer).connect(signer);

    const [subscribed, setSubscribed] = useState(false);
    const [tokensToClaim, setTokensToClaim] = useState(0);
    const [donationAmount, setDonationAmount] = useState(0);


    //TODO: COMPLETE FUNCTIONS
    const cancelSubscription = async () => {
        await setSubscribed(false);
    }

    const buySubscription = async () => {
        await setSubscribed(true);
    }

    const donate = async () => {
        return await contract.donate({value: parseEther(donationAmount.toString())});
    }

    const claim = async () => {

    }

    return (
        <div>
            <div className={'m-4'}>
                {
                    subscribed === false ? (
                            <div>
                                <button onClick={buySubscription} className={'button p-4'}>get_subscription</button>
                                <button onClick={claim} className={'button p-4'}>claim_tokens</button>
                                <p className={'my-4'}>The amount of tokens ready to be claimed is: {tokensToClaim}</p>
                            </div>

                    ) : (
                        <button onClick={cancelSubscription} className={'button p-4'}>cancel_subscription</button>
                    )
                }

                <div className={'flex flex-col items-center'}>
                    <button onClick={donate} className={'button p-4'}>donate_tokens</button>
                    <input type={"number"} step={"0.01"} placeholder={'0'} min={0} className={'p-2 text-center'} onChange={(event) => {setDonationAmount(event.target.value)}}/>
                </div>

            </div>
            <p className={'my-1'}>
                Contract address: {contractAddress}
            </p>
        </div>


    );
}

export default Ubi;