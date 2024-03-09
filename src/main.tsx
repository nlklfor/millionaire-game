import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import Game from "./components/game/Game.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: '/game',
        element: <Game/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
