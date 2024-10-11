import { useState } from 'react';
import '../CSS/App.css';
import changePages from '../controller/handles.js';
import Header from './Header.js';
import Home from './Home.js';
import Footer from './Footer.js';
import { useContentsHook } from '../CustomHook/Contents.js';
import Loading from './Loading/Loading.js';


function App() {
  // const [contents, setContents] = useState(<Home />);
    const [contents, changeContents] = useContentsHook();
  return (<>
    <div className="app">
      <Header onChangePage={(site)=>changePages(site, changeContents)}/>
      <div id='contents'>
        {contents} 
      </div>
      <Footer />
    </div>  
    <Loading isShow={false} mess={"Hom nay troi dep vl"} type={"error"}/>  
  </>);
} 

export default App;
