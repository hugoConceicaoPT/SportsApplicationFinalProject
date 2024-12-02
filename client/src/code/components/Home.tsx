import React from "react";
import Nav from "react-bootstrap/Nav";

interface HomeProps {
    setState: React.Dispatch<React.SetStateAction<{ view: string }>>;
}

const Home : React.FC<HomeProps> = ({ setState }) => {
    return (
        <div>
            <Nav.Link onClick={() => setState({view: "register"})}>Register</Nav.Link>
            <Nav.Link onClick={() => setState({view: "login"})}>Login</Nav.Link>
            <h1>Welcome to Sports Application</h1>
        </div>
    );
}

export default Home;