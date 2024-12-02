import Header from "./Header.js";
import Footer from "./Footer.js";
import { useEffect, useContext } from "react";
import { BlogTypesContext, PagesSiteContex } from "../../Context/PagesContext.js";
import ReadBlogPage from "../ReadPage/index.js";

export function Base(){

    const {setBlogTypes} = useContext(BlogTypesContext);
    const {content} = useContext(PagesSiteContex);
    useEffect(() => {
        
            const fetchTypes = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/public/blog-type/show/all');

                    const data = await response.json();
                    
                    console.log('Fetch types: ', data);
                    setBlogTypes(data.data);
                } catch (err) {
                    console.log('Error: ', err);
                }
            };

            fetchTypes();
        
    }, []);

   
    console.log("BASE ");

    return (<>
        <Header />
        <div id='contents'>
            {/* <ReadBlogPage /> */}
            {content}
        </div>
        <Footer />
    </>);
}