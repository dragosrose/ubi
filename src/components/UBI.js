import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import UBI from "../contract/UBI.json";
import {formatEther, parseEther} from "ethers/lib/utils";

function Ubi(props) {

    const contractAddress = "0x8FA004a40d3E90D89eE5C6B3ac7CBB7B34C1ee28";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract =  new ethers.Contract(contractAddress, UBI.abi, signer).connect(signer);

    const [subscribed, setSubscribed] = useState(false);
    const [tokensToClaim, setTokensToClaim] = useState(0);
    const [donationAmount, setDonationAmount] = useState(0);
    const [enabled, setEnabled] = useState(false);


    //TODO: COMPLETE FUNCTIONS
    const cancelSubscription = async () => {
        try {
            await contract.unsubscribe();
            setSubscribed(false);
        } catch (error) {
            console.log(error);
        }

    }

    const buySubscription = async () => {
        try {
            await contract.subscribe();
            setSubscribed(true);
        } catch (error) {
            console.log(error);
        }
    }

    const isSubscribed = async () => {
        let tx = await contract.isSubscribed();
        setSubscribed(tx);

    }

    useEffect(() => {
        isSubscribed();
    }, [subscribed]);

    const isEnabled = async() => {
        let tx = await contract.isSubEnabled();
        setEnabled(tx);
    }

    useEffect(() => {
        isEnabled();
    }, [enabled]);

    const toClaim = async() => {
        let tx = await contract.claimable();
        setTokensToClaim(Number(formatEther(tx)));
        console.log(tokensToClaim);
    }

    useEffect(() => {
        toClaim();
    }, [tokensToClaim]);

    const donate = async () => {
        return await contract.donate({value: parseEther(donationAmount.toString())});
    }

    const claim = async () => {
        return await contract.claimTokens();
    }

    return (
        <div>
            <div className={'m-4'}>

                {/*E tarziu ma doare capu, las doar asa pe enable*/ }
                {enabled === true ? (
                    <div>

                                <div>
                                    <button onClick={buySubscription} className={'button p-4'}>get_subscription</button>
                                    <button onClick={claim} className={'button p-4'}>claim_tokens</button>
                                    <p className={'my-4'}>The amount of tokens ready to be claimed is: {tokensToClaim}</p>
                                </div>


                                <button onClick={cancelSubscription} className={'button p-4'}>cancel_subscription</button>



                    </div>) : (<div></div>)
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