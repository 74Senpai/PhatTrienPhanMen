import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ContentsByType, PageRef } from "./Home.js";
// import { useContext } from "react";
// import { RefContext } from "../Context/PagesContext.js";
import { PagesRefContex, PagesSiteContex, BlogTypesContext } from "../../Context/PagesContext.js";




export default function Pages(){
    // const reflink = useContext(RefContext);
    // const {currentSite} = useContext(PagesSiteContex);
    const { blogType } = useParams();
    // console.log("currentSite", currentSite);
    return(<>
        {/* <PageRef /> */}
        <div className="contents-pages-ref">
            <ContentsByType 
                title_name={blogType}
                templ={Math.floor(Math.random() * (3 - 1)) + 1}
                type_API={blogType}
            />
        </div>
    </>);
}

export function AllTypePage(){
    const {blogTypes} = useContext(BlogTypesContext); 
    // const {currentSite, changeSite} = useContext(PagesSiteContex);
    const {setRef} = useContext(PagesRefContex);

    return(<div className="all-type-page">
        {blogTypes && 
            blogTypes.map((type)=>(
                <div
                    className="nav" 
                    key={type.id_type}>
                    <Link to={"/blog-type/"+type.type_name}>
                        {type.type_name} | {type.describe}
                    </Link>    
                </div>
            ))
        }
    </div>);
}