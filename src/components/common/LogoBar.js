import React from 'react'
import './LogoBar.css'

export default function LogoBar() {
    return (
        <div className='logoBar-container'>
            <img className='logoBar-logo' src={process.env.PUBLIC_URL + '/nav-logo.png'}/>
        </div>
    )
}
