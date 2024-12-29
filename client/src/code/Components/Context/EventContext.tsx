import React, { createContext, useContext, useState } from "react";
import { ILiveEvents, INextPastLeagueEvents } from "../../league";

interface EventContextType {
  selectedEvent: ILiveEvents | INextPastLeagueEvents | null;
  setSelectedEvent: (event: ILiveEvents | INextPastLeagueEvents | null) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState<ILiveEvents | INextPastLeagueEvents | null>(null);

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
