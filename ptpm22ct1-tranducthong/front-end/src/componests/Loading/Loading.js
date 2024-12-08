import { MessageContex } from '../../Context/MessageContex';
import './CSS/Loading.css';
import { useState, useEffect, useContext } from "react";

function Messages({typeBox, message, action, setShowPopup}){
    const {setSubmit} = useContext(MessageContex);
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
            {action && <>
                {action == "confirm" && 
                    <div className='check-box'>
                        <i onClick={()=>{setSubmit(true);
                            setShowPopup(pre => ({
                                ...pre,
                                isShow : false,
                                action : "submit"
                            }));
                        }}className="fa-solid fa-check nav-submit"></i> 
                        <i onClick={()=>setShowPopup(pre => ({
                            ...pre,
                            isShow : false,
                            action : "none"
                        }))}className="fa-solid fa-xmark nav-cancel"></i>
                    </div>}
            </>}
        </div>
    </>);
}


export default function Loading({type, mess, isShow, filter, action, setShowPopup}){

    const [show, setShow] = useState(isShow);
    const { isSubmit, setSubmit } = useContext(MessageContex);
    
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
            <div className="loading-box">
                <Messages 
                    typeBox={type} 
                    message={mess} 
                    setShowPopup={setShowPopup}
                    action={action}
                    />
            </div>
        </>);
    }
    
    return null;
}