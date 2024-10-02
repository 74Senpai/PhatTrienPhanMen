import { useState } from "react";

export function RefCreate(){
    const [refBlock, setRefBlock] = useState(["Home"]);
    const refNext = ({name})=> {
        if(name !== refBlock[refBlock.length -1]){
            setRefBlock((refBlock)=>[...refBlock, name])
        }
    
    };
    return {refBlock, refNext};
}

export function RefBlocks({name}){
    return(
        <div>{name}</div>
    );
}