import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "normalize.css";
import "../css/main.css";
import React, { useState } from "react";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import UserProvider from './userContext';
import ReactDOM from 'react-dom/client';

export interface AppProps {
  setState: React.Dispatch<React.SetStateAction<{ view: string }>>;
}

function App() {
    const [state, setState] = useState({view: "home"});
    if (state.view == "home") return <Home setState={setState}/>
    else if (state.view == "register") return <Register setState={setState}/>
    else if (state.view == "login") return <Login setState={setState}/>
}

const root = ReactDOM.createRoot(document.getElementById('mainContainer') as HTMLElement);

// Renderiza o App dentro do UserProvider
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
