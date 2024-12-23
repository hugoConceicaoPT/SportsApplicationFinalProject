import React, { useState } from "react";
import { AppProps } from "../../main";
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Calendar } from "react-bootstrap-icons";

interface DateButtonProps extends AppProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}


const DateButton: React.FC<DateButtonProps> = ({ setState, date, setDate }) => {
  const [isMouseOverLeft, setMouseOverLeft] = useState(false);
  const [isMouseOverRight, setMouseOverRight] = useState(false);
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("pt-PT", options);
  };

  // Função para mudar a data para o dia anterior
  const handlePreviousDay = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  // Função para mudar a data para o próximo dia
  const handleNextDay = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const changeBackgroundColorLeft = () => {
    setMouseOverLeft(!isMouseOverLeft);
  }
  const changeBackgroundColorRight = () => {
    setMouseOverRight(!isMouseOverRight);
  }

  return (
    <Button variant="secondary" className="buttonDate p-0">
      <ChevronLeft className="ms-0 ps-0 mb-1 mt-0 pt-0" onClick={handlePreviousDay} style={{ 
        backgroundColor: isMouseOverLeft ? "grey" : "black", 
        width: "16px", height: "100%", border: "0px solid white", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }} onMouseOver={changeBackgroundColorLeft} onMouseOut={changeBackgroundColorLeft} />
      <Calendar className="ms-2 mb-1 me-2" />
      <p className="d-inline-block mb-1 me-2">{formatDate(date)}</p>
      <ChevronRight className="me-0 ps-0 mb-1 mt-0 pt-0" onClick={handleNextDay} style={{ backgroundColor: isMouseOverRight ? "grey" : "black", width: "16px", height: "100%", border: "0px solid white", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} onMouseOver={changeBackgroundColorRight} onMouseOut={changeBackgroundColorRight} />
    </Button>
  );
}

export default DateButton;