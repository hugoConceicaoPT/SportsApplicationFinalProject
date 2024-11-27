import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importa o componente principal da aplicação
import "./index.css"; 
const rootElement = document.getElementById("root"); 

if (!rootElement) {
  throw new Error("Elemento root não encontrado. Certifique-se de que o index.html tem <div id='root'></div>");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
