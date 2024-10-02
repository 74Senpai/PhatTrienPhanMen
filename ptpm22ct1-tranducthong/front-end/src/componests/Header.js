import '../CSS/Header.css';
import { useState } from 'react';
import changePages from '../controller/handles.js';
import { usePopupView } from '../CustomHook/LoginHook.js';
import Account from './Login.js';

function Button({name, onClick}) {
    return (
      <div className="nav" id={name} onClick={() => onClick(name)}>{name}</div>
    );
  }
  
function getName(){
    let user_data; 
    try{
      let data = localStorage.getItem("user_data");
      user_data = JSON.parse(data);
      
    }catch(err){
      return false;
    }
  
    return user_data; 
}

  function Header({ onChangePage }) {
    const [searchContent, setContentsSeach] = useState('');
    // const [popup, viewPopup] = usePopupView();
    const [isShow, setShow] = useState(false);
    // viewPopup(<Account />);
    const data = getName();
    const userName = data.name;

    return (<>
      <header>
        <div className="title nav" id="home" onClick={()=>{onChangePage('home')}}><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>
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
        <div className="account nav" onClick={()=>{setShow(true)}}>{ data && userName || "Login" }</div>
      </header>
      {isShow && <Account isShowForm={setShow} data={data}/>}
      
  </>);
  }
  
export default Header;