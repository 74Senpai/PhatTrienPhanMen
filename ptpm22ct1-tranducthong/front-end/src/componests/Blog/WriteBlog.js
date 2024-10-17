// import './CSS/BlogManage.css';
import { useEffect, useState, memo, useRef } from 'react';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

const ACTION = {
    site : "site-wirte-blog-content",
    plus:"plus", 
    minus:"minus",
    codeSite : "code",
    markdownSite : "markdown",
    overview : "overview",
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
    },
    clearContent :()=>{
        const editableDiv = document.getElementById(ACTION.site);
        editableDiv.innerText ="";
        editableDiv.focus();
    }
};


export default function WriteBlog(){
    const [fontSize, setFontSize] = useState(4);
    const beforFontSize = useRef(0);
    console.log("write blog", fontSize);
    const [markdown, setMarkDown] = useState('');
    const [buttonState, setButtonState] = useState({
        bold_btn : false,
        italic_btn : false,
        underline_btn : false,
        insertOrderedList_btn : false,
        code_btn : false,
        markdown_btn : false,
        overview_btn : false,
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

    useEffect(()=>{
        if(buttonState.bold_btn)
            handlesFont(ACTION.bold);
        if(buttonState.italic_btn)
            handlesFont(ACTION.italic);
        if(buttonState.underline_btn)
            handlesFont(ACTION.underline);
        if(buttonState.insertOrderedList_btn)
            handlesFont(ACTION.insertOrderedList);
        ACTION.clearContent();
    },[buttonState.code_btn, buttonState.markdown_btn]);

    useEffect(()=>{
        const element = document.getElementById(ACTION.site);
        const overView = document.getElementById(ACTION.overview);
        function handleKeyUp(){
            if(buttonState.overview_btn){
                if(buttonState.code_btn){
                    overView.innerHTML = element.innerText
                }else if(buttonState.markdown_btn){
                   setMarkDown(()=>element.innerText);
                }else{
                    overView.innerHTML = element.innerHTML;
                }
            }
        }
        element.addEventListener('keyup', handleKeyUp);

        return ()=>{
            element.removeEventListener('keyup', handleKeyUp);
        }
    },[buttonState.overview_btn]);


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
            case ACTION.codeSite:
                
                toggleButton(action+"_btn");
                break;
            case ACTION.markdownSite:
                toggleButton(action+"_btn");
                break;
            case ACTION.overview:
                // const myWindown = window.open("about:blank", "Over View Blog", "fullscreen=yes");
                // myWindown.document.write(document.getElementById(ACTION.site).innerHTML);
                toggleButton(action+"_btn");
                // document.getElementById(ACTION.overview).innerHTML = document.getElementById(ACTION.site).innerHTML;
                break;
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
        {buttonState.overview_btn && 
            <div id='overview'>
                {buttonState.markdown_btn &&
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {markdown}
                </ReactMarkdown>
        }
            </div> 
        }

        

        <div className='write-title-blog'>
            <input  type='textbox' maxLength="100" placeholder='Write you blog title here!!!'/>
            <button type='submit' className='nav'><i className="fa-regular fa-paper-plane"></i></button>
        </div>
        <div className='write-option' draggable="true">
            {buttonState.code_btn || buttonState.markdown_btn ||<>
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
            </>}
            
            {buttonState.markdown_btn ||
                <button 
                    className={"nav "+`${buttonState.code_btn === true ? "active":""}`}  
                    onClick={()=>handlesFont(ACTION.codeSite)}>
                    <i className="fa-solid fa-code"></i>
                </button>
            }
           
            {buttonState.code_btn || 
                <button 
                    className={"nav "+`${buttonState.markdown_btn === true ? "active":""}`}  
                    onClick={()=>handlesFont(ACTION.markdownSite)}>
                    <i className="fa-brands fa-markdown"></i>
                </button>
            }
           
            <button 
                className={"nav "+`${buttonState.overview_btn === true ? "active":""}`}
                onClick={()=>handlesFont(ACTION.overview)}>
                <i class="fa-solid fa-eye"></i>
            </button>

        </div>
        <div id='site-wirte-blog-content' 
            contentEditable="true">
        </div>
        <div id="hidden" style={{display : "none !important"}}></div>
    </>);
}