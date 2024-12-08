import { useState, useContext, useEffect, memo } from 'react';
import './CSS/AdminPages.css';
import ManageBlogPage from './managePage';
import ManageUserPage from './manageUserPage';
import ManageAuthorPage from './manageAuthorPage';
import ManageBlog from './manageBlogPage';

const navigationTag = [
    {name: 'Quản lý Trang Blog', action:(active)=>active, content : <ManageBlogPage /> },
    {name: 'Quản lý người dùng', action:(active)=>active, content : <ManageUserPage /> },
    {name: 'Quản lý tác giả', action:(active)=>active, content : <ManageAuthorPage /> },
    {name: 'Quản lý Blog', action:(active)=>active, content : <ManageBlog /> },
];



export default memo(function AdminPages(){

    const [navActive, setActive] = useState({0: true});
    const [content, setContent] = useState(<ManageBlogPage />)


    console.log("Afjajkfhnkahfn");
    return(

        <div className="admin-main-box">
           
            <div className="manages-nav">
                {true &&
                    navigationTag.map((nav, index)=>(
                        <div 
                        key={index}
                        className={'nav manage-nav '+( navActive[index] ? 'active': '')} 
                        onClick={()=>{nav.action(setActive({[index]: true})); setContent(nav.content)}}>
                            {nav.name}
                        </div>  
                    ))
                }
            </div>
            <div className='manage-dashboard'>
                {/* <ManageBlog /> */}
                {content}
            </div>
        </div>
    )
});