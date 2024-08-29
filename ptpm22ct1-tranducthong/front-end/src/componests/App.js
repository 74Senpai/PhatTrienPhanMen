import { useState } from 'react';
import '../CSS/App.css';
import changePages from '../controller/handles.js';
import Header from './Header.js';
import Pages from './pages.js';

function App() {
  const [contents, setContents] = useState(<Pages />);

  return (
    <div className="app">
      <Header onChangePage={ (site)=> changePages(site, setContents)} />
      {contents}
    </div>
  );
} 

export default App;
