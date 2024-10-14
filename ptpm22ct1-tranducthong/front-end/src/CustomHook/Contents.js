import { useState } from "react";
import Home from "../componests/BASE/Home.js";

export function useContentsHook(){
    const [contents, setContents] = useState(<Home />);

    const changeContents = (newContent)=>{ setContents(newContent)};

    return[contents, changeContents];
}