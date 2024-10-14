import { useState } from "react";
import changePages from "../../controller/handles.js";

export function RefCreate(){
    const [refBlock, setRefBlock] = useState(["Home"]);
    const refNext = ({name})=> {
        if(name !== refBlock[refBlock.length -1]){
            setRefBlock((refBlock)=>[...refBlock, name])
        }
    
    };
    return {refBlock, refNext};
}

export function RefBlocks({name, extend}){
    return(
        <div className="ref-name">{name + " " +extend}</div>
    );
}