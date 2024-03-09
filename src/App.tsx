import './App.scss';
import hand from './assets/hang.png'

function App() {
    return (
        <div className="app">
            <img src={hand} alt={'hand'} className={'app-img'}/>
            <header className="app-header">
                <h1>Who wants to be <br/> a millionaire?</h1>
            </header>
            <main className={'app-start'}>
                <a href={'/game'}>
                    <button className={'button-start'}>Start</button>
                </a>
            </main>
        </div>
    );
}

export default App;
