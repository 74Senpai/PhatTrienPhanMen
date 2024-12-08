import { useState, useContext, useEffect, memo } from 'react';

import { MessageContex } from '../../Context/MessageContex';
import { UseInforContex } from '../../Context/PagesContext';

export default function ManageUserPage(){

    const [blogUsers, setBlogUsers] = useState([]);
    const {userInfor} = useContext(UseInforContex);
    const {setShowPopup} = useContext(MessageContex); 


    useEffect(()=>{
        const  getBlogUsers = async()=>{
            setShowPopup(pre=>({
                ...pre,
                message: "Fetch page informations",
                isShow: true,
                type: "infor"
            }));
    
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/user/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userInfor.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                const data = await response.json();
                const blogUsers = data.data;
                if (!response.ok || blogUsers == null) {
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Fail to get blog user infor",
                        isShow: true,
                        timeOut : 1500,
                        type: "error"
                    }));
                   
                }else{
                    setBlogUsers(blogUsers);
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Success",
                        isShow: true,
                        timeOut : 1500,
                        type: "done"
                    }));
                }
                
            } catch (error) {
                setShowPopup(pre=>({
                    ...pre,
                    message: "Fail to get blog user infor",
                    isShow: true,
                    timeOut : 1500,
                    type: "error"
                }));
            }
        }
        getBlogUsers();
    }, []);

    return(
        <div className='row-box'>
            <div className='title-infor-header'>
               <div className="user-name">User Name </div>
               <div className='user-email'>Email</div>
               <div className="user-day-signup">Day Signup</div>
               <div className="user-comment">Comments </div>
               <div className="user-author-account">Author Account</div>
            </div>
            {blogUsers &&
                blogUsers.map(user =>(
                    <div className='content-results' key={user.user_id}> 
                        <div className="user-name">{user.name}</div>
                        <div className='user-email'>{user.email}</div>
                        <div className="user-day-signup">{new Date(user.created_at).toLocaleDateString()}</div>
                        <div className="user-comment"> {`(${user.comment_count})`} </div>
                        <div className="user-author-account">{user.name_author || 'Chưa đăng ký'}</div>
                    </div>
                ))
            }

        </div>
    );
}