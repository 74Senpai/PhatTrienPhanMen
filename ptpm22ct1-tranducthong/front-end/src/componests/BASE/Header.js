import React, { memo, useContext, useEffect, useState } from "react";
import Account from "../Login_Sigup_Account";
import "../BASE/CSS/Header.css";
import { UseInforContex, 
        BlogTypesContext, 
        PagesRefContex, 
        PagesSiteContex } from "../../Context/PagesContext.js";


function Header() {

    const [searchContent, setContentsSeach] = useState('');
    const [isShow, setShow] = useState(false);
    const { userInfor } = useContext(UseInforContex);
    const [userRole, setUserRole] = useState('guest');
    const {blogTypes} = useContext(BlogTypesContext);
    const {setRef} = useContext(PagesRefContex);
    const {content, currentSite, changeSite} = useContext(PagesSiteContex);

    useEffect(function () {
        const userRole = async () => {
            if (userInfor.token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/user/role', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${userInfor.token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    const role = data.data;
                    setUserRole(role.name_role);

                } catch (error) {
                    console.log('Can not get user information');
                }
            }else{
                setUserRole('guest');
            }
        }
        userRole();

    }, [userInfor.token]);


    return (<>
        <header>
            <div className={"nav " + `${currentSite === "home" ? "active" : ""}`} onClick={() => changeSite("home")}>
                <img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png" />
            </div>
            {userRole == 'ADMIN' &&<>
                <div className={"nav " + `${currentSite === "admin" ? "active" : ""}`} onClick={() => changeSite("admin")}>ADMIN</div>
                <div className={"nav " + `${currentSite === "blog" ? "active" : ""}`} onClick={() => changeSite("blog")}>BLOG</div>
            </>}
            {userRole == 'AUTHOR' &&
                <div className={"nav " + `${currentSite === "blog" ? "active" : ""}`} onClick={() => changeSite("blog")}>BLOG</div>
            }
            {blogTypes &&
               blogTypes.map((value, index)=>(<React.Fragment key={index}>
                    {index < 5 && 
                        <div key={value.id_type} 
                            className={"nav " + `${currentSite === value.type_name ? "active" : ""}`} 
                            onClick={() => {changeSite(value.type_name); setRef(value.type_name, 'HOME')}}>
                            {value.type_name}
                        </div>
                    }
                </React.Fragment>))
            }
            {blogTypes.length >= 5 &&
                <div className="nav">
                    ALL
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
    </>);
}

export default memo(Header);