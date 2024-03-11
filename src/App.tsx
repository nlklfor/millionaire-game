import './App.scss';
import hand from './assets/hand.png'
import {Link} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={hand} alt={'hand'} className={'app-img'}/>
            </header>
            <main className={'app-start'}>
                <h1 className={'app-title'}>Who wants to be <br/> a millionaire?</h1>
                <Link to="/game">
                    <button className={'button-start'}>Start</button>
                </Link>
            </main>
        </div>
    );
}

export default App;
