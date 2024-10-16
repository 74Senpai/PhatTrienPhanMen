import './CSS/BlogManage.css';
import { useEffect, useState, memo, useRef } from 'react';


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

const ACTION = {
    site : "site-wirte-blog-content",
    plus:"plus", 
    minus:"minus",
    codeSite : "code",
    bold : "bold",
    italic : "italic",
    underline : "underline",
    fontName: "fontName",
    createLink : "createLink",
    backColor : "backColor",
    insertOrderedList : "insertOrderedList",
    execCmdDOM : (site, command, value) => {
        const editableDiv = document.getElementById(site);
        document.execCommand(command, false, value);
        editableDiv.focus();
    }
};


function WriteBlog(){
    const [fontSize, setFontSize] = useState(4);
    const beforFontSize = useRef(0);
    console.log("write blog", fontSize);
    const [buttonState, setButtonState] = useState({
        bold_btn : false,
        italic_btn : false,
        underline_btn : false,
        insertOrderedList_btn : false,
        code_btn : false,
        markdown_btn : false,
    });

    const toggleButton = (button)=>{
        setButtonState(prev => ({
            ...prev,
            [button] :  !prev[button]
        }));
        console.log("Button State", buttonState);
    };

    useEffect(()=>{
        console.log("Event call", beforFontSize);
        const element = document.getElementById(ACTION.site);
        function handleKeyDown(){
            if(beforFontSize.current !== 0){
                setFontSize(beforFontSize.current);
                ACTION.execCmdDOM(ACTION.site, "fontSize", fontSize);
                beforFontSize.current = 0;
            }
        }
        element.addEventListener('keydown',handleKeyDown);

        return () => {
            element.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handlesFont = (action, value)=>{
        switch(action){
            case ACTION.plus:
                setFontSize(pre => {
                    const selObj = window.getSelection();
                    // alert(selObj);
                    const text = selObj.toString();
                    if(text !== "" && beforFontSize.current == 0){
                        beforFontSize.current = fontSize;
                    }
                   
                    const newFontSize = (pre + 1) > 7 ? 7 : (pre + 1);
                    ACTION.execCmdDOM(ACTION.site, "fontSize", newFontSize);
                    return newFontSize; // Cập nhật giá trị mới cho fontSize
                });
                break;
            case ACTION.minus:
                setFontSize(pre => {
                    const selObj = window.getSelection();
                    // alert(selObj);
                    const text = selObj.toString();
                    if(text !== "" && beforFontSize.current == 0){
                        beforFontSize.current = fontSize;
                    }
                    const newFontSize = (pre - 1) < 1 ? 1 : (pre - 1); 
                    ACTION.execCmdDOM(ACTION.site, "fontSize", newFontSize);
                    return newFontSize; // Cập nhật giá trị mới cho fontSize
                });
                break;
            case ACTION.backColor:
                ACTION.execCmdDOM(ACTION.site, action, value);
                break;
            // case ACTION.italic:
            //     ACTION.execCmdDOM(ACTION.site, "italic");
            //     toggleButton(action+"_btn");
            //     break;
            default:
                const selObj = window.getSelection();
                // alert(selObj);
                const text = selObj.toString();
                if(text === ""){
                    toggleButton(action+"_btn");
                }
                ACTION.execCmdDOM(ACTION.site, action);
        }
    };

    

    return(<>
        <div className='write-title-blog'>
            <input  type='textbox' maxLength="100" placeholder='Write you blog title here!!!'/>
            <button type='submit' className='nav'><i className="fa-regular fa-paper-plane"></i></button>
        </div>
        <div className='write-option' draggable="true">
            <button 
                className={"nav "+`${buttonState.bold_btn === true ? "active":""}`}
                onClick={()=>{
                    handlesFont(ACTION.bold)}}>
                <i className="fa-solid fa-bold"></i>
            </button>
            <button 
                className={"nav "+`${buttonState.italic_btn === true ? "active":""}`} 
                onClick={()=>handlesFont(ACTION.italic)}>
                <i className="fa-solid fa-italic"></i>
            </button>
            <button 
                className={"nav "+`${buttonState.underline_btn === true ? "active":""}`} 
                onClick={()=>handlesFont(ACTION.underline)}>
                <i className="fa-solid fa-underline"></i>
            </button>
            <button className='nav' onClick={()=>handlesFont(ACTION.backColor)}>
                <i className="fa-solid fa-font"></i>
            </button>
            <button className='nav' onClick={()=>handlesFont(ACTION.plus)}>
                <i class="fa-solid fa-plus"></i>
            </button>
            <input 
                // readOnly
                className='nav' 
                value={fontSize} type='number' 
                readOnly
                
                />
            <button className='nav' 
                onClick={()=>handlesFont(ACTION.minus)}>
                <i class="fa-solid fa-minus"></i>
                </button>
            <button 
                className={"nav "+`${buttonState.insertOrderedList_btn === true ? "active":""}`}  
                onClick={()=>handlesFont(ACTION.insertOrderedList)}>
                <i className="fa-solid fa-list"></i>
            </button>
            <button className='nav' onClick={()=>handlesFont(ACTION.createLink, "red")}>
                <i className="fa-solid fa-link"></i>
            </button>
            <button className='nav onlyone'  onClick={()=>handlesFont(ACTION.codeSite)}>
                <i className="fa-solid fa-code"></i>
            </button>
            <button className='nav onlyone'><i className="fa-brands fa-markdown"></i></button>
        </div>
        <div id='site-wirte-blog-content' 
            contentEditable="true">
            
        </div>
        <div id="hidden" style={{display : "none !important"}}></div>
    </>);
}

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
