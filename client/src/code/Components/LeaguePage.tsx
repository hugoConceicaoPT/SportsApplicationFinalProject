import React from "react";

import { Button } from "react-bootstrap";

interface AppProps {
    setState: (state: { view: string }) => void;
    imageSrc: string; 
    label: string; 
    isSubmitting?: boolean; 
  }

const LeagueBlock: React.FC<AppProps> = ({ setState, label, imageSrc }) => {
    const redirectToStading = () => {
        setState({ view: "register" });
    }
    
    const redirectToResults = () => {
        setState({ view: "register" });
    }

    const redirectToList = () => {
        setState({ view: "register" });
    }

    return(
        <div className="league-page">
        {/* Cabeçalho da Liga */}
        <div className="league-header">
          <img src={imageSrc} alt={`${label} logo`} className="league-logo" />
          <div>
            <h1>{label}</h1>
          </div>
          </div>

        <div className="Navigation">
        <Button 
        className ="Stading"
        type="submit"
        onClick={redirectToStading}
        >
        Classificações  
        </Button>
        <Button 
        className ="Results"
        type="submit"
        onClick={redirectToResults}
        >
        Resultados   
        </Button>
        <Button 
        className ="List"
        type="submit"
        onClick={redirectToList}
        >
        Lista  
        </Button>
       </div>
       </div>
    )
}