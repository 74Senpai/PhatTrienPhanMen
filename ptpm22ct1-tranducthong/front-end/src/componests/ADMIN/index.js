import { useState, useContext, useEffect, memo } from 'react';
import './CSS/AdminPages.css';
import ManageBlogPage from './manageBlogPage';

const navigationTag = [
    {name: 'Quản lý Trang Blog', action:(active)=>active },
    {name: 'Quản lý người dùng', action:(active)=>active },
    {name: 'Quản lý tác giả', action:(active)=>active },
    {name: 'Quản lý Blog', action:(active)=>active },
];



export default memo(function AdminPages(){

    const [navActive, setActive] = useState({0: true});

    console.log("Afjajkfhnkahfn");
    return(

        <div className="admin-main-box">
           
            <div className="manages-nav">
                {true &&
                    navigationTag.map((nav, index)=>(
                        <div 
                        key={index}
                        className={'nav manage-nav '+( navActive[index] ? 'active': '')} 
                        onClick={()=>nav.action(setActive({[index]: true}))}>
                            {nav.name}
                        </div>
                    ))
                }
            </div>
            <div className='manage-dashboard'>
                <ManageBlogPage />
            </div>
        </div>
    )
});