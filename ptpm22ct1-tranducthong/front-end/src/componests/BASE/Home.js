import React ,{ useContext, useEffect, useState } from 'react';
import { MessageContex } from '../../Context/MessageContex';
import { BlogTypesContext, PagesRefContex, PagesSiteContex } from '../../Context/PagesContext';
import './CSS/Home.css';
import { Link } from 'react-router-dom';

let imgUrl = "https://cdn-blog.28tech.com.vn/thumbs/c%20tutorial/l%C3%A0m%20quen/b%C3%A0i%201/5_thumb_350.png";

function Small_view({img_url, title_name }){

    return(
    <div
        className="box-small">
        <Link to={"/blog-type/"+title_name}>
            <div className="box-img small">
                <img src={img_url} alt="Image"/>
            </div>
            <div className="title small text-hover">{title_name}</div>
        </Link>
    </div>
    );
}

function Big_view({img_url, title_name, content, type, date_update, key}){

    const {currentSite, changeSite} = useContext(PagesSiteContex);
    
    return(<div className='box-big' >
        <div>
            <Link  className="box-img-big img-blur" to={"/blog-type/"+type+"/"+title_name}>
                <img src={img_url} alt="Image"/>
            </Link>
        </div>
        <div className='box-content'>
            <div>
                <Link  className="type type-hover" to={"/blog-type/"+type+"/"+title_name}>
                    {type}
                </Link>
            </div>
            <div>
            <Link to={"/blog-type/"+type+"/"+title_name}  className="title-big text-hover">
                {title_name}
            </Link>
            </div>
            <div className="content">{content}</div>
            <div className='date-update'>{date_update}</div>
        </div>
    </div>);
}

function ABlog({title_name, img_url, type, date_update, templ}){
    const htmls = <div className='date-up-blog'>{date_update}</div>
    // const {currentSite, changeSite} = useContext(PagesSiteContex);
    const {setRef} = useContext(PagesRefContex);
    return(
        <div className='blog'>

                <div className='image-blog img-blur'>
                    <Link to={"/blog-type/"+type+"/"+title_name} className='nav title-blog'>
                        <img src={img_url} alt="Image"/>
                    </Link>
                </div>
                <div className='box'> 
                    <div className=''>
                        <Link to={"/blog-type/"+type} className='nav type-blog type-hover'>
                            {type} 
                        </Link>
                         
                    </div>
                    {templ ==1  ? htmls: ''}
                    <div className='title-blog text-hover'>
                        <Link to={"/blog-type/"+type+"/"+title_name} className='nav title-blog'>
                            {title_name}
                        </Link>
                    </div>
                    {templ == 2  ? htmls: ''}
                </div>
            
        </div>
    );
}

function TopContents(){

    const {setShowPopup} = useContext(MessageContex);
    const {blogTypes} = useContext(BlogTypesContext);    
    const [blogs, setBlogs] = useState([]);
    useEffect(function(){
        const fetchBlogByView = async ()=>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/public/blog/show/orderby/view`);
                const data = await response.json();
                if(response.ok){
                    if(data.success != null)
                        setBlogs(data.data);
                    // console.log('blogs',blogs);
                }else{
                    setShowPopup(pre=>({
                        message : data.message || 'Can not fetch blogs',
                        isShow : true,
                        timeOut : 1500,
                        type : "error",
                        action : 'none',
                        filter : true
                    }));
                }
                
            } catch (error) {
                setShowPopup(pre=>({
                    message : error || 'Can not fetch blogs',
                    isShow : true,
                    timeOut : 1500,
                    type : "error",
                    action : 'none',
                    filter : true
                }));
                console.log('Can not get user information');
            }
        }

        fetchBlogByView();
    }, []);

    return(<>
        <div className='top-contents'>
            <div className='small-view col'>
            {blogTypes != [] &&
                    blogTypes.map((type, index)=>(<React.Fragment key={index}>
                        {index < 4 && <Small_view img_url={imgUrl} title_name={type.type_name}/>}
                    </React.Fragment>))
            }
            </div>
            <div className='big-view col'>
            {blogs != [] &&
                blogs.map((blog, index)=>(<React.Fragment key={index}>
                    {index < 2 && <Big_view 
                        img_url={blog.thumbnail}
                        title_name={blog.name_blog}
                        type={blog.type_name}
                        content={blog.blog_describe}
                        key={blog.blog_id}
                        date_update={blog.created_at}/>}
                </React.Fragment>))
            }
            </div>
        </div>
    </>);
}


export function ContentsByType({title_name, type_API, templ = 1}){

    const [blogs, setBlogs] = useState([]);
    const {setShowPopup} = useContext(MessageContex);

    useEffect(function(){
        const fetchBlogByType = async ()=>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/public/blog/show/type=${type_API}`);
                const data = await response.json();
                if(response.ok){
                    if(data.data != [])
                        setBlogs(data.data);
                    console.log('blogs',blogs);
                }else{
                    setShowPopup(pre=>({
                        message : data.message || 'Can not fetch blogs',
                        isShow : true,
                        timeOut : 1500,
                        type : "error",
                        action : 'none',
                        filter : true
                    }));
                }
                
            } catch (error) {
                setShowPopup(pre=>({
                    message : error || 'Can not fetch blogs',
                    isShow : true,
                    timeOut : 1500,
                    type : "error",
                    action : 'none',
                    filter : true
                }));
                console.log('Can not get user information');
            }
        }

        fetchBlogByType();
    }, [type_API]);

    return(
        <div className={'contents-by-type templ'+templ}>
            <div className='type-title'>{title_name}</div>
            {blogs != [] &&
                blogs.map((blog, index)=>(
                    <ABlog 
                        key={index}
                        img_url={blog.thumbnail}
                        type={blog.type_name}
                        date_update={blog.created_at}
                        templ={templ}
                        title_name={blog.name_blog}
                    />
                ))
            }
            {blogs != [] &&<>
                {blogs.length % 2 == 1 && <>
                    <div className='blog'></div>
                    {templ == 2 && <div className='blog'></div>}
                </>}
            </>}
        </div>
    );
}

function AllType(){
    const {blogTypes} = useContext(BlogTypesContext);    
    const {currentSite, changeSite} = useContext(PagesSiteContex);

    return(
        <div className='all-type'>
            <div className='type-title'>Tat ca chu de</div>
            <div className='box-type'>
                {blogTypes &&
                    blogTypes.map(type=>(
                        <Small_view 
                            img_url={imgUrl} 
                            changeSite={changeSite}
                            title_name={type.type_name} 
                            key={type.id_type}/>
                    ))
                }
            </div>
        </div>
    );
}

export default function Home(){
    return(<>
        <div className='color-bg'>
            <TopContents />
        </div>
        <ContentsByType title_name={"Lap Trinh C"} templ={1} type_API={'C'}/>
        <div className='color-bg'>
            <ContentsByType title_name={"Lap Trinh C++"} templ={2} type_API={'C++'}/>
        </div>
        <AllType />
    </>);
}

export function PageRef(){
    const {pagesRef, setRef} = useContext(PagesRefContex);
    const {changeSite} = useContext(PagesSiteContex);

    return(
        <div className="ref-link">
            {pagesRef &&
                pagesRef.map((value, index) => (
                    <div className="nav ref-name"
                        onClick={()=>{changeSite(value)}}
                        key={value}>
                            {value}
                            {index < pagesRef.length - 1 &&
                                <span className="ref-name">
                                    {'>'}
                                </span>
                            }
                    </div>
                ))
            }
        </div>
    );
}