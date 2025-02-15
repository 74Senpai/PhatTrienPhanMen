// import './CSS/BlogManage.css';
import { useEffect, useState, memo, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { Editor, EditorState,  RichUtils, convertFromHTML, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';

import WriteConfigBtn from './TextEditor';
import { AuthorContex, BlogTypesContext, UseInforContex } from '../../Context/PagesContext';
import { MessageContex } from '../../Context/MessageContex';


export default function WriteBlog(){


    const [buttonState, setButtonState] = useState({
        bold_btn : false,
        italic_btn : false,
        underline_btn : false,
        insertOrderedList_btn : false,
        code_btn : false,
        markdown_btn : false,
        overview_btn : false,
    });
   
    const {setShowPopup} = useContext(MessageContex); 
    const {blogTypes} = useContext(BlogTypesContext);
    const {userInfor} = useContext(UseInforContex);
    const {onEditBlog, setOnEditBlog} = useContext(AuthorContex);
    const [markdown, setMarkDown] = useState('');
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');

    
    
    const editorRef = useRef(null);

    const focusEditor = () => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [errorMessage, setErrorMessage] = useState({
        title : "",
        content : "",
        type_blog : ""
    });

    const [describe, setDescribe] = useState('');
    
    const handleEditorChange = (newState) => {
        setEditorState(newState);
        if(buttonState.markdown_btn){
            setMarkDown((editorState.getCurrentContent()).getPlainText());
        }else if(buttonState.code_btn){
            setCode((editorState.getCurrentContent()).getPlainText());
        }
    };

    const toggleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
        // focusEditor();
    };

   
    const handleSubmitBlog = async (e) => {
        e.preventDefault();
    
        let validateData = true;
    
        // Kiểm tra tiêu đề
        if (title === "") {
            setErrorMessage((prev) => ({
                ...prev,
                title: "Please insert blog title !!!",
            }));
            validateData = false;
        }
    
        // Kiểm tra nội dung blog
        let content_blog;
        let show_type = 0;
        if (
            editorState.getCurrentContent().getBlockMap().size === 0 ||
            editorState.getCurrentContent().getPlainText() === ""
        ) {
            setErrorMessage((prev) => ({
                ...prev,
                content: "Please insert content blog !!!",
            }));
            validateData = false;
        } else {
            if (buttonState.code_btn) {
                content_blog = code;
                show_type = 1;
            } else if (buttonState.markdown_btn) {
                content_blog = markdown;
                show_type = 2;
            } else {
                content_blog = stateToHTML(editorState.getCurrentContent());
                show_type = 3;
            }
        }
    
        // Thu thập các thể loại blog
        let type_blog = document.querySelectorAll("input.type-checkbox:checked");
        let select_values = Array.from(type_blog).map((input) => input.value);
    
        if (select_values.length === 0) {
            setErrorMessage((prev) => ({
                ...prev,
                type_blog: "Please choose blog type !!!",
            }));
            validateData = false;
        }
    
        // Thu thập mô tả và hình ảnh
        
        const thumbnail = document.getElementById("imageInput").files[0];
    
        if (!thumbnail) {
            setErrorMessage((prev) => ({
                ...prev,
                thumbnail: "Please choose a blog thumbnail !!!",
            }));
            validateData = false;
        }

        if(!describe){
            setErrorMessage((prev) => ({
                ...prev,
                describe: "Please write blog describe !!!",
            }));
            validateData = false;
        }
    
        if (!validateData) return;
    
        setShowPopup((prev) => ({
            ...prev,
            message: "Creating blog...",
            isShow: true,
            type: "infor",
        }));
    
        // Sử dụng FormData để gửi dữ liệu
        const formData = new FormData();
        if(onEditBlog.isEdit){
            formData.append("id_blog", onEditBlog.id_blog);
        }
        formData.append("name_blog", title);
        formData.append("content_blog", content_blog);
        select_values.forEach(value => {
            formData.append('type_blog[]', value);
        });
        formData.append("show_type", show_type);
        formData.append("blog_describe", describe);
        formData.append("thumbnail", thumbnail);
        console.log([...formData]);
        
        try {
            const response = await fetch((onEditBlog.isEdit && onEditBlog.editURL )
                                        || "http://127.0.0.1:8000/api/author/blog/create-new", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userInfor.token}`,
                },
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setShowPopup((prev) => ({
                    ...prev,
                    message: "Blog"+(onEditBlog.isEdit ? " edit " : "create ")+"successfully!",
                    isShow: true,
                    type: "done",
                    timeOut: 2000,
                }));
                setOnEditBlog( pre => ({
                    ...pre,
                    id_blog : '',
                    blog : {},
                    isEdit : false,
                }));
                setTitle('');
                setEditorState(EditorState.createEmpty());
                setDescribe('');
            } else {
                throw new Error(data.message || "An error occurred.");
            }
        } catch (error) {
            console.log("Error:", error);
            setShowPopup((prev) => ({
                ...prev,
                message: "Failed to create blog: " + error.message,
                isShow: true,
            }));
        }
    };
    
    useEffect(()=>{
        setTitle('');
        setEditorState(EditorState.createEmpty());
        setDescribe('');
        
        if(onEditBlog.isEdit){
            const blog = onEditBlog.blog;
            setTitle(blog.name_blog);
            setDescribe(blog.blog_describe);
            if(blog.show_type == 1){
                setButtonState(pre => ({
                    ...pre,
                    code_btn : true,
                    markdown_btn : false,
                }));
                const contentState = ContentState.createFromText(blog.blog_content);
                handleEditorChange(EditorState.createWithContent(contentState));
            }else if (blog.show_type == 2){
                setButtonState(pre => ({
                    ...pre,
                    code_btn : false,
                    markdown_btn : true,
                }));
                const contentState = ContentState.createFromText(blog.blog_content);
                handleEditorChange(EditorState.createWithContent(contentState));
            }else{
                const blocksFromHTML = convertFromHTML(blog.blog_content);
                const contentState = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                );
                handleEditorChange(EditorState.createWithContent(contentState));
            }

            setOnEditBlog( pre => ({
                ...pre,
                id_blog : '',
                blog : {},
                isEdit : false,
            }));
        }
    },[]);
    
    return(<>
        {buttonState.overview_btn && 
            <div id='overview-popup'>
                <div id="title-overview">
                    {title || 'Title Blog'}
                </div>
                <div id="overview">
                     {buttonState.markdown_btn &&
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {markdown}
                    </ReactMarkdown>}
                    {buttonState.code_btn &&(
                        <div dangerouslySetInnerHTML={{ __html: code }} />
                    )}

                </div>
            </div> 
        }
        <div className={'write-title-blog '+ (errorMessage.title ? ' error' : '')}
             onClick={errorMessage.title ? () => setErrorMessage(pre=>({...pre, title: ""})) : undefined}>
            <input  
                type='textbox' 
                maxLength="100" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder={errorMessage.title || 'Write you blog title here!!!'}/>
            <button className='nav' 
                onClick={handleSubmitBlog}
                disabled={errorMessage.title || errorMessage.type_blog || errorMessage.content}>
                    <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
        <textarea 
            id="blog-describe" 
            placeholder='Blog describe' 
            className={(errorMessage.describe ? ' error' : '')}
            onChange={(e)=>setDescribe(e.target.value)}
            value={describe}
            onClick={errorMessage.describe ? () => setErrorMessage(pre=>({...pre, describe: ""})) : undefined}>
            
        </textarea>
        <div id='blog-thumbnail' 
            className={(errorMessage.thumbnail ? ' error' : '')}
            onClick={errorMessage.thumbnail ? () => setErrorMessage(pre=>({...pre, thumbnail: ""})) : undefined}>
            <label htmlFor='imageInput' className='nav'>Chọn Thumbnail cho Blog</label>
            <input type="file" id="imageInput" name="image" accept="image/*" required  />
        </div>
        <div 
            className={'box-type-blogs '+ (errorMessage.type_blog ? ' error' : '')} 
            onClick={errorMessage.type_blog ? () => setErrorMessage(pre=>({...pre, type_blog: ""})) : undefined} >
            <h4>{ errorMessage.type_blog || 'Chọn thể loại Blog'}</h4>
            {
                blogTypes.map((value, index)=>(
                    <div className='type-blog' key={index}>
                        <label htmlFor={'type-id-'+value.id_type}>{value.type_name}</label>
                        <input 
                            className='type-checkbox'
                            id={'type-id-'+value.id_type} 
                            type='checkbox' 
                            value={value.id_type}/> 
                    </div>
                ))
            }
        </div>
        <WriteConfigBtn toggleInlineStyle={toggleInlineStyle}  buttonState={buttonState} />
        <div id='site-wirte-blog-content' className={ errorMessage.content ? 'error' : ''}
         onClick={errorMessage.content ? () => setErrorMessage(pre=>({...pre, content: ""})) : undefined}>
            <Editor 
                editorState={editorState} 
                onChange={handleEditorChange} 
                ref={editorRef}
                placeholder={ errorMessage.content || 'Text here' } />
        </div>
        
        {/* <div id="hidden" style={{display : "none !important"}}></div> */}
    </>);
}