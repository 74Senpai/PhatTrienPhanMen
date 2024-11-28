import './CSS/ReadBlogPage.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useContext, useEffect, useState } from 'react';
// import { token } from '../../controller/pageFunction';
import { UseInforContex } from '../../Context/PagesContext';



export default function ReadBlogPage() {

    const[markdown, setMarkDown] = useState('');
    const[HTML, setHTML] = useState('');
    const[blogContent, setblogContent] = useState('');
    const[listBlog, setListBlog] = useState({});
    const {userInfor} = useContext(UseInforContex);

    useEffect( function (){
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/public/blog/id=4');
                if (response.ok) {
                    const data = await response.json(); // Parse JSON from the response
                    const dataBlog = data.data;
                    // console.log('Data blog id 1:', dataBlog);
                    setblogContent(dataBlog);
                    if (dataBlog.show_type === 2) {
                        console.log(dataBlog.content_blog);
                        setMarkDown(dataBlog.content_blog);
                    } else {
                        setHTML(dataBlog.content_blog);
                    }
                } else {
                    console.error('Failed to fetch:', response.status, response.statusText);
                }
            } catch (error) {
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
    }, []);

    useEffect(function(){
        const fetchBlogInfor = async ()=>{
            try {
                const response = await fetch('http://127.0.0.1:8000/api/public/author/id=4');
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
    }, [listBlog]);
    return (
        <div className='read-blog-page-main'>
            <div className='read-blog-page-top'>
                <div className='list-blog'>
                    <div>
                    {listBlog &&
                        Object.values(listBlog).map((blog, index) => (
                            <div key={blog.id_blog} className='nav blog-list-children'>
                                {blog.name_blog}
                            </div>
                        ))}
                    </div>
                </div>
               
                <div className='read-blog-content'>
                    <div className='read-blog-title'>{blogContent.name_blog}</div>
                    <div className='date-up-blog'>{new Date(blogContent.updated_at).toLocaleDateString()}</div>
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
                            <div className='blog-comments-count'>Comments {`(0)`}</div>
                            {!userInfor.token &&
                                <div className='request-login nav'>LOGIN | SIGN UP to Comment</div>
                            }
                        </div>
                        
                        <textarea className='write-comment' placeholder='What do you thing ?'>

                        </textarea>
                        <div className='send-comment-button'>
                            <button className='nav'> SEND </button>
                        </div>
                    </div>
                    <div className='reader-comments'>
                        <div className='reader-comment'>
                            <div className='reader-name'>Thong</div>
                            <div className='reader-comment-content'>Hello World</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}