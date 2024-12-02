import { createContext, useContext, useState } from "react";
import Home from "../componests/BASE/Home";
import BlogManage from "../componests/Blog";
import ADMIN from "../componests/ADMIN";
import Pages from "../componests/BASE/pages";

function useBaseHook() {
  const [content, setContent] = useState(<Home />);
  const [currentSite, setCurrentSite] = useState("home");

  const changeSite = (site) => {
      setCurrentSite(site);
      site = site.toUpperCase();
      switch (site) {
          case "HOME":
              setContent(<Home />);
              break;
          case "BLOG":
              setContent(<BlogManage />);
              break;
          case "ADMIN":
              setContent(<ADMIN />);
              break;
          default:
              setContent(<Pages />);
      }
  }
  return [content, currentSite, changeSite];
}

export const PagesSiteContex = createContext();
export function PagesSiteProvider({children}){
  const [content, currentSite, changeSite] = useBaseHook();

  return (
    <PagesSiteContex.Provider value={{content, currentSite, changeSite}}>
      {children}
    </PagesSiteContex.Provider>
  );
}



export const BlogTypesContext = createContext();
export function BlogTypesProvider({children}){

  const [blogTypes, setBlogTypes ] = useState([]);

  return(
    <BlogTypesContext.Provider value={{blogTypes, setBlogTypes}}>
      {children}
    </BlogTypesContext.Provider>
  );

}

export const UseInforContex = createContext();
export function UseInforProvider({children}){
  const [userInfor, setUserInfor] = useState({
    token : ``,
    user_id : '',
    user_name : '',
    user_email : '',
    id_role : ''
  });

  return(
    <UseInforContex.Provider value={{userInfor, setUserInfor}}>
      {children}
    </UseInforContex.Provider>
  );
}

export const PagesRefContex = createContext();
export function PagesRefProvider({children}){
  const [pagesRef, setPagesRef] = useState(['HOME']);

  const setRef = ( current, beforRef )=>{
    if(current === 'HOME' || current === 'RESET'){
      setPagesRef(['HOME']);
      return;
    }
    if(beforRef === 'HOME'){
      setPagesRef(['HOME', current]);
      return;
    }else if( beforRef == 'TYPE'){

    }

    if(!pagesRef.some((args)=> args == current )){
      setPagesRef([...pagesRef, current]);
    }
  }

  return(
    <PagesRefContex.Provider value={{pagesRef, setRef}}>
      {children}
    </PagesRefContex.Provider>
  );
}