import React, { createContext, useContext, useState } from "react";
import { ILiveEvents, INextLeagueEvents } from "./league";

interface EventContextType {
  selectedEvent: ILiveEvents | INextLeagueEvents | null;
  setSelectedEvent: (event: ILiveEvents | INextLeagueEvents | null) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState<ILiveEvents | INextLeagueEvents | null>(null);

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
