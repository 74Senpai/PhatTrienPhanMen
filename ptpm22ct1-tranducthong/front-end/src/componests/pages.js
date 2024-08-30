

function Tags({title, content, index}){
    return(<>
        <div className="tag-box" data-index={index}>
            <div className="left-title">{title}</div>
            <div className="right-title">
                <div className="img-box">
                    <img src="#" alt="This is Images"/>
                </div>
                <div className="contents">{content}</div>
            </div>
        </div>
    </>);  
}
function Pages(){
    return (<>
        <div className="type-box">
            <div className="type-title"></div>
            <div className="date-release"></div>
            <Tags title="Day la ai ti" content="Hello my friend" index="0"/>
            <Tags title="Day la ai ti 1" content="Hello my friend" index="0"/>
            <Tags title="Day la ai ti 2" content="Hello my friend" index="0"/>
        </div>    
    </>);
}

export default Pages;