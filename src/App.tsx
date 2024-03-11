import './App.scss';
import hand from './assets/hand.png'

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={hand} alt={'hand'} className={'app-img'}/>
            </header>
            <main className={'app-start'}>
                <h1 className={'app-title'}>Who wants to be <br/> a millionaire?</h1>
                <a href={'/millionaire-game/game'}>
                    <button className={'button-start'}>Start</button>
                </a>
            </main>
        </div>
    );
}

export default App;
