import { useState, useContext, useEffect, memo } from 'react';
// import { token, getAllBlogType } from '../../controller/pageFunction';
import { MessageContex } from '../../Context/MessageContex';
import { BlogTypesContext, UseInforContex } from '../../Context/PagesContext';

function ManageBlogPage(){

    const {setShowPopup} = useContext(MessageContex); 
    const [typeBlog, setTypeBlog] = useState('');
    const [describe, setDescribe] = useState('');

    const {blogTypes, setBlogTypes} = useContext(BlogTypesContext);
    const {userInfor} = useContext(UseInforContex);
    const [blogInfor, setBlogInfor] = useState({});
    console.log("Blog type ...", blogTypes);

    const handleCreateType = async(e)=>{
        e.preventDefault();
        setShowPopup(pre=>({
            ...pre,
            message: "Create ...",
            isShow: true,
            type: "infor"
        }));

        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/blog-type/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfor.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type_name: typeBlog,
                    describe: describe
                }),
            });

            const data = await response.json();

            if (!response.ok) {
               
               
            }else{
                setTimeout(setShowPopup(pre=>({
                    ...pre,
                    message: "Create ...",
                    isShow: false,
                    type: "done"
                })), 5000);
                const results = await fetch('http://127.0.0.1:8000/api/public/blog-type/show/all');
                const typeBlogs = await results.json();
                setBlogTypes(typeBlogs.data);
            }

            
        } catch (error) {
           
        }
    };

    useEffect(()=>{
        const getTotalInfor = async()=>{
            setShowPopup(pre=>({
                ...pre,
                message: "Fetch page informations",
                isShow: true,
                type: "infor"
            }));
    
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/page/total-informations', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userInfor.token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                const data = await response.json();
                const pageInfor = data.data;
                if (!response.ok || pageInfor == null) {
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Fail to get blog page infor",
                        isShow: true,
                        timeOut : 1500,
                        type: "error"
                    }));
                   
                }else{
                    setBlogInfor(pageInfor);
                    setShowPopup(pre=>({
                        ...pre,
                        message: "Success",
                        isShow: true,
                        timeOut : 1500,
                        type: "done"
                    }));
                }
                
            } catch (error) {
                setShowPopup(pre=>({
                    ...pre,
                    message: "Fail to get blog page infor",
                    isShow: true,
                    timeOut : 1500,
                    type: "error"
                }));
            }
        }
        getTotalInfor();
    }, []);

    // console.log('All blog type', allBlogType);
    return(
        <div className='row-box'>
            <div className='types-box'>
                <form onSubmit={handleCreateType} >
                    <div className='types-row'>
                        <div>Thể Loại</div>
                        <div>
                            <input
                                 type='text' 
                                 name='new-type' 
                                 value={typeBlog} 
                                 onChange={(e)=>setTypeBlog(e.target.value)}
                                 placeholder='Tên thể loại mới...'/>
                            <input 
                                type='text' 
                                name='describe' 
                                value={describe}
                                onChange={(e)=>setDescribe(e.target.value)}  
                                placeholder='Mô tả '/>
                            <button type='submit' className='nav send-btn'><i className="fa-regular fa-paper-plane"></i></button>
                        </div>
                    </div> 
                </form>
                <div className='type-list'>
                    {blogTypes && blogTypes.map((value)=>(
                        <div key={value.id_type} className='nav type-blog'>
                            {value.type_name} {`(${value.total_blog})`}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='comments-row'>Bình Luận: {`(${blogInfor.total_comment})`} </div>
            <div className='views-row'>Lượt xem: {`(${blogInfor.total_view})`} </div>
            <div className='entity-main-row'>
                <div className='authors-columns'>
                    Tác giả: {`(${blogInfor.total_author})`} 
                </div>
                <div className='blogs-columns'>
                    Bài viết: {`(${blogInfor.total_blog})`} 
                </div>
                <div className='users-columns'>
                    Người dùng: {`(${blogInfor.total_user})`} 
                </div>
            </div>
        </div>
    )
};

export default memo(ManageBlogPage);