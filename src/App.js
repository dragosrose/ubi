import logo from './logo.svg';
import './App.css';
import  './components/WalletConnector'
import WalletConnector from "./components/WalletConnector";
import Ubi from "./components/UBI";

function App() {
    return(
        <div className={'container mx-auto px-20 font-mono m-2'}>
            <header className={'border-b-2 sm:border-2 shadow text-center my-4 bg-white'}>
                <h1 className={'m-2 font-bold text-3xl'}>Humanity Forward</h1>
                <p className={'m-2'}>
                    Reducing widespread poverty and providing lifelong income security.
                    One block at a time.
                </p>

            </header>

            <main className={'border-b-2 sm:border-2 shadow text-center my-4 bg-white'}>
                <WalletConnector></WalletConnector>
                <Ubi></Ubi>
            </main>

            <footer className={'border-b-2 sm:border-2 shadow text-center my-4 bg-white'}>
                <p className={'my-2'}>❤️ Made by <a className={'underline'} href={'https://github.com/nomoney34'}>Dragos Trandafir</a>
                         <span> and </span>
                    <a className={'underline'} href={'https://github.com/PetrisorTanasa'}>Petrisor Tanasa</a> with love. ❤️
                </p>
            </footer>
        </div>




    );
}

export default App;
