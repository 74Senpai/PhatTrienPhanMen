// import Header from "./Header.js";
import Home from "./Home.js";
import Footer from "./Footer.js";
import Pages from "./pages.js";
import Account from "../Login_Sigup_Account/Login.js";
import { useState } from "react";
import BlogManage from "../Blog/Blog.js";
import Loading from "../Loading/Loading.js";
import "../BASE/CSS/Header.css";

function getName(){
    let user_data; 
    try{
      let data = localStorage.getItem("user_data");
      user_data = JSON.parse(data);
      
    }catch(err){
      return false;
    }
    return user_data; 
}


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

    const data = getName();
    let tmp;
    if(data)
      tmp = data.name;
    const userName = tmp;

    return(<>
        <header>
            <div className={"nav "+`${currentSite === "home" ? "active":""}`} onClick={()=>changeSite("home")}><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>
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
            <div id='Search'><i class="fa-solid fa-magnifying-glass"></i></div>
          </div>
          <div className="account nav" onClick={()=>{setShow(true)}}>{ data && userName || "Login" }</div>
            {isShow && <Account isShowForm={setShow} data={data}/>}
        </header>
        <div id='contents'>
            {content}
        </div>
    </>);
}

export function Base(){

    return (<>
        <Header />
        <Footer />
        
    </>);
}