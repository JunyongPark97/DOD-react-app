import React from 'react'
import { useHistory } from 'react-router'
import './LogoBar.css'

export default function LogoBar() {
    const history = useHistory();
    function onClickLogo(){
        
        history.push('/');
    }
    return (
        <div className='logoBar-container'>
            <img className='logoBar-logo' src={process.env.PUBLIC_URL + '/nav-logo.png'} onClick={onClickLogo}/>
        </div>
    )
}
