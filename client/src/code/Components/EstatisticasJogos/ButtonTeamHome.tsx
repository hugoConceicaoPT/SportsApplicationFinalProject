import React, { useState } from "react";
import { AppProps } from "../../main";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";

interface ButtonTeamProps extends AppProps {
    teamBadge: string,
    teamName: string
}

const ButtonTeamHome: React.FC<ButtonTeamProps> = ({ setState, teamBadge, teamName }) => {

    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    }
    return (
        <div className="text-center">
            <Button
                style={{
                    color: favorite ? "#FFCD00" : "white",
                    backgroundColor: "black",
                    borderColor: "black",
                }}
                className="leagueEvents-favorite me-4"
                onClick={toggleFavorite}
            >
                {favorite ? <StarFill size={25} /> : <Star size={25} />}
            </Button>
            <Button variant="secondary" className="bg-white" style={{ position: "relative" }}>
                <Image src={teamBadge} alt={teamName} width="100px" height="100px" />
                <span className="team-span text-center d-flex">{teamName}</span>
            </Button>
        </div>
    );
}

export default ButtonTeamHome;