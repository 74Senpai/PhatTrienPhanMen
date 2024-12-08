import { createContext, useContext, useState, useEffect, act } from "react";
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

    const [isSubmit, setSubmit] = useState(null);

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
        if(showPopup.action !== 'none' && showPopup.action !== null && isSubmit == true){
            setSubmit(false);
        }
    }, [showPopup.timeOut, showPopup.isShow, isSubmit]);

    return (
        <MessageContex.Provider value={{showPopup, setShowPopup, isSubmit, setSubmit}}>
            {children}
            {showPopup.isShow && 
                <Loading 
                    type={showPopup.type} 
                    mess={showPopup.message} 
                    isShow={true}
                    filter={showPopup.filter} 
                    action={showPopup.action}
                    setShowPopup={setShowPopup}
                />}
        </MessageContex.Provider>
    )
}