import './CSS/Loading.css';
import { useState } from "react";

function Messages({typeBox, message}){
    return(<>
        <div className={typeBox+"-box box-message"}>
            <div className="icon">
                {typeBox == "error" && <i class="fa-solid fa-xmark"></i>}
                {typeBox == "infor" && <i class="fa-solid fa-circle-info"></i>}
                {typeBox == "done" && <i class="fa-solid fa-check"></i>}
                {typeBox == "warring" && <i class="fa-solid fa-exclamation"></i>}
                {typeBox == "unknow" && <i class="fa-solid fa-question"></i>}
            </div>
            <div className="message">{message}</div>
        </div>
    </>);
}


export default function Loading({type, mess, isShow}){

    const [show, setShow] = useState(isShow);

    if(show){
        return(<>
            <div className="shield"></div>
            <div className="loading-box"><Messages typeBox={type} message={mess} /></div>
        </>);
    }

    return null;
}