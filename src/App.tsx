
import Game from './components/game/Game.tsx';
import './App.scss';

function App() {
  return (
      <div className="app">
        <header className="app-header">
          <h1>Who Wants to Be a Millionaire</h1>
        </header>
        <main>
          <Game />
        </main>
      </div>
  );
}

export default App;
