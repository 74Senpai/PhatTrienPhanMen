import { useState, useContext, useEffect, memo } from 'react';

import { MessageContex } from '../../Context/MessageContex';
import { UseInforContex } from '../../Context/PagesContext';


export default function ManageAuthorPage(){

    const [blogAuthors, setBlogAuthors] = useState([]);
    const {userInfor} = useContext(UseInforContex);
    const {setShowPopup} = useContext(MessageContex); 

    useEffect(()=>{
        const  getBlogAuthors = async()=>{
            setShowPopup(pre=>({
                ...pre,
                message: "Fetch page informations",
                isShow: true,
                type: "infor"
            }));
    
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/author/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userInfor.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                const data = await response.json();
                const blogAuthors = data.data;
                if (!response.ok || blogAuthors == null) {
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Fail to get blog author infor",
                        isShow: true,
                        timeOut : 1500,
                        type: "error"
                    }));
                   
                }else{
                    setBlogAuthors(blogAuthors);
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
                    message: "Fail to get blog author infor",
                    isShow: true,
                    timeOut : 1500,
                    type: "error"
                }));
            }
        }
        getBlogAuthors();
    }, []);

    return(
        <div className='row-box'>
            <div className='title-infor-header'>
                <div className="author-name">Writer's name </div>
                <div className='author-email'>Email</div>
                <div className="author-phone">Phone Number</div>
                <div className="author-total-blog">Total Blog </div>
                <div className="author-total-view">Total View</div>
            </div>
            {blogAuthors &&
                blogAuthors.map(author => (
                    <div className='content-results' key={author.id_author}>
                        <div className="author-name">{author.name_author}</div>
                        <div className='author-email'>{author.email}</div>
                        <div className="author-phone">{author.phone_number}</div>
                        <div className="author-total-blog">{(`(${author.total_blog || '0'})`)}</div>
                        <div className="author-total-view">{(`(${author.total_view || '0'})`)}</div>
                    </div>
                ))
            }
        </div>
    )
}