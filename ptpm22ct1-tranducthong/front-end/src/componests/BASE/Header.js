import { memo, useContext, useEffect, useState } from "react";
import Home from "./Home.js";
import Pages from "./pages.js";
import Account from "../Login_Sigup_Account";
import BlogManage from "../Blog/index.js";
import Loading from "../Loading/Loading.js";
import "../BASE/CSS/Header.css";
import AdminPages from "../ADMIN/index.js";
import { getName } from "../../controller/pageFunction.js";
import ReadBlogPage from "../ReadPage/index.js";
import { UseInforContex } from "../../Context/PagesContext.js";

function useBaseHook(){
    const [content, setContent] = useState(<Home />);
    const [currentSite, setCurrentSite] = useState("home");

    const changeSite = (site)=>{
        setCurrentSite(site);
        switch(site){
            case "home":
                setContent(<Home />);
                break;
            case "blog":
                setContent(<BlogManage />);
                break;
            case "c++":
                setContent(<Pages />);
                break;
            case "c#":
                setContent(<Pages />);
                break;
            case "admin":
                setContent(<AdminPages />);
                break;
            default:
                setContent("Loading faild");
        }
    }
    return [content, currentSite, changeSite];
} 

function Header(){

    const [searchContent, setContentsSeach] = useState('');
    const [isShow, setShow] = useState(false);
    const [content, currentSite, changeSite] = useBaseHook();
    const {userInfor} = useContext(UseInforContex);

    console.log("Header adadad");

    return(<>
        <header>
            <div className={"nav "+`${currentSite === "home" ? "active":""}`} onClick={()=>changeSite("home")}><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>
            <div className={"nav "+`${currentSite === "admin" ? "active":""}`} onClick={()=>changeSite("admin")}>ADMIN</div>
            <div className={"nav "+`${currentSite === "blog" ? "active":""}`} onClick={()=>changeSite("blog")}>BLOG</div>
            <div className={"nav "+`${currentSite === "javascript" ? "active":""}`} onClick={()=>changeSite("javascript")}>JAVASCRIPT</div>
            <div className={"nav "+`${currentSite === "c++" ? "active":""}`} onClick={()=>changeSite("c++")}>C++</div>
            <div className={"nav "+`${currentSite === "c#" ? "active":""}`} onClick={()=>changeSite("c#")}>C#</div>
            <div className={"nav "+`${currentSite === "java" ? "active":""}`} onClick={()=>changeSite("java")}>JAVA</div>
            <div className={"nav "+`${currentSite === "other" ? "active":""}`} onClick={()=>changeSite("other")}>OTHER</div>
          <div className='search'>
            <input 
            type='search' 
            name='search'
            placeholder='Search' 
            onChange={(e) => setContentsSeach(e.target.value)}
            value={searchContent}/>
            <div id='Search'><i className="fa-solid fa-magnifying-glass"></i></div>
          </div>
          <div className="account nav" onClick={()=>{setShow(true)}}>{userInfor.user_name || "Login" }</div>
            {isShow && <Account isShowForm={setShow} data={userInfor}/>}
        </header>
        <div id='contents'>
            <ReadBlogPage />
            {/* {content} */}
        </div>
    </>);
}

export default memo(Header);