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

