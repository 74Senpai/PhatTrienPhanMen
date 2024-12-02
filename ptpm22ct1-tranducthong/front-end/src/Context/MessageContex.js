import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../componests/Loading/Loading";

export const MessageContex = createContext();

export function MessageProvider({children}){

    const [showPopup , setShowPopup] = useState({
        message : "",
        isShow : false,
        timeOut : 0,
        type : "",
        action : 'none',
        filter : false  
    });

    // const popupValue = showPopup;
    useEffect(() => {
        if (showPopup.timeOut > 0 && showPopup.isShow) {
            const timer = setTimeout(() => {
                setShowPopup(pre =>({
                    ...pre,
                    isShow : false,
                    timeOut : 0
                }));
            }, showPopup.timeOut);

            return () => clearTimeout(timer);
        }
    }, [showPopup.timeOut, showPopup.isShow]);

    return (
        <MessageContex.Provider value={{showPopup, setShowPopup}}>
            {children}
            {showPopup.isShow && 
                <Loading 
                    type={showPopup.type} 
                    mess={showPopup.message} 
                    isShow={true}
                    filter={showPopup.filter} 
                />}
        </MessageContex.Provider>
    )
}