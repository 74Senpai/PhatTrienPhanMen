
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