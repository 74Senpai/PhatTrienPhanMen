import { useEffect, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Home.js";
import BlogManage from "../Blog/index.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { BlogTypesContext, PagesSiteContex, UserRoleContex } from "../../Context/PagesContext.js";
import ReadBlogPage from "../ReadPage/index.js";
import ADMIN from "../ADMIN/index.js";
import Pages, { AllTypePage } from "./pages.js";
import { BlogsCount, CommentCount, Statistical } from "../Blog/index.js"; 
import WriteBlog from "../Blog/WriteBlog.js";

export function Base(){
    const {userRole} = useContext(UserRoleContex);
    const {setBlogTypes} = useContext(BlogTypesContext);
    const {content} = useContext(PagesSiteContex);
    useEffect(() => {
        
            const fetchTypes = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/public/blog-type/show/all');

                    const data = await response.json();
                    
                    console.log('Fetch types: ', data);
                    if(!data.data){
                        return;
                    }

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
        <Routes>
            <Route path="/" element={<Home />} />
            <Route index element={<Home />} />
            {(userRole === "AUTHOR" || userRole === "ADMIN") ? 
                <Route path="/blog" element={<BlogManage />} >
                    <Route path="posts" element={<BlogsCount />}/>
                    <Route path="statistical" element={<Statistical/>}/>
                    <Route path="comments" element={<CommentCount />}/>
                    <Route path="newblog" element={<WriteBlog />}/>
                </Route> : ''}
            {userRole == "ADMIN" && 
                <Route path="/admin" element={<ADMIN />}>
                    
                </Route>
            }
            <Route path="/blog-type">
                <Route path="all" element={<AllTypePage />} /> 
                <Route path=":blogType" element={<Pages/>} />
                <Route path=":blogType/:nameBlog" element={<ReadBlogPage />} />
            </Route>
        </Routes>
        <Outlet />
        </div>
        <Footer />
    </>);
}