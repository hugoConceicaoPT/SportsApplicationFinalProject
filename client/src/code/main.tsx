// Importa a função `createRoot` do módulo `react-dom/client` para criar a raiz da aplicação React.
import { createRoot } from 'react-dom/client';

// Importa o arquivo CSS do Bootstrap para aplicar estilos padrão do framework Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa o arquivo CSS `normalize.css` para garantir estilos consistentes em diferentes navegadores.
import "normalize.css";

// Importa o arquivo CSS personalizado, localizado em um diretório relativo, para aplicar estilos específicos da aplicação.
import "../css/main.css";

// Importa o módulo `React` e o hook `useState`.
// `React` é necessário para componentes e `useState` é usado para gerenciar estados.
import React, { useState } from "react";

// Importa os componentes `Register`, `Home` e `Login`.
// Estes componentes representam diferentes partes da interface da aplicação.
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

// Importa o componente de contexto `UserProvider` que provavelmente gerencia o estado global relacionado ao usuário.
import UserProvider from './userContext';

// Importa o módulo `ReactDOM` para renderizar a aplicação na árvore DOM.
import ReactDOM from 'react-dom/client';
import Favorites from './components/Favorites';

// Define uma interface TypeScript chamada `AppProps`.
// Ela especifica o formato esperado da propriedade `setState` no componente.
export interface AppProps {
  setState: React.Dispatch<React.SetStateAction<{ view: string }>>;
}

// Define o componente funcional `App`, que gerencia a navegação entre as telas da aplicação.
function App() {
    // Declara um estado local `state` com `useState`. 
    // O estado inicial define a visualização padrão como "home".
    const [state, setState] = useState({ view: "home" });

    // Renderiza diferentes componentes dependendo do valor do estado `state.view`.
    if (state.view == "home") 
        return <Home setState={setState}/>; // Renderiza o componente `Home` e passa `setState` como prop.
    else if (state.view == "register") 
        return <Register setState={setState}/>; // Renderiza o componente `Register` e passa `setState` como prop.
    else if (state.view == "login") 
        return <Login setState={setState}/>; // Renderiza o componente `Login` e passa `setState` como prop.
    else if(state.view == "favorites")
        return <Favorites setState={setState}/>
}

// Cria uma raiz React no elemento HTML com o ID `mainContainer`.
// `as HTMLElement` assegura ao TypeScript que o elemento é do tipo correto.
const root = ReactDOM.createRoot(document.getElementById('mainContainer') as HTMLElement);

// Renderiza o componente `App` dentro do `UserProvider`, permitindo o uso de um contexto global de usuário.
// `UserProvider` envolve o `App` para fornecer o estado global à árvore de componentes.
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

