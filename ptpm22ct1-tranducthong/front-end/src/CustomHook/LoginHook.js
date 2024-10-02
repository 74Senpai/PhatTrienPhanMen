import { useState } from "react";

export default function useLogin(){
    const [isLogin, setLoginState] = useState(false);
    const [showLogin, setShowForm] = useState(false);

    const changeLoginState = (state)=>{setLoginState(state)};
    const setShow = (state)=>{setShowForm(state); console.log("is Show",showLogin)};

    return [isLogin, showLogin,setShow, changeLoginState];
}

export function usePopupView(){
    const [popupView, setPopupView] = useState('');

    const changePopup = (state)=>{setPopupView(state)};

    return [popupView, changePopup];
}