import { createContext, useContext, useState } from "react";
import Loading from "../componests/Loading/Loading";

export const MessageContex = createContext();

export function MessageProvider({children}){

    const [showPopup , setShowPopup] = useState({
        message : "",
        isShow : false,
        timeOut : 0,
        type : "",
        action : 'none',  
    });

    // const popupValue = showPopup;

    return (
        <MessageContex.Provider value={{showPopup, setShowPopup}}>
            {children}
            <Loading type={showPopup.type} mess={showPopup.message} isShow={showPopup.isShow}/>
        </MessageContex.Provider>
    )
}