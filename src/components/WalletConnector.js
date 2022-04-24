import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import {networkParams} from "./networks";



function WalletConnector(props) {
    const web3Modal = new Web3Modal({
        cacheProvider: true,

    });

    const networkList = [
        'Rinkeby', 'Mumbai', 'Binance Smart Chain'
    ];

    const [address, setAddress] = useState('');
    const [provider, setProvider] = useState();
    const [instance, setInstance] = useState();
    const [chainId, setChainId] = useState();

    const connectWallet = async () => {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const accounts = await provider.listAccounts();
        const network = await provider.getNetwork();

        if(accounts)
            setAddress(accounts[0]);
        setInstance(instance);
        setProvider(provider);
        setChainId(Number(network.chainId));

    }

    const walletListener = async () =>{
        if(window.ethereum) {
            var instance = window.ethereum;
        }
        const provider = new ethers.providers.Web3Provider(instance);
        const accounts = await provider.listAccounts();
        const network = await provider.getNetwork();

        if(accounts)
            setAddress(accounts[0]);
        setInstance(instance);
        setProvider(provider);
        setChainId(Number(network.chainId));
    }

    useEffect(() => {
        if(web3Modal.cachedProvider){
            walletListener();
        }
    }, []);

    const handleNetwork = (e) => {
        const id = e.target.value;
        setChainId(Number(id));
    }

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x' + Number(chainId).toString(16)}]

            });

        } catch (error) {
            if(error.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [networkParams['0x' + Number(chainId).toString(16)]]
                })
            }


        }
    }
    const refresh = () => {
        setProvider();
        setAddress(undefined);
        setChainId();
    }

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refresh();
    }

    useEffect(() => {
        if(instance?.on){
            const changedAddress = (accounts) => {
                if(accounts)
                    setAddress(accounts[0]);
            };

            const changedChain = (chainId) => {
                setChainId(Number(chainId));
            }

            const disconnect = () => {
                disconnect();
            };

            instance.on("accountsChanged", changedAddress);
            instance.on("chainChanged", changedChain);
            instance.on("disconnect", disconnect);

            return () => {
                if(instance.removeListener){
                    instance.removeListener("accountsChanged", changedAddress);
                    instance.removeListener("chainChanged", changedChain);
                    instance.removeListener("disconnect", disconnect);
                }
            };
        }


    }, [instance]);

    return (

        <div className={'m-4'}>
            <button className={'button p-3'} onClick={connectWallet}>
                {
                    address ? (
                        String(address).substring(0, 6) +
                            "..." +
                            String(address).substring(38)
                    ) : (
                        <span>Connect Wallet</span>
                    )
                }

            </button>
            {address ? (
                <div>
                    <p className={'m-2'}>You are currently connected to: </p>
                    <select placeholder={'Select..'} onChange={handleNetwork}
                            className={'text-center m-2 button px-4 py-3'} value={chainId}>
                        <option value={'4'}>Rinkeby</option>
                        <option value={'80001'}>Mumbai</option>
                        <option value={'97'}>BSC Test Chain</option>
                    </select>
                    <button onClick={switchNetwork} className={'m-2 button p-3'}>
                        Switch Network
                    </button>
                </div>) : (<div></div>)
            }

        </div>
    );


}

export default WalletConnector;