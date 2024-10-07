import { useState } from "react";


export const loadingState = {
    isLoading : false
}

function Loading(){
    const [load, setLoading] = useState(loadingState.isLoading);

    return(<>
        <div className="block-click"></div>
        <div className="play-load"><i class="fa-solid fa-rotate-right"></i></div>
    </>);
}