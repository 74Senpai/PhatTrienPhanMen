
import '../CSS/App.css';
import { Base } from './BASE';
import { MessageContex } from '../Context/MessageContex';
import Loading from './Loading/Loading';
import { useContext, memo } from 'react';



function App() {
  
  const {showPopup} = useContext(MessageContex);

  console.log('App adad');
  return (<>
    <div className="app">
      <Base />
    </div>  
  </>);
} 

export default App;
