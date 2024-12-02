import { useState, useEffect, useContext } from 'react';
// import { todoAction } from '../../controller/handles.js';
import { MessageContex } from '../../Context/MessageContex';


function localSave(name, data){
    if(name === "access_token"){
        localStorage.setItem(name, data);
        return true;
    }
    try{
        localStorage.setItem(name, JSON.stringify(data));
    }catch(err){
        return false;
    }
    return true;
}

export function Infor({data, isShowForm, setCurrent, setUserInfor}){
    const [email, setEmail] = useState(data.user_email);
    const [userName, setUserName] = useState(data.user_name);
    const [errorMessages, setErrorMessages] = useState('');
    const [isChangeData, setChangeData] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // e.preventDefault();
    useEffect(()=>{
        console.log('data in effect', data);
        if(data.user_name !== userName || data.user_email !== email){
            setChangeData(true);
        }else{
            setChangeData(false);
            // console.log("data default", isChangeData);
        }
    }, [userName,email, editMode]);

    const handleEdit = async(e)=>{
        const token = localStorage.getItem('access_token');
        e.preventDefault();
           
        try{
            const response = await fetch('http://127.0.0.1:8000/api/update/account', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    userName : userName,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setCurrent(""); // Đặt lại trạng thái đăng nhập trong ứng dụng
                console.log("Update out successfully");
                isShowForm(false);
                setUserInfor({
                    user_name : userName,
                    user_email : email
                });
                localSave('user_data', data.data);
                console.log('update user',data);
            } else {
                const data = await response.json();
                setErrorMessages(data.message || "Update Fail");
            }
        }catch(error){
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
    }

    
    const editModeAction = (isOn)=>{
        setEditMode(isOn);
        if(!isOn){
            setEmail(data.user_email);
            setUserName(data.user_name);
        }    
    }

    return(<>
    <form onSubmit={handleEdit}>
        <div>
            <div className="box-input">
                <label htmlFor="userName">User Name</label>
                <input
                    type="textbox"
                    id="userName"
                    value={userName}
                    onChange={ (e)=>{setUserName(e.target.value);}}
                    disabled={!editMode}
                    required
                />
            </div>
            <div className="box-input">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={ (e)=>setEmail(e.target.value)}
                    disabled={!editMode}
                    required
                />
            </div>
            <div className="box-input submit-btn edit-btn">
                {editMode || <button id='edit' type="button" onClick={()=>editModeAction(true)}>Edit</button>}
                {editMode && <>
                    <button id='cancle'  type='button' onClick={()=>editModeAction(false)} >Cancle</button>
                    <span className='air'></span>
                    <input id='update'  type='submit' onClick={handleEdit} disabled={!isChangeData} value="Update" />
                </>}
                <div className="errorMessages form guide-text">
                   Nhập chính xác thông tin cần chỉnh sửa 
                </div>
            </div>
        </div>
        {errorMessages && <div className="errorMessages">{errorMessages}</div>}
    </form>
    </>);
}

export function AuthorRegister({isShowForm, setCurrent, userInfor}){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    

    const handleSignUpAuthor = async(e)=>{
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/author/register', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfor.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name_author : authorName,
                    phone : phoneNumber,
                })
                // credentials: 'include' // Đảm bảo gửi cookie nếu bạn dùng Sanctum với cookie
            });
            // response.json();
            const data = await response.json();
            if(!response.ok){
                setErrorMessages(data.message || "Register failed");
            }else{
                setErrorMessages("");
                setCurrent(""); 
                // console.log("Logged out successfully");
                isShowForm(false);
            }

        }catch(error){
            setErrorMessages(error.message);
            console.error('Error logging out:', error.message);
        }
        
    }

    return (<>
        <form onSubmit={handleSignUpAuthor}>
            <div>
                <div className="box-input">
                    <label htmlFor="authorName">Author Name</label>
                    <input
                        type="textbox"
                        id="authorName"
                        value={authorName}
                        onChange={ (e)=>setAuthorName(e.target.value)}
                        placeholder='Name you want User see'
                        required
                    />
                </div>
                <div className="box-input">
                    <label htmlFor="phoneNumber">phoneNumber</label>
                    <input
                        type="textbox"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={ (e)=>setPhoneNumber(e.target.value)}
                        placeholder='phone number'
                        required
                    />
                </div>
                <div className="box-input submit-btn edit-btn">
                    <button id='submit-btn' type='submit' >Submit</button>
                    <div className="errorMessages form guide-text">
                    Nhập chính xác thông tin cần chỉnh sửa 
                    </div>
                </div>
            </div>
            {errorMessages && <div className="errorMessages">{errorMessages}</div>}
        </form>
    </>);
}


export function SignUp({isShowForm, tab, setShowPopup, setUserInfor}) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // const [isLogin, showLogin, setShow, changeLoginState] = useLogin('');

    const handleSignUp = async (e) => {
        e.preventDefault(); // Ngăn hành vi gửi form mặc định

        setShowPopup(prev => ({
            ...prev,
            message: "Processing signup...",
            type: "info",
            isShow: true,
        }));
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Xử lý lỗi nếu response không thành công
                throw new Error(data.message || 'Đăng ký thất bại');
            }else{
                setErrorMessages('');
            }

            // Xử lý response nếu đăng ký thành công
            const user_data = data.data;
            setUserInfor({
                token : data.token,
                user_id : user_data.user_id,
                user_name : user_data.name,
                user_email : user_data.email,
                id_role : user_data.id_role
            });

            console.log('Sign Up successful:', data);
            console.info(`Token: ${data.token}`);
            let saveData = localSave( "access_token", data.token);
            localSave( "user_data", data.data); 
            setShowPopup(prev => ({
                ...prev,
                message: "Success !!!",
                type: "done",
                isShow: true,
                timeOut:2000
            }));  
            // changeLoginState(saveData);
            isShowForm(!saveData);
        } catch (error) {
            setShowPopup(prev => ({
                ...prev,
                message: "Error !!!",
                type: "error",
                isShow: true,
                timeOut:2000
            }));
            // Xử lý lỗi nếu có
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
    };
    if(tab !== "Signup"){
        return null;
    }
    return (
        <form onSubmit={handleSignUp}>
            <div className="box-input">
                <label htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    placeholder="User name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <div className="errorMessages userName"></div>
            </div>
            <div className="box-input">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="errorMessages email"></div>
            </div>
            <div className="box-input">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="errorMessages password"></div>
            </div>
            <div className="box-input submit-btn">
                <button id='signUp-btn' type="submit">Sign Up</button>
                <div className="errorMessages form guide-text">
                    Điền đầy đủ, chính xác thông tin trước khi đăng ký tài khoản
                </div>
            </div>
            {errorMessages && <div className="errorMessages">{errorMessages}</div>}
        </form>
    );
}


export function Login({isShowForm, tab, setShowPopup, setUserInfor}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // const [isLogin, showLogin, setShow, changeLoginState] = useLogin('');

    
    const handleLogin = async (e) => {
        e.preventDefault(); 
        
        setShowPopup(prev => ({
            ...prev,
            message: "Login ...",
            type: "infor",
            isShow: true,
        }));
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setShowPopup(prev => ({
                    ...prev,
                    message: "Đăng nhập thất bại !!!",
                    type: "error",
                    isShow: true,
                    timeOut:1000
                }));
                throw new Error(data.message || 'Đăng nhập thất bại');
            }else{
                setShowPopup(prev => ({
                    ...prev,
                    message: "Đăng nhập thành công !!!",
                    type: "done",
                    isShow: true,
                    timeOut:1000
                }));
                setErrorMessages('');
            

            // Xử lý response nếu đăng ký thành công
                const user_data = data.data;
                setUserInfor({
                    token : data.token,
                    user_id : user_data.user_id,
                    user_name : user_data.name,
                    user_email : user_data.email,
                    id_role : user_data.id_role
                });
                console.log('Login successful:', data);
                console.info(`Token: ${data.token}`);
                let saveData = localSave( "access_token", data.token);
                localSave( "user_data", data.data);   
                // changeLoginState(saveData); 
                isShowForm(!saveData);
            }
        } catch (error) {
            setShowPopup(prev => ({
                ...prev,
                message: "Error !!!",
                type: "error",
                isShow: true,
                timeOut:1000
            }));
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
        
    };

    if(tab != "Login"){
        return null;
    }
    
    return (
        <form onSubmit={handleLogin}>
            <div className="box-input">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="errorMessages email"></div>
            </div>
            <div className="box-input">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="errorMessages password"></div>
            </div>
            <div className="box-input submit-btn">
                <button id='signUp-btn' type="submit">Login</button>
                <div className="errorMessages form guide-text">
                   Nhập chính xác thông tin tài khoản trước khi đăng nhập
                </div>
            </div>
            {errorMessages && <div className="errorMessages">{errorMessages}</div>}
        </form>
    );
}


export function DeleteAccount({isShowForm, setCurrent}){
    const [errorMessages, setErrorMessages] = useState('');

    const handleDelete = async(e)=>{
        e.preventDefault(); 
        
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete/account', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                // Xử lý lỗi nếu response không thành công
                throw new Error(data.message || 'Đăng nhập thất bại');
            }else{
                setErrorMessages('');
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');
                setCurrent("");
                isShowForm(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
    }

    return(<>
    <form method='POST' onSubmit={handleDelete}>
        <div>
            <label>Why do you want to delete your account?</label>
            <div className="box-checkbox">
                <input 
                    type="checkbox" 
                    id="reason1" 
                    name="deleteReason" 
                    value="Not thing, I don't like using this web" 
                />
                <label htmlFor="reason1">Nothing, I don't like using this web</label>
            </div>
            <div className="box-checkbox">
                <input 
                    type="checkbox" 
                    id="reason2" 
                    name="deleteReason" 
                    value="I don't like this website" 
                />
                <label htmlFor="reason2">I don't like admin this website</label>
            </div>
            <div className="box-checkbox">
                <input 
                    type="checkbox" 
                    id="reason3" 
                    name="deleteReason" 
                    value="Authors do not like me!" 
                />
                <label htmlFor="reason3">Authors don't like me!!!</label>
            </div>
            

            <div className="box-input submit-btn edit-btn">
                <button id='submit-btn' type='submit' >Submit</button>
                <div className="errorMessages form guide-text">
                 
                </div>
            </div>
        </div>
        {errorMessages && <div className="errorMessages">{errorMessages}</div>}
    </form>
    </>);
}

export function Logout({isShowForm, userInfor, setCurrent, setUserInfor }) {
    const [errorMessages, setErrorMessages] = useState('');
    const {setShowPopup} = useContext(MessageContex);

    const handleDelete = async (e) => {
        e.preventDefault();
        const token = userInfor.token;
        console.log('Token get', token);

        setShowPopup(pre =>({
            ...pre,
            message : "Logout ... ",
            isShow : true,
            type : "infor",
        }));
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                // credentials: 'include' // Đảm bảo gửi cookie nếu bạn dùng Sanctum với cookie
            });

            if (response.ok) {
                // Xóa token khỏi localStorage
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');
                setCurrent(""); // Đặt lại trạng thái đăng nhập trong ứng dụng
                setUserInfor({
                    token : ``,
                    user_id : '',
                    user_name : '',
                    user_email : '',
                    id_role : ''
                });
                console.log("Logged out successfully");
                isShowForm(false);
                setShowPopup(pre =>({
                    ...pre,
                    message : "Logout successfully !!! ",
                    isShow : true,
                    timeOut : 1500,
                    type : "done",
                }));
            } else {
                const data = await response.json();
                setErrorMessages(data.message || "Logout failed");
                setShowPopup(pre =>({
                    ...pre,
                    message : data.message,
                    isShow : true,
                    timeOut : 2000,
                    type : "error",
                }));
            }
        } catch (error) {
            setErrorMessages(error.message);
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleDelete}>
                <label>Did you mean Logout?</label>
                <div>
                    <div className="box-input submit-btn">
                        <button id='cancel-btn' type='reset' onClick={() => setCurrent("")}>Cancel</button>
                        <button id='submit-btn' type='submit'>Submit</button>
                    </div>
                </div>
                {errorMessages && <div className="error">{errorMessages}</div>}
            </form>
        </>
    );
}
