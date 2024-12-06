import './CSS/BlogManage.css';
import { useEffect, useState, useContext } from 'react';
import WriteBlog from './WriteBlog';
import { MessageContex } from '../../Context/MessageContex';
import { UseInforContex, AuthorContex } from '../../Context/PagesContext';

function Nav({children, ...navProps}){

    return(<>
        <button {...navProps}>{children}</button>
    </>);
}

function NavColums({children}){
    return(<>
        <div className="colum-nav">
            {children}
        </div>
    </>);
}

function Blog({blog_title, blog_types, day_create, blog_view, comments}){
    const {setHighestView} = useContext(AuthorContex);

    setHighestView(pre => pre < blog_view ? blog_view : pre);
    return(<>
        <div className='box-blog'>
            <div className='blog-title'>{blog_title}</div>
            <div className='blog-type'>
                {blog_types.map((type, index) => (<span key={index}>{type} </span> ))}
            </div>
            <div className='date-upblog'>{day_create}</div>
            <div className='blog-view'>VIEW:{blog_view}</div>
            <div className='blog-comment'>COMMENTS: {comments}</div>
        </div>
    </>);
}

function ToolBar(){
    return(<>
        <div className='tool-bar'>
            <div className='type-count'>
                <select>
                    <option value="all-blog">All Blog</option>
                    <option value="blog-today">Today</option>
                    <option value="this-week">Week</option>
                    <option value="this-month">Month</option>
                </select>
            </div>
            <div className='manage-blog-button'>
                <button className='manage-blog-btn nav'>MANAGE</button>
            </div>
    </div>
    </>);
}

function BlogsCount(){

    const {userInfor} = useContext(UseInforContex);
    const {setShowPopup} = useContext(MessageContex);
    const {myBlogs, setMyBolgs, setHighestView} = useContext(AuthorContex);

    useEffect(()=>{
        const fetchBlogByAuthor = async()=>{
            setShowPopup( pre=>({
                message : "Get author blogs",
                isShow : true,
                type : "infor",
                action : 'none',
                filter : false
            }));
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/author/blog/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userInfor.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json(); // Parse JSON from the response
                    const dataBlog = data.data;
                    // console.log('Data blog id 1:', dataBlog);
                    setMyBolgs(dataBlog);
                    setShowPopup(pre => ({
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
                setShowPopup( pre=> ({
                    message : "Failed to fetch",
                    isShow : true,
                    timeOut : 1500,
                    type : "error",
                    action : 'none',
                    filter : true
                }));
                console.error('Error fetching data:', error);
            }
        }

        fetchBlogByAuthor();
    }, []);

    return(<>
    <ToolBar />
    <div className='blog-result'>
        {myBlogs != {} &&
            Object.values(myBlogs).map(blog => (
                <Blog 
                    key={blog.blog_id}
                    blog_title={blog.name_blog} 
                    blog_types={blog.type_names}
                    blog_view={blog.view}
                    day_create={blog.updated_at}
                />
            ))
        }
    </div>
    </>);
}

function BlogViewHeight({blog_id, heightValue, widthValue, blog}){

    return(<>
        <div className='view-height' 
            id={"view-height" + blog_id } 
            style={ {height : heightValue, width: widthValue+"%"}}>
            <label 
                htmlFor={"view-height" + blog_id} 
                className='label-view-height'
                style={{fontSize: (widthValue > 5 ? "1" :widthValue/5) +"rem"}}>
                Blog {blog_id}
            </label>
        </div>
        <div className='popup-box' id={'popup-id'+blog_id} key={blog_id} >
                NAME: {blog.name_blog}
        </div>
    </>);
}

function Statistical(){

    const {myBlogs, setMyBolgs, highestView} = useContext(AuthorContex);
    const [widthValue, setWidthValue] = useState("");

    useEffect(()=>{
        setWidthValue(100 / 23);
    }, []);

    return(<>
        <div className='view-statistical'>
            <div className='all-time-view'>ALL TIME VIEW : </div>
        </div>
        <div className='board-statistical'>
            {myBlogs && 
                Object.values(myBlogs).map((blog , index)=>(
                    <BlogViewHeight key={index} 
                        blog_id={blog.id_blog} 
                        heightValue={(blog.view / highestView  * 100 ) * (50 /  1600) * 100 } 
                        blog={blog}
                        widthValue={widthValue}/>
                ))
            }
        </div>
    </>);
}

function CommentContent({user_name, children}){

    return(<>
    <div className='box-comment'>
        <div className='name-user-comment'>{user_name}</div>
        <div className='user-comment-content'>{children}</div>
    </div>
    </>);
}

function BlogComment({title, commentCount}){

    

    return(<>
        <div className='blog-title-comment'>{title}</div>
        <div className='comments-count'>Comments {`(${commentCount})`}
            <CommentContent user_name={"Thong Thai"}>
                Oh mai got oh mai got dfjkasfklasklfjaklsjfkljklj faklsfjklsjf dfklsajf afas jkljd adfsadfkj asfsd klj asdfsak safsf fsd casdf afs 
            </CommentContent> 
            <CommentContent user_name={"Thong Minh"}>
                Oh mai tao tau 
            </CommentContent>
        </div>
    </>);
}

function CommentCount(){
    
    return(<>
        <ToolBar />
        <div className='comments-result'>
            <BlogComment title={"Hom nay hoc JAVA"} commentCount={8}/>
            <BlogComment title={"Hom nay hoc JAVA"} commentCount={8}/>
            <BlogComment title={"Hom nay hoc JAVA"} commentCount={8}/>
        </div>
    </>);
};





function useBlogNav(){

    const [contents, setContents] = useState(<BlogsCount />);
    const [currentNav, setCurrentNav] = useState("posts");

    const changeNav = (nav)=>{ 
        setCurrentNav(nav);
        switch(nav){
            case "posts":
                setContents(<BlogsCount />);
                break;
            case "statistical":
                setContents(<Statistical />);
                break;
            case "comments":
                setContents(<CommentCount />);
                break;
            case "newblog":
                setContents(<WriteBlog />);
                break;
        }
    };

    return[contents, currentNav, changeNav];
}


export default function BlogManage(){
   
    const [content, currentNav, changeNav] = useBlogNav();
    console.log("Re-render");
    const {setShowPopup} = useContext(MessageContex);
    
    return(<>
        <div className="BlogManage">
            <NavColums>
                <Nav className={"nav " +`${currentNav === "posts" ? "active":""}`} onClick={()=>changeNav("posts")}>Bài đăng</Nav>
                <Nav className={"nav "+`${currentNav === "statistical" ? "active":""}`} onClick={()=>changeNav("statistical")}>Thống kê</Nav>
                <Nav className={"nav "+`${currentNav === "comments" ? "active":""}`} onClick={()=>changeNav("comments")}>Nhận xét</Nav>
                <Nav className={"nav "+`${currentNav === "newblog" ? "active":""}`} onClick={()=>changeNav("newblog")}>Thêm Blog</Nav>
            </NavColums>
            <div className='dashboard'>
                {content}
            </div>
            {currentNav !== "newblog" && 
            <button className="new-post nav" onClick={()=>changeNav("newblog")}>
                <i className="fa-solid fa-plus"></i>
            </button>}
        </div>
    </>);
};
