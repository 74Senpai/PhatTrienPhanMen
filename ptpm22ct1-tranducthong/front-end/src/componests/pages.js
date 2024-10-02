import { ContentsByType } from "./Home.js";
// import { useContext } from "react";
// import { RefContext } from "../Context/PagesContext.js";
import { RefCreate } from "./Ref.js";
import { RefBlocks } from "./Ref.js";


export default function Pages(){
    // const reflink = useContext(RefContext);
    const {refBlock, refNext} = RefCreate();
    refNext({name : "IT"});
    console.log(refBlock);
    const refList = [];
    for(let i in refBlock){
        refList.push(<RefBlocks name={refBlock[i]} key={i}/>);
    }
    return(<>
        <div className="ref-link">
            {refList}
        </div>
        <div className="contents-pages-ref">
            <ContentsByType 
                title_name={"Chuyen IT"}
                templ={1}
            />
        </div>
    </>);
}

export function BlogPagesContent(){
    return(
        <div className="blog-content-page">
            <div className="nav-left"></div>
            <div className="content-right"></div>
        </div>
    );
}