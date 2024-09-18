import '../CSS/Login.css';
import changePages from '../controller/handles.js';
import { useState } from 'react';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');

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
            }

            // Xử lý response nếu đăng ký thành công
            console.log('Sign Up successful:', data);

        } catch (error) {
            // Xử lý lỗi nếu có
            setErrorMessages(error.message);
            console.error('Error signing up:', error.message);
        }
    };

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


function Login(){
    return(
    <form method='POST' action='http://127.0.0.1:8000/login'>
        <div className="box-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
            <div className="errorMessages email"></div>
        </div>
        <div className="box-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />
            <div className="errorMessages password"></div>
        </div>    
        <div className="box-input submit-btn">
            <button id='signUp-btn' type="submit">Login</button>
            <div className="errorMessages form guide-text">
                Điền đầy đủ, chính xác thông tin trước khi đăng nhập
            </div>
        </div>    
    </form>
    );
}

function Account() {
    const [loginPage, setLoginPage] = useState(<Login />);
    return (
<>
<div id='form-signUp'>
    <div className='logo-blog'>LOGO</div>
    <div className='nav-Login'>
        <div className="login-tab" onClick={()=>changePages('login', setLoginPage)}>Login</div>
        <div className="signUp-tab" onClick={()=>changePages('signup', setLoginPage)}>Sign Up</div>
    </div>
    <div className='guide-text'>
        Hoàn tất các bước để đăng ký tài khoản và 
        có những tại ngiệm tốt nhất
    </div>
    {loginPage}
</div>  
</>
    );
}

export {Login};
export {SignUp};
export default  Account;

