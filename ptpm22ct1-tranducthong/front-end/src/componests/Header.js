import '../CSS/Header.css';
import { useState } from 'react';
import Account from './Login.js';


function Button({name, onClick}) {
    return (
      <div className='nav' onClick={() => onClick(name)}>{name}</div>
    );
  }
  
  function Header({ onChangePage }) {
    const [searchContent, setContentsSeach] = useState('');
    const [showLogin, setShow] = useState(false);
    return (<>
      <header>
        <div className="title nav" onClick={()=>{onChangePage('home')}}>LOGO</div>
        <Button name="IT" onClick={onChangePage} />
        <Button name="Daily Life" onClick={onChangePage} />
        <Button name="Sports" onClick={onChangePage} />
        <Button name="Game" onClick={onChangePage} />
        <Button name="News" onClick={onChangePage} />
        <Button name="World" onClick={onChangePage} />
        <div className='search'>
          <input 
          type='search' 
          name='search'
          placeholder='Search' 
          onChange={(e) => setContentsSeach(e.target.value)}
          value={searchContent}/>
          <div id='Search'><i class="fa-solid fa-magnifying-glass"></i></div>
        </div>
        <Button name="Login" onClick={()=>{setShow(true)}} />
      </header>
      {showLogin && <Account isShow={setShow} />}
  </>);
  }
  
export default Header;