import { useState } from 'react';
import '../CSS/App.css';
import changePages from '../controller/handles.js';
import Header from './Header.js';
import Home from './Home.js';
import Footer from './Footer.js';
import { useContentsHook } from '../CustomHook/Contents.js';
import { PopupProvider } from '../Context/PagesContext.js';


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
    
  </>);
} 

export default App;
