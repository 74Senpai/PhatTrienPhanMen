import Header from "./Header.js";
import Footer from "./Footer.js";
import { useEffect, useContext } from "react";
import { BlogTypesContext } from "../../Context/PagesContext.js";

export function Base(){

    const {setBlogTypes} = useContext(BlogTypesContext);

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
        <Footer />
    </>);
}