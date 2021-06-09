import React,{useState} from 'react' //, {useState}
import {Link} from 'react-router-dom'
import { Button } from './Button';
import './DodNavbar.css'
import SignInButton from './SignModal'

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
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" >
                    <img className="navbar-logo-icon" src={process.env.PUBLIC_URL + 'nav-logo.png'}/>
                </Link>
                <div className='title'>
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <div className={isLoggedIn ? 'menu-icon' : 'menu-icon hide'}>
                        <img className={click ? 'fas fa-times':'fas fa-bars'} src={process.env.PUBLIC_URL + 'menu-icon.png'}/>
                    </div>
                    <div className={isLoggedIn ? "login-icon hide" : 'login-icon'}>
                        <Button onClick={openModal}>
                            로그인    
                        </Button> 
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default DodNavbar
