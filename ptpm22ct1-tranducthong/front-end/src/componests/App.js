import { useContext, useEffect } from 'react';

import '../CSS/App.css';
import { Base } from './BASE';
import { getToken, aLink } from '../controller/pageFunction';
import { UseInforContex, UserRoleContex } from '../Context/PagesContext';
import { MessageContex } from '../Context/MessageContex';



function App() {

  const { userInfor, setUserInfor } = useContext(UseInforContex);
  const { setShowPopup } = useContext(MessageContex);
  const { userRole } = useContext(UserRoleContex);

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
        if (!response.ok && data.error) {
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
          id_role: userData.id_role
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

  useEffect(function () {
    if (userInfor.user_id && (userRole === 'AUTHOR' || userRole === 'ADMIN')) {
      console.log('author-notification.user.' + userInfor.user_id);
      window.Echo.channel('author-notification.user.' + userInfor.user_id)
        .listen('AuthorEvent', (e) => {
          setShowPopup(pre => ({
            ...pre,
            message: e.message,
            isShow: true,
            timeOut: 1500,
            type: "infor",
            action: 'none',
          }));
          console.log(e.message);
        });

      return () => {
        window.Echo.leave('author-notification.user.' + userInfor.user_id);
      };
    }

  }, [userRole]);

  useEffect(function () {
    
    console.log('app-notification');
    window.Echo.channel('app-notification')
      .listen('AppNotification', (e) => {
        setShowPopup(pre => ({
          ...pre,
          message: e.message,
          isShow: true,
          timeOut: 1500,
          type: "infor",
          action: 'none',
        }));
        console.log(e.message);
      });

    return () => {
      window.Echo.leave('app-notification');
    };
    
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
