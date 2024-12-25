import React from "react";
import { AppProps } from "../../main";
import { Button, Image } from "react-bootstrap";

interface ButtonTeamProps extends AppProps {
    teamBadge: string,
    teamName: string
}

const ButtonTeam : React.FC<ButtonTeamProps> = ({ setState, teamBadge, teamName }) => {

    return (
        <div className="text-center">
            <Button variant="secondary" className="bg-white">
                <Image src={teamBadge} alt={teamName} width="100px" height="100px"/>
            </Button>
            <span className="team-span d-block">{teamName}</span>
        </div>
    );
}

export default ButtonTeam;