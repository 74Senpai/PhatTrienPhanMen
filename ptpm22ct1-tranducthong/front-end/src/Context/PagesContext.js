import { createContext, useContext, useState } from "react";

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