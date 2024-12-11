import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import './CSS/ReadBlogPage.css';
// import { token } from '../../controller/pageFunction';
import { UseInforContex, PagesSiteContex } from '../../Context/PagesContext';
import { MessageContex } from '../../Context/MessageContex';
import {csrollToTop, wrapUrls, aLink} from '../../controller/pageFunction.js';



export default function ReadBlogPage() {

    const[markdown, setMarkDown] = useState('');
    const[HTML, setHTML] = useState('');
    const[blogContent, setblogContent] = useState('');
    const[listBlog, setListBlog] = useState({});
    const {userInfor} = useContext(UseInforContex);
    const [comments, setComments] = useState({});
    const {setShowPopup} = useContext(MessageContex);
    const [contentComment, setContentComment] = useState('');
    const {currentSite, changeSite} = useContext(PagesSiteContex); 
    const {blogType, nameBlog} = useParams();
    const [isSendComment, setIsSendComment] = useState(false);

    useEffect( function (){
        csrollToTop();
        const fetchData = async () => {
            setShowPopup( pre=>({
                message : "Loading ... ",
                isShow : true,
                type : "infor",
                action : 'none',
            }));
            
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/public/blog/name=${nameBlog}`);
                if (response.ok) {
                    const data = await response.json(); // Parse JSON from the response
                    const dataBlog = data.data;
                    // console.log('Data blog id 1:', dataBlog);
                    setblogContent(dataBlog);
                    if (dataBlog.show_type === 2) {
                        console.log(dataBlog.content_blog);
                        setMarkDown(dataBlog.content_blog);
                        setHTML('');
                    } else {
                        setHTML(dataBlog.content_blog);
                        setMarkDown('');
                    }

                    setShowPopup( pre=>({
                        message : "Done",
                        isShow : true,
                        timeOut : 1500,
                        type : "done",
                        action : 'none',
                        filter : false
                    }));
                } else {
                    console.error('Failed to fetch:', response.status, response.statusText);
                    setShowPopup( pre=>({
                        message : "Failed to fetch",
                        isShow : true,
                        timeOut : 1500,
                        type : "error",
                        action : 'none',
                        filter : true
                    }));
                }
            } catch (error) {
                setShowPopup( pre=>({
                    message : "Failed to fetch",
                    isShow : true,
                    timeOut : 1500,
                    type : "error",
                    action : 'none',
                    filter : true
                }));
                console.error('Error fetching data:', error);
            }
        };

        const fetchListBlog = async ()=>{
            try {
                const response = await fetch('http://127.0.0.1:8000/api/public/blog/all');
                if (response.ok) {
                    const data = await response.json(); // Parse JSON from the response
                    const listBlog = data.data;
                    setListBlog(listBlog);
                } else {
                    console.error('Failed to fetch:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
        fetchListBlog();
    }, [blogType, nameBlog]);


    useEffect(function(){
        const fetchBlogComments = async ()=>{
            if(blogContent){
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/public/comment/blog/id=${blogContent.id_blog}`);
                    if (response.ok) {
                        const data = await response.json(); // Parse JSON from the response
                        const listComments = data.data;
                        setComments(listComments);
                    } else {
                        console.error('Failed to fetch:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchBlogComments();
    }, [blogContent, isSendComment]);

    const handleSendComment = async ()=>{
        if(!userInfor.token){
            setShowPopup( pre=>({
                message : "Please login to comment",
                isShow : true,
                timeOut : 2000,
                type : "error",
                action : 'none',
            }));
            return;
        }

        if(!contentComment){
            setShowPopup( pre=>({
                message : "Please enter comment content",
                isShow : true,
                timeOut : 1000,
                type : "warring",
                action : 'none',
            }));
            return;
        }

        setShowPopup( pre=>({
            message : "Send comment ...",
            isShow : true,
            type : "infor",
            action : 'none',
        }));
        
        setIsSendComment(false);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/comment/create-new', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfor.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_blog: blogContent.id_blog,
                    content_comment: contentComment,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setShowPopup( pre=>({
                    message : "Send comment fail : "+data.message,
                    isShow : true,
                    timeOut : 2000,
                    type : "error",
                    action : 'none',
                }));
                throw new Error(data.message || 'Send comment fail');
            }else{
                setShowPopup( pre=>({
                    message : "Send comment successfully",
                    isShow : true,
                    timeOut : 1500,
                    type : "done",
                    action : 'none',
                })); 
                setIsSendComment(true);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            setShowPopup( pre=>({
                message : "Send comment fail : "+error.message,
                isShow : true,
                timeOut : 2000,
                type : "error",
                action : 'none',
            }));
            console.error('Error :', error.message);
        }
    }

    const handleClick = (e) => {
        if (e.target.classList.contains("a-link")) {
          aLink(e);
        }
    };

    useEffect(function (){
        if(blogContent.id_blog){
            console.log('comments-channel.blog.'+blogContent.id_blog);
            window.Echo.channel('comments-channel.blog.'+blogContent.id_blog)
            .listen('CommentsEvent', (e)=>{
                setIsSendComment(true);
            });
            
            return () => {
                window.Echo.leave('comments-channel.blog.' + blogContent.id_blog);
            };
        }
        
    }, [blogContent.id_blog]);

    return (<>
        {/* <PageRef /> */}
        <div className='read-blog-page-main'>
            <div className='read-blog-page-top'>
                <div className='list-blog'>
                    <div>
                    {listBlog &&
                        Object.values(listBlog).map((blog) => (
                            <div key={blog.id_blog} 
                                onClick={()=>changeSite(blog.name_blog)}
                                className='nav blog-list-children'>
                                <Link to={"/blog-type/"+blog.type_names[0]+"/"+blog.name_blog} className='nav'>
                                    {blog.name_blog}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
               
                <div className='read-blog-content'>
                    <div className='read-blog-title'>{blogContent.name_blog}</div>
                    <div className='date-up-blog'>Cre: {new Date(blogContent.updated_at).toLocaleString()} by {blogContent.name_author}</div>
                    <div className='read-content'>
                    {markdown &&
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {markdown}
                        </ReactMarkdown>
                    }
                    {HTML && 
                        <div dangerouslySetInnerHTML={{ __html: HTML }} />
                    }
                    </div>
                </div>
            </div>
            <div className='read-blog-page-bot'>
                <div className='read-other-blog'>
                    <div><button className='nav'>Previous</button></div>
                    <div><button className='nav'>Next</button></div>
                </div>
                <div className='read-blog-comments'>
                    <div className='write-comments'>
                        <div className='header-write-content'>
                            <div className='blog-comments-count'>Comments {`(${ comments ? (Object.keys(comments)).length : '0'})`}</div>
                            {!userInfor.token &&
                                <div className='request-login nav'>LOGIN | SIGN UP to Comment</div>
                            }
                        </div>
                        
                        <textarea 
                            className='write-comment' 
                            onChange={ (e)=>setContentComment(e.target.value) }
                            value={contentComment}
                            placeholder='Bạn đang nghĩ gì ?' >
                            
                        </textarea>
                        <div className='send-comment-button'>
                            <button className='nav' onClick={handleSendComment}> SEND </button>
                        </div>
                    </div>
                    <div className='reader-comments'>
                        <div className='reader-comment'>
                            {comments ?
                                Object.values(comments).map( comment => (<React.Fragment key={comment.id_comment}>
                                    <div className='reader-name' >
                                        {comment.name}
                                    </div>
                                    <div className='reader-comment-content'>
                                        {/* {wrapUrls(comment.content_comment , '<a> ', ' </a>')} */}
                                        <div 
                                            dangerouslySetInnerHTML={{
                                                __html: `<pre>${wrapUrls(comment.content_comment, '<span class="a-link">', '</span>')}</pre>`
                                            }}
                                            onClick={handleClick} />
                                        <div className='comment-action'>
                                            {comment.user_id == userInfor.user_id &&<>
                                             <div className='nav action'><i className="fa-regular fa-pen-to-square"></i></div>
                                             <div className='nav action'><i className="fa-solid fa-trash"></i></div>
                                            </>}
                                            <div className='nav action'><i className="fa-solid fa-reply"></i></div>
                                            <div className='date-up-blog'>{comment.day_comment} </div>   
                                        </div> 
                                    </div>
                                </React.Fragment>)) : 'No comment in blog'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>);
}