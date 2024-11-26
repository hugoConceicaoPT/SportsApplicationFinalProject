import React from 'react';
import GlobalStyle from './css/global';
import RoutesApp from './code/routes';
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