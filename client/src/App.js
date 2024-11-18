import React from 'react';
import GlobalStyle from './styles/global';
import RoutesApp from './routes';
import { AuthProvider } from './Contexts/auth';
const App = () => {
    return(
        <AuthProvider>   
        <RoutesApp/>
        <GlobalStyle/>
        </AuthProvider>
    )
}

export default App;