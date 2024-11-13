// import './CSS/BlogManage.css';
import { useEffect, useState, memo, useRef } from 'react';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { Editor, EditorState,  RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import WriteConfigBtn from './TextEditor';
import { convertToHTML } from 'draft-js';


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
   
    const [markdown, setMarkDown] = useState('');
    const [code, setCode] = useState('');
    const [editContent, setEditContent] = useState('');
    
    const [title, setTitle] = useState('');
    
    const editorRef = useRef(null);

    const focusEditor = () => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
        <div className='write-title-blog'>
            <input  
                type='textbox' 
                maxLength="100" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder='Write you blog title here!!!'/>
            <button type='submit' className='nav'><i className="fa-regular fa-paper-plane"></i></button>
        </div>
        <div >
            <select className='type-blog'>
                <option>Chose type blog</option>
            </select>
        </div>
        <WriteConfigBtn toggleInlineStyle={toggleInlineStyle}  buttonState={buttonState} />
        <div id='site-wirte-blog-content'>
            <Editor 
                editorState={editorState} 
                onChange={handleEditorChange} 
                ref={editorRef}
                placeholder='Text here'/>
        </div>
        <div id="hidden" style={{display : "none !important"}}></div>
    </>);
}