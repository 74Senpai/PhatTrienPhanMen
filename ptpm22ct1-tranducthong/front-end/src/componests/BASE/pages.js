import { ContentsByType } from "./Home.js";
// import { useContext } from "react";
// import { RefContext } from "../Context/PagesContext.js";
import { PagesRefContex, PagesSiteContex } from "../../Context/PagesContext.js";
import { useContext } from "react";



export default function Pages(){
    // const reflink = useContext(RefContext);
    const {pagesRef, setref} = useContext(PagesRefContex);
    const {currentSite, changeSite} = useContext(PagesSiteContex);
    // console.log("currentSite", currentSite);
    return(<>
        <div className="ref-link">
            {pagesRef &&
                pagesRef.map((value, index) => (
                    <div className="nav ref-name"
                        onClick={()=>changeSite(value)}
                        key={value}>
                            {value}
                            {index < pagesRef.length - 1 &&
                                <span className="ref-name">
                                    {'>'}
                                </span>
                            }
                    </div>
                ))
            }
        </div>
        <div className="contents-pages-ref">
            <ContentsByType 
                title_name={currentSite}
                templ={Math.floor(Math.random() * (3 - 1)) + 1}
                type_API={currentSite}
            />
        </div>
    </>);
}

