import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import '../CSS/App.css';
import { Base } from './BASE';
import { getToken, aLink } from '../controller/pageFunction';
import { UseInforContex } from '../Context/PagesContext';
import { MessageContex } from '../Context/MessageContex';



function App() {

  const {setUserInfor} = useContext(UseInforContex);
  const {setShowPopup} = useContext(MessageContex);

  useEffect(function () {
    const getUserInfor = async () => {
      const token = getToken();
      if (token == null) return;
      try {

        const response = await fetch('http://127.0.0.1:8000/api/user/information', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        const userData = data.data;
        if (!response.ok && data.error ) {
          setShowPopup(pre => ({
            message: "Get user infor fails : " + data.message,
            isShow: true,
            timeOut: 2000,
            type: "error",
            action: 'none',
          }));
          return;
        }

        setUserInfor(pre => ({
          token: token,
          user_id: userData.user_id,
          user_name: userData.name,
          user_email: userData.email,
          id_role : userData.id_role
        }));

      } catch (error) {
        console.log('Can not get user information');
        setShowPopup(pre => ({
          message: "Send comment fail : " + error.message,
          isShow: true,
          timeOut: 2000,
          type: "error",
          action: 'none',
        }));
      }
    }

    getUserInfor();
  }, []);


  // useEffect(() => {
  //   const aLinks = document.getElementsByClassName('a-link');
  //   Array.from(aLinks).forEach((element) => {
  //     element.addEventListener('click', aLink);
  //   });
  
  //   return () => {
  //     Array.from(aLinks).forEach((element) => {
  //       element.removeEventListener('click', aLink);
  //     });
  //   };
  // }, []);

  console.log('App adad');
  return (<>
    <div className="app">
      <Base />
    </div>
  </>);
}

export default App;
