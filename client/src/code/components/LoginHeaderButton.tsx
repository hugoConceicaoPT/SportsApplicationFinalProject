import React, { useState } from "react";
import { AppProps } from "../main";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useUserContext } from "../userContext";
import Button from 'react-bootstrap/Button';
import { Person } from 'react-bootstrap-icons';

const LoginHeaderButton: React.FC<AppProps> = ({ setState }) => {
    const { user } = useUserContext();
    const username = user ? user.username : false;
    const [backgroundColorStyle, setBackgroundColorStyle] = useState(false);
    const toggleBackgroundColorStyle = () => {
        setBackgroundColorStyle(!backgroundColorStyle);
    };
    return (
        <>
            {user ? (
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic ps-0">
                        <Person size={24} className="iconLoginButtonHeader ps-0 me-1 ms-0"/>
                        {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setState({view:"profile"})}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => setState({view: "logout"})}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Button onClick={() => setState({view:"login"})} style={{backgroundColor: backgroundColorStyle ? '#495057' : '#343a40', borderColor: backgroundColorStyle ? '#495057' : '#343a40'}} onMouseOver={toggleBackgroundColorStyle} onMouseOut={toggleBackgroundColorStyle} className="buttonLoginHeader ps-2">
                    <Person size={24} className="iconLoginButtonHeader ps-0 me-1 ms-0"/>Login
                </Button>
            )}
        </>
    );
}

export default LoginHeaderButton;