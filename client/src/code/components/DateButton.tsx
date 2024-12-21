import React, { useState } from "react";
import { AppProps } from "../main";
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Calendar } from "react-bootstrap-icons";

interface DateButtonProps extends AppProps{
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}


const DateButton: React.FC<DateButtonProps> = ({setState, date, setDate}) => {
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

    return (
        <Button className="buttonDate p-0">
            <ChevronLeft className="mb-1" onClick={handlePreviousDay}  />
            <Calendar  className="ms-3 mb-1 me-1"/>
            <span className="p-0 me-3">{formatDate(date)}</span>
            <ChevronRight className="mb-1" onClick={handleNextDay} />
        </Button>
    );
}

export default DateButton;