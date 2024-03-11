import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Game from "./components/game/Game.tsx";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
