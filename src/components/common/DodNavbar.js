import React,{useState} from 'react' //, {useState}
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import './DodNavbar.css'

function DodNavbar(props) {
    const {isLoggedIn, openModal} = props
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    return (
        <div >
            <div className="dod-navbar-container">
                <Link to="/" className="dod-navbar-logo" >
                    <img className="dod-navbar-logo-icon" src={process.env.PUBLIC_URL + 'nav-logo.png'}/>
                </Link>
                <div className='dod-title'>
                </div>
                <div className='dod-menu-icon' onClick={handleClick}>
                    <Link to='mypage' className={isLoggedIn ? 'dod-menu-icon' : 'dod-menu-icon hide'}>
                        <img className={click ? 'fas fa-times':'fas fa-bars'} src={process.env.PUBLIC_URL + 'profile-user.png'}/>
                    </Link>
                    <div className={isLoggedIn ? "dod-login-icon hide" : 'dod-login-icon'}>
                        <p className='login-btn' onClick={openModal}>
                            로그인/회원가입
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DodNavbar
