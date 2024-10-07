import { useState, useEffect } from 'react';
import { todoAction } from '../../controller/handles.js';


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

export function Infor({data}){
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // e.preventDefault();
    const handleEdit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    userName : userName,
                    token : localStorage.getItem('access_token')
                }),
            });
        }catch(error){
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
    }

    const editMode = (isOn)=>{
        if(isOn){
            document.getElementById('userName').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('update').classList.remove('hidden');
            document.getElementById('cancle').classList.remove('hidden');
            document.getElementById('edit').classList.add('hidden');
        }else{
            document.getElementById('userName').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('update').classList.add('hidden');
            document.getElementById('cancle').classList.add('hidden');
            document.getElementById('edit').classList.remove('hidden');
            setEmail('');
            setUserName('');
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
                    value={ userName || data.name}
                    onChange={ (e)=>setUserName(e.target.value)}
                    disabled
                />
            </div>
            <div className="box-input">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email || data.email}
                    onChange={ (e)=>setEmail(e.target.value)}
                    disabled
                />
            </div>
            <div className="box-input submit-btn edit-btn">
                <button id='edit' type="button" onClick={()=>editMode(true)}>Edit</button>
                <button id='cancle' className='hidden' type='button' onClick={()=>editMode(false)} >Cancle</button>
                <span className='air'></span>
                <button id='update' className='hidden' type='submit' onClick={handleEdit} >Update</button>
                <div className="errorMessages form guide-text">
                   Nhập chính xác thông tin cần chỉnh sửa 
                </div>
            </div>
        </div>
        {errorMessages && <div className="errorMessages">{errorMessages}</div>}
    </form>
    </>);
}

export function AuthorRegister(){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [errorMessages, setErrorMessages] = useState('');

    return (<>
        <form>
            <div>
                <div className="box-input">
                    <label htmlFor="authorName">Author Name</label>
                    <input
                        type="textbox"
                        id="authorName"
                        value={ authorName}
                        onChange={ (e)=>setAuthorName(e.target.value)}
                        placeholder='Name you want User see'
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


export function SignUp({isShowForm, tab}) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // const [isLogin, showLogin, setShow, changeLoginState] = useLogin('');
    useEffect(() => {
        if (tab === "Signup") {
            todoAction.setActive("Signup", false);
        }
    }, [tab]);

    const handleSignUp = async (e) => {
        e.preventDefault(); // Ngăn hành vi gửi form mặc định

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
            console.log('Sign Up successful:', data);
            console.info(`Token: ${data.token}`);
            let saveData = localSave( "access_token", data.token);
            localSave( "user_data", data.data);   
            // changeLoginState(saveData);
            isShowForm(!saveData);
            todoAction.setActive(todoAction.mainSite);
        } catch (error) {
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


export function Login({isShowForm, tab}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // const [isLogin, showLogin, setShow, changeLoginState] = useLogin('');

    useEffect(() => {
        if (tab === "Login") {
            todoAction.setActive("Login", false);
        }
    }, [tab]);

    const handleLogin = async (e) => {
        e.preventDefault(); 

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
                // Xử lý lỗi nếu response không thành công
                throw new Error("Server Error" || 'Đăng nhập thất bại');
            }else{
                setErrorMessages('');
            }

            // Xử lý response nếu đăng ký thành công
            console.log('Login successful:', data);
            // console.log('Login successful:', data);
            console.info(`Token: ${data.token}`);
            let saveData = localSave( "access_token", data.token);
            localSave( "user_data", data.data);   
            // changeLoginState(saveData);  
            isShowForm(!saveData);
            todoAction.setActive(todoAction.mainSite);
        } catch (error) {
            // Xử lý lỗi nếu có
            setErrorMessages("Server Error");
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


export function DeleteAccount(){
    const [errorMessages, setErrorMessages] = useState('');

    return(<>
    <form>
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

export function Logout({ setCurrent }) {
    const [errorMessages, setErrorMessages] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        console.log('Token get', token);
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
                console.log("Logged out successfully");
            } else {
                const data = await response.json();
                setErrorMessages(data.message || "Logout failed");
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
