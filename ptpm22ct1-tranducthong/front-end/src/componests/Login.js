import '../CSS/Login.css';
import { useState } from 'react';
import { todoAction } from '../controller/handles.js';
import { Infor, AuthorRegister, Login, SignUp, DeleteAccount, Logout } from './Login_Sigup_Account/Form.js';
import Loading from './Loading/Loading.js';

function Method({data , setCurrent}){
 
    return(<>
        <div className='account-method'>
            <span className="arow"></span>
            <div className='box-method' onClick={()=>setCurrent('form-edit')}>
                Information
            </div>
            <div className='box-method' onClick={()=>setCurrent('form-register-author')}>
                Author Register
            </div>
            <div className='box-method' onClick={()=>setCurrent('form-delete')}>
                Delete account
            </div>
            <div className='box-method' onClick={()=>setCurrent('form-logout')}>
                Logout
            </div>
        </div>
    </>);
}



export default function Account({isShowForm, data}) {
    // const [loginPage, setLoginPage] = useState(<Login />);
    const [tab, setTab] = useState("Login");
    const beforNav = todoAction.mainSite;
    const [current, setCurrent] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("Befor nav", beforNav);
    console.log("Pros",data);
    if(data){
        return(<>
            <div id='fiter-bg' onClick={()=>{isShowForm(false); todoAction.setActive(beforNav)}}></div>
            <div id='form-method'>
                 <Method data={data} setCurrent={setCurrent} />
                 {current == "form-edit" && 
                    <div id='form-edit'>
                        <span className="arow"></span>
                        <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                        <Infor data={data} />
                    </div>
                 }
                {current == "form-register-author" &&
                    <div id='form-register-author' >
                        <span className="arow"></span>
                        <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                        <AuthorRegister />
                    </div>
                }
                {current == "form-delete" && 
                    <div id='form-delete'>
                        <span className="arow"></span>
                        <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                        <DeleteAccount />
                    </div>
                }
                {current == "form-logout" &&
                    <div id='form-logout'>
                        <span className="arow"></span>
                        <Logout setCurrent={setCurrent} isShowForm={isShowForm}/>
                    </div>
                }
                
            </div>
            {/* <div id='fiter-bg' onClick={()=>{isShowForm(false); todoAction.setActive(beforNav)}}></div> */}
            
        </>);
    }
    return (
        <>
        <div id='fiter-bg' onClick={()=>{isShowForm(false); todoAction.setActive(beforNav)}}></div>
            <div id='form-signUp'>
                <div className='cancle-btn' onClick={()=>{isShowForm(false); todoAction.setActive(beforNav)}}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>
                <div className='nav-Login'>
                    <div className="login-tab"  id="Login" onClick={()=>setTab("Login")}>Login</div>
                    <div className="signUp-tab" id="Signup" onClick={()=>setTab("Signup")}>Sign Up</div>
                </div>
                <div className='guide-text'>
                    Hoàn tất các bước để đăng ký tài khoản và 
                    có những tại ngiệm tốt nhất
                </div>
                <Login isShowForm={isShowForm} tab={tab} load={setLoading}/>
                <SignUp isShowForm={isShowForm} tab={tab} load={setLoading}/>
            </div>         
        </>);
}

export {Login};
export {SignUp};


