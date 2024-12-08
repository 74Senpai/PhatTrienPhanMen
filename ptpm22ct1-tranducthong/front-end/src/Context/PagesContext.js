import { createContext, useContext, useEffect, useState } from "react";
import Home from "../componests/BASE/Home";
import BlogManage from "../componests/Blog";
import ADMIN from "../componests/ADMIN";
import Pages, { AllTypePage } from "../componests/BASE/pages";
import ReadBlogPage from "../componests/ReadPage/index.js";

function useBaseHook() {
  const [content, setContent] = useState(<Home />);
  const [currentSite, setCurrentSite] = useState("home");
  const { blogTypes } = useContext(BlogTypesContext);
  const { pagesRef, setRef } = useContext(PagesRefContex);


  const changeSite = (site) => {
    if (site == currentSite) return;
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
      case "ALLTYPE":
        setContent(<AllTypePage />);
        break;
      default:
        const result = blogTypes.find(element => (element.type_name).toUpperCase() == site)
        if (result) {
          setContent(<Pages />);
          setRef(site, "HOME");
        } else {
          setContent(<ReadBlogPage />);
          setRef(site, 'TYPE');
        }
    }
  }
  return [content, currentSite, changeSite];
}

export const PagesSiteContex = createContext();
export function PagesSiteProvider({ children }) {
  const [content, currentSite, changeSite] = useBaseHook();

  return (
    <PagesSiteContex.Provider value={{ content, currentSite, changeSite }}>
      {children}
    </PagesSiteContex.Provider>
  );
}



export const BlogTypesContext = createContext();
export function BlogTypesProvider({ children }) {

  const [blogTypes, setBlogTypes] = useState([]);

  return (
    <BlogTypesContext.Provider value={{ blogTypes, setBlogTypes }}>
      {children}
    </BlogTypesContext.Provider>
  );

}

export const UseInforContex = createContext();
export function UseInforProvider({ children }) {
  const [userInfor, setUserInfor] = useState({
    token: ``,
    user_id: '',
    user_name: '',
    user_email: '',
    id_role: ''
  });

  return (
    <UseInforContex.Provider value={{ userInfor, setUserInfor }}>
      {children}
    </UseInforContex.Provider>
  );
}

export const PagesRefContex = createContext();
export function PagesRefProvider({ children }) {
  const [pagesRef, setPagesRef] = useState(['HOME']);

  const setRef = (current, beforRef) => {
    if (current === 'HOME' || current === 'RESET') {
      setPagesRef(['HOME']);
      return;
    }
    if (beforRef === 'HOME') {
      setPagesRef(['HOME', current]);
      return;
    }

    if (!pagesRef.some((args) => args == current)) {
      setPagesRef([...pagesRef, current]);
    }
  }

  return (
    <PagesRefContex.Provider value={{ pagesRef, setRef }}>
      {children}
    </PagesRefContex.Provider>
  );
}

export const UserRoleContex = createContext();
export function UserRoleProvider({ children }) {

  const { userInfor } = useContext(UseInforContex);
  const [userRole, setUserRole] = useState('GUESTS');
  useEffect(() => {

    const userRoleFetch = async () => {
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
          if (data.success && response.ok) {
            const role = data.data;
            setUserRole(role.name_role);
            console.log('afasdfas', userRole);
          }

        } catch (error) {
          console.log('Can not get user information');
        }
      } else {
        setUserRole('GUESTS');
      }
    }
    userRoleFetch();
  }, [userInfor.token]);

  return (
    <UserRoleContex.Provider value={{userRole}}>
      {children}
    </UserRoleContex.Provider>
  );
}

export const AuthorContex = createContext();
export const AuthorProvider = ({children})=>{
  
  const [myBlogs, setMyBolgs] = useState({});
  const [highestView, setHighestView] = useState(0);
  const [action, setAction] = useState({
    action : "none",
    value : 'none',
  });
  return(
    <AuthorContex.Provider value={{myBlogs, setMyBolgs, highestView, setHighestView , action, setAction}}>
      {children}
    </AuthorContex.Provider>
  )
}

export const MiniViewContex = createContext();
export const MiniViewProvider = ({children})=>{
  const [showView, setShowView] = useState(false);
  const [showPoint, setShowPoint] = useState('');

  return(
    <MiniViewContex.Provider value={{ setShowView , setShowPoint}}>
      {children}
    </MiniViewContex.Provider>
  )
}