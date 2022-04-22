import React from 'react';
import {ethers} from "ethers";

function Ubi(props) {

    const contractAddress = 'INSERT_CONTRACT_ADDRESS';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //TODO: ADD CONTRACT INFO
    // const contract =

    //TODO: COMPLETE FUNCTIONS
    const buySubscription = async () => {

    }

    const donate = async () => {

    }

    const claim = async () => {

    }

    return (
        <div>
            <div className={'m-4'}>
                <button onClick={buySubscription} className={'button p-4'}>buy_subscription</button>
                <button onClick={donate} className={'button p-4'}>donate_tokens</button>
                <button onClick={claim} className={'button p-4'}>claim_tokens</button>
            </div>
            <p className={'my-1'}>
                Contract address: {contractAddress}
            </p>
        </div>


    );
}

export default Ubi;