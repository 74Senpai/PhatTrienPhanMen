
import 'highlight.js/styles/github.css';

import 'draft-js/dist/Draft.css';

const ACTION = {
    bold : "BOLD",
    italic : "ITALIC",
    underline : "UNDERLINE",
    insertOrderedList : "",
    codeSite : "CODESITE",
    markdownSite : "MARKDOWN",
    overview : "OVERVIEW",
}

const listBtnAction = [    
    { name: "BOLD", action: (buttonState)=>{ buttonState.bold_btn = !buttonState.bold_btn; return ACTION.bold}, icon: `<i class="fa-solid fa-bold"></i>` },
    { name: "ITALIC", action: (buttonState)=>{buttonState.italic_btn = !buttonState.italic_btn; return ACTION.italic}, icon: `<i class="fa-solid fa-italic"></i>` },
    { name: "UNDERLINE", action: (buttonState)=>{buttonState.underline_btn = !buttonState.underline_btn; return ACTION.underline}, icon: `<i class="fa-solid fa-underline"></i>` },
    { name: "ORDERLIST", action: (buttonState)=>{buttonState.insertOrderedList_btn = !buttonState.insertOrderedList_btn; return ACTION.insertOrderedList}, icon: `<i class="fa-solid fa-list"></i>` },
    { name: "CODE", action: (buttonState)=>{buttonState.code_btn = !buttonState.code_btn; return ACTION.codeSite}, icon: `<i class="fa-solid fa-code"></i>` },
    { name: "MARKDOWN", action: (buttonState)=>{buttonState.markdown_btn = !buttonState.markdown_btn; return ACTION.markdownSite}, icon: `<i class="fa-brands fa-markdown"></i>` },
    { name: "OVERVIEW", action: (buttonState)=>{buttonState.overview_btn = !buttonState.overview_btn; return ACTION.overview}, icon: `<i class="fa-solid fa-eye"></i>` }
];

export default function WriteConfigBtn( { toggleInlineStyle, buttonState} ){

    const codeBtn = listBtnAction.find(function(currentValue){ return currentValue.name === "CODE"});
    const markdownBtn = listBtnAction.find(function(currentValue){ return currentValue.name === "MARKDOWN"});
    const viewBtn = listBtnAction.find(function(currentValue){ return currentValue.name === "OVERVIEW"});
    return (
        <div className='write-option' draggable="true">
            {buttonState.code_btn &&
                 <><button 
                    className={`nav ${buttonState['code_btn'] === true ? 'active' : ''}`}
                    onClick={()=>toggleInlineStyle(codeBtn.action(buttonState))}
                    dangerouslySetInnerHTML={{ __html: codeBtn.icon }}
                />  
                <button 
                className={`nav ${buttonState['overview_btn'] === true ? 'active' : ''}`}
                onClick={()=>toggleInlineStyle(viewBtn.action(buttonState))}
                dangerouslySetInnerHTML={{ __html: viewBtn.icon }}
                /></> 
            }
            {buttonState.markdown_btn &&
                 <><button 
                    className={`nav ${buttonState['markdown_btn'] === true ? 'active' : ''}`}
                    onClick={()=>toggleInlineStyle(markdownBtn.action(buttonState))}
                    dangerouslySetInnerHTML={{ __html: markdownBtn.icon }}
                />  
                <button 
                className={`nav ${buttonState['overview_btn'] === true ? 'active' : ''}`}
                onClick={()=>toggleInlineStyle(viewBtn.action(buttonState))}
                dangerouslySetInnerHTML={{ __html: viewBtn.icon }}
                /></> 
            }
            {buttonState.code_btn || buttonState.markdown_btn ||
                listBtnAction.map((btn, index) => (
                    <button 
                        key={index}
                        className={`nav ${buttonState[btn.name.toLowerCase() + '_btn'] === true ? 'active' : ''}`}
                        onClick={()=>toggleInlineStyle(btn.action(buttonState))}
                        dangerouslySetInnerHTML={{ __html: btn.icon }}
                    />
                ))
            }
        </div>
    );
}