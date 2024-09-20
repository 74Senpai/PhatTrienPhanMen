import { useState } from 'react';
import '../CSS/App.css';
import changePages from '../controller/handles.js';
import Header from './Header.js';
import Home from './Home.js';


function App() {
  const [contents, setContents] = useState(<Home />);
  
  return (<>
    <div className="app">
      <Header onChangePage={(site)=>changePages(site, setContents)}/>
      {contents} 
    </div>
  </>);
} 

export default App;
