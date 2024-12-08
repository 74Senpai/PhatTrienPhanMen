
export function getName(){
    let user_data; 
    try{
      let data = localStorage.getItem("user_data");
      user_data = JSON.parse(data);
      
    }catch(err){
      return false;
    }
    return user_data; 
}

export const getToken = () => localStorage.getItem('access_token');

export async function getAllBlogType(){
    //http://127.0.0.1:8000/api/public/blog-type/show/all
    try {
        const response = await fetch('http://127.0.0.1:8000/api/public/blog-type/show/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            
        }else{
            console.log("all blog type",data);
            return data;
        }

        
    } catch (error) {
       
    }

}

export const API = {
    allBlog : "http://127.0.0.1:8000/api/public/blog/all",
    userInfor : "http://127.0.0.1:8000/api/user/information",
    orderByView : "http://127.0.0.1:8000/api/public/blog/show/orderby/view",
    blogbyType : "http://127.0.0.1:8000/api/public/blog/show/type=",
    allType : "http://127.0.0.1:8000/api/public/blog-type/show/all",
    blogByID : "http://127.0.0.1:8000/api/public/blog/id=",
    commentByBlog : "http://127.0.0.1:8000/api/public/comment/blog/id=",
}

export const csrollToTop = ()=> window.scrollTo({ top: 0, behavior: 'smooth' }); 

//vendor
export function wrapUrls(text, prefix, suffix) {
    const urlRegex = /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/g;
    return text.replace(urlRegex, (url) => `${prefix}${url}${suffix}`);
}

export function aLink(e){
    window.open(`${e.target.innerText}`, "_blank");
}