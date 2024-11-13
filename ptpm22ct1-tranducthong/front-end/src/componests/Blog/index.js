import './CSS/BlogManage.css';
import { useEffect, useState, useContext } from 'react';
import WriteBlog from './WriteBlog';
import { MessageContex } from '../../Context/MessageContex';

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

function Blog(){
    return(<>
        <div className='box-blog'>
            <div className='blog-title'>Hihihi</div>
            <div className='blog-type'>TYPE: JAVA, JAVA CO BAN</div>
            <div className='date-upblog'>20/08/2024</div>
            <div className='blog-view'>VIEW: 100.000</div>
            <div className='blog-comment'>COMMENTS: 3</div>
            <div className='blog-like'>LIKE: 10</div>
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
    return(<>
    <ToolBar />
    <div className='blog-result'>
        <Blog />
        <Blog />
        <Blog />
        <Blog />
    </div>
    </>);
}

function BlogViewHeight({blog_id, heightValue, widthValue}){

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
        
    </>);
}

function Statistical(){

    const [widthValue, setWidthValue] = useState("");
    useEffect(()=>{
        setWidthValue(100 / 23);
    }, []);

    return(<>
        <div className='view-statistical'>
            <div className='all-time-view'>ALL TIME VIEW : </div>
        </div>
        <div className='board-statistical'>
            <BlogViewHeight blog_id={"1"} heightValue="25%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"2"} heightValue="10%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"3"} heightValue="35%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"4"} heightValue="45%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"5"} heightValue="75%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"6"} heightValue="90%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"7"} heightValue="75%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"8"} heightValue="43%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"9"} heightValue="5%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"10"} heightValue="20%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"11"} heightValue="93%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"12"} heightValue="50%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"13"} heightValue="78%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"14"} heightValue="33%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"15"} heightValue="75%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"16"} heightValue="90%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"17"} heightValue="75%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"18"} heightValue="43%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"19"} heightValue="5%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"20"} heightValue="20%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"21"} heightValue="93%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"22"} heightValue="50%" widthValue={widthValue}/>
            <BlogViewHeight blog_id={"23"} heightValue="78%" widthValue={widthValue}/>
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
