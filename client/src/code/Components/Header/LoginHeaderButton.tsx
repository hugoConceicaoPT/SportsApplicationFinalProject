import React, { useState } from "react";
import { AppProps } from "../../main";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useUserContext } from "../../userContext";
import Button from 'react-bootstrap/Button';
import { Person, PersonCheck } from 'react-bootstrap-icons';

const LoginHeaderButton: React.FC<AppProps> = ({ setState }) => {
    const { user } = useUserContext();
    const username = user ? user.username : false;
    return (
        <>
            {user ? (
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic ps-0">
                        <PersonCheck size={24} className="ps-0 me-1 ms-0"/>
                        {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setState({view:"profile"})}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => setState({view: "logout"})}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Button variant="secondary" onClick={() => setState({view:"login"})} className="ps-2">
                    <Person size={24} className="ps-0 me-1 ms-0"/>Login
                </Button>
            )}
        </>
    );
}

export default LoginHeaderButton;