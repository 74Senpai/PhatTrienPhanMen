import './CSS/Loading.css';
import { useState, useEffect } from "react";

function Messages({typeBox, message}){
    return(<>
        <div className={typeBox+"-box box-message"}>
            <div className="icon">
                {typeBox == "error" && <i className="fa-solid fa-xmark"></i>}
                {typeBox == "infor" && <i className="fa-solid fa-info"></i>}
                {typeBox == "done" && <i className="fa-solid fa-check"></i>}
                {typeBox == "warring" && <i className="fa-solid fa-exclamation"></i>}
                {typeBox == "unknow" && <i className="fa-solid fa-question"></i>}
            </div>
            <div className="message">{message}</div>
        </div>
    </>);
}


export default function Loading({type, mess, isShow, filter}){

    const [show, setShow] = useState(isShow);
    
    // useEffect(() => {
    //     if (timeOut > 0 && isShow) {
    //         const timer = setTimeout(() => {
    //             setShow(true);
    //         }, timeOut);

    //         return () => clearTimeout(timer);
    //     }
    // }, [timeOut, isShow]);

    if(show){
        return(<>
            {filter && <div className="shield"></div>}
            <div className="loading-box"><Messages typeBox={type} message={mess} /></div>
        </>);
    }
    
    return null;
}