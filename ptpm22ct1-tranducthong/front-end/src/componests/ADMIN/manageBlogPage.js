import { useState, useContext, useEffect, memo } from 'react';
import { token, getAllBlogType } from '../../controller/pageFunction';
import { MessageContex } from '../../Context/MessageContex';
import { BlogTypesContext } from '../../Context/PagesContext';

function ManageBlogPage(){

    const {setShowPopup} = useContext(MessageContex); 
    const [typeBlog, setTypeBlog] = useState('');
    const [describe, setDescribe] = useState('');

    const {blogTypes, setBlogTypes} = useContext(BlogTypesContext);
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
                    'Authorization': `Bearer ${token}`,
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
                    {blogTypes.map((value)=>(
                        <div key={value.id_type} className='nav type-blog'>
                            {value.type_name} {`(${value.total_blog})`}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='comments-row'>Bình Luận: </div>
            <div className='views-row'>Lượt xem:</div>
            <div className='entity-main-row'>
                <div className='authors-columns'>
                    Tác giả: {`(0)`}
                </div>
                <div className='blogs-columns'>
                    Bài viết: {`(0)`}
                </div>
                <div className='users-columns'>
                    Người dùng: {`(0)`}
                </div>
            </div>
        </div>
    )
};

export default memo(ManageBlogPage);