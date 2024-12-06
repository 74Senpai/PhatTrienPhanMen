import React, { memo, useContext, useEffect, useState } from "react";
import Account from "../Login_Sigup_Account";
import "../BASE/CSS/Header.css";
import { UseInforContex, 
        BlogTypesContext, 
        PagesRefContex, 
        PagesSiteContex, 
        UserRoleContex} from "../../Context/PagesContext.js";
import { Outlet, Link, NavLink } from "react-router-dom";


function Header() {

    const [searchContent, setContentsSeach] = useState('');
    const [isShow, setShow] = useState(false);
    const { userInfor } = useContext(UseInforContex);
    const {userRole} = useContext(UserRoleContex);
    const {blogTypes} = useContext(BlogTypesContext);
    const {currentSite, changeSite} = useContext(PagesSiteContex);

   


    return (<>
        <header>
            <div><NavLink to="/" className={'nav'} >
                <img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png" />
            </NavLink></div>
            {userRole === 'ADMIN' &&<>
                <div><NavLink to="/admin" className={'nav'} >ADMIN</NavLink></div>
            </>}
            {(userRole === 'AUTHOR' || userRole === 'ADMIN') &&
                <div><NavLink to="/blog" className={'nav'} >BLOG</NavLink></div>
            }
            {blogTypes &&
               blogTypes.map((value, index)=>(<React.Fragment key={index}>
                    {index < 5 && 
                        <div key={value.id_type} >
                            <NavLink to={"/blog-type/" + value.type_name} 
                                className={'nav'} >{value.type_name}</NavLink>
                        </div>
                    }
                </React.Fragment>))
            }
            {blogTypes.length >= 5 &&
                <div >
                    <NavLink to={"/blog-type/all" } className="nav">ALL</NavLink>
                </div>
            }
            {/* <div className={"nav " + `${currentSite === "javascript" ? "active" : ""}`} onClick={() => changeSite("javascript")}>JAVASCRIPT</div>
            <div className={"nav " + `${currentSite === "c++" ? "active" : ""}`} onClick={() => changeSite("c++")}>C++</div>
            <div className={"nav " + `${currentSite === "c#" ? "active" : ""}`} onClick={() => changeSite("c#")}>C#</div>
            <div className={"nav " + `${currentSite === "java" ? "active" : ""}`} onClick={() => changeSite("java")}>JAVA</div>
            <div className={"nav " + `${currentSite === "other" ? "active" : ""}`} onClick={() => changeSite("other")}>OTHER</div> */}
            <div className='search'>
                <input
                    type='search'
                    name='search'
                    placeholder='Search'
                    onChange={(e) => setContentsSeach(e.target.value)}
                    value={searchContent} />
                <div id='Search'><i className="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div className="account nav" onClick={() => { setShow(true) }}>
                {userInfor.user_name || 'Login'}
            </div>
            {isShow && <Account isShowForm={setShow} data={userInfor} userRole={userRole}/>}
        </header>
        {/* <Outlet /> */}
    </>);
}

export default memo(Header);