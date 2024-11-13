
import '../CSS/App.css';
import { Base } from './BASE';
import { MessageContex } from '../Context/MessageContex';
import Loading from './Loading/Loading';
import { useContext } from 'react';



function App() {
  
  return (<>
    <div className="app">
      <Base />
    </div>  
  </>);
} 

export default App;
