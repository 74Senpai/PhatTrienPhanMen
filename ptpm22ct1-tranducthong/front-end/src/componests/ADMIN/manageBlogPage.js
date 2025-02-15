import { useState, useContext, useEffect, memo } from 'react';

import { MessageContex } from '../../Context/MessageContex';
import { UseInforContex } from '../../Context/PagesContext';


export default function ManageBlog(){

    const [blogBlogs, setblogBlogs] = useState([]);
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
                const response = await fetch('http://127.0.0.1:8000/api/admin/blog/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userInfor.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                const data = await response.json();
                const blogs = data.data;
                if (!response.ok ||  blogs == null) {
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Fail to get blogs infor",
                        isShow: true,
                        timeOut : 1500,
                        type: "error"
                    }));
                   
                }else{
                    setblogBlogs( blogs );
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
                    message: "Fail to get blogs infor",
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
               <div className="blog-name-blog">Blog title</div>
               <div className='blog-author-name'>Writer's name</div>
               <div className="blog-total-comment">Comments </div>
               <div className="blog-total-view">Total View</div>
               <div className="blog-types-name">Types</div>
            </div>
            {blogBlogs &&
                blogBlogs.map(blog=>(
                    <div className='content-results' key={blog.id_blog}>
                        <div className="blog-name-blog">{blog.name_blog}</div>
                        <div className='blog-author-name'>{blog.name_author}</div>
                        <div className="blog-total-comment">{`(${blog.total_comment})`} </div>
                        <div className="blog-total-view">{`(${blog.view})`}</div>
                        <div className="blog-types-name">
                            {blog.type_names && 
                                blog.type_names.map((type_names, index)=>(
                                    <div className='nav type-blog' key={index}>{type_names}</div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>

    );
}