import './CSS/Login.css';
import { useState, useContext } from 'react';
import { todoAction } from '../../controller/handles.js';
import { Infor, AuthorRegister, Login, SignUp, DeleteAccount, Logout } from './Form.js';
import { MessageContex } from '../../Context/MessageContex';
import { UseInforContex, UserRoleContex } from '../../Context/PagesContext.js';

function Method({setCurrent }){
 
    return(<>
        <div className='account-method'>
            <span className="arow"></span>
            <div className='box-method' onClick={()=>setCurrent('form-edit')}>
                Information
            </div>
            <div className='box-method' onClick={()=>setCurrent('form-register-author')}>
                Author
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
    const [current, setCurrent] = useState('');
    const [loading, setLoading] = useState(false);
    const {setShowPopup} = useContext(MessageContex);
    const {userInfor, setUserInfor} = useContext(UseInforContex);
    const {userRole} = useContext(UserRoleContex);

    const beforNav = "";
    console.log("Befor nav", beforNav);
    console.log("Pros",data);
    if(data.token){
        return(<>
            <div id='fiter-bg' onClick={()=>{isShowForm(false)}}></div>
            <div id='form-method'>
                 <Method data={data} setCurrent={setCurrent} userRole={userRole}/>
                 {current == "form-edit" && 
                    <div id='form-edit'>
                        <span className="arow"></span>
                        <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                        <Infor data={data} isShowForm={isShowForm} setCurrent={setCurrent} setUserInfor={setUserInfor}/>
                    </div>
                 }
    
                {current == "form-register-author" &&
                <div id='form-register-author' >
                    <span className="arow"></span>
                    <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                    <AuthorRegister isShowForm={isShowForm}  setCurrent={setCurrent} userInfor={userInfor}/>
                </div>
                }
                
                {current == "form-delete" && 
                    <div id='form-delete'>
                        <span className="arow"></span>
                        <div className='cancle-btn' onClick={()=>{setCurrent("")}}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>        
                        <DeleteAccount isShowForm={isShowForm} setCurrent={setCurrent}/>
                    </div>
                }
                {current == "form-logout" &&
                    <div id='form-logout'>
                        <span className="arow"></span>
                        <Logout 
                            setCurrent={setCurrent} 
                            isShowForm={isShowForm} 
                            setUserInfor={setUserInfor} 
                            userInfor={userInfor}/>
                    </div>
                }
                
            </div>
            {/* <div id='fiter-bg' onClick={()=>{isShowForm(false); todoAction.setActive(beforNav)}}></div> */}
            
        </>);
    }
    return (
        <>
        <div id='fiter-bg' onClick={()=>{isShowForm(false);}}></div>
            <div id='form-signUp'>
                <div className='cancle-btn' onClick={()=>{isShowForm(false);}}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className='logo-blog'><img src="https://media.dau.edu.vn/Media/2_SVDAU/Images/dau-csv12982278-5-e.png"/></div>
                <div className='nav-Login'>
                    <div className={"login-tab "+ (tab=="Login" ? "active": "")}  id="Login" onClick={()=>{setTab("Login")}}>Login</div>
                    <div className={"signUp-tab "+ (tab!="Login" ? "active": "")} id="Signup" onClick={()=>{setTab("Signup")}}>Sign Up</div>
                </div>
                <div className='guide-text'>
                    Hoàn tất các bước để đăng ký tài khoản và 
                    có những tại ngiệm tốt nhất
                </div>
                <Login 
                    isShowForm={isShowForm} 
                    tab={tab} 
                    load={setLoading} 
                    setUserInfor={setUserInfor}
                    setShowPopup={setShowPopup}/>
                <SignUp 
                    isShowForm={isShowForm} 
                    tab={tab} 
                    load={setLoading} 
                    setUserInfor={setUserInfor}
                    setShowPopup={setShowPopup}/>
            </div>         
        </>);
}



