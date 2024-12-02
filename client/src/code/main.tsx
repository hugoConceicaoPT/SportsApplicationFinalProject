import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "normalize.css";
import "../css/main.css";
import React, { useState } from "react";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    const [state, setState] = useState({view: "home"});
    if (state.view == "home") return <Home setState={setState}/>
    else if (state.view == "register") return <Register setState={setState}/>
    else if (state.view == "login") return <Login setState={setState}/>
}

const container = document.getElementById('mainContainer');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
