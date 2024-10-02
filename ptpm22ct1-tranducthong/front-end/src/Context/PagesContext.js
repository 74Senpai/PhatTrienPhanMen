import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState('');

  const viewPopup = (view) => setPopup(view);

  return (
    <PopupContext.Provider value={{ popup, viewPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}
