import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar(props) {
    const {pageNum, onClickBack} = props;
    function getPageTitle(pageNumber){
        return ((pageNumber === 0)?'프로젝트 만들기' : '결제 안내')
    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img className="navbar-logo-icon" src={process.env.PUBLIC_URL + 'arrow-goback.png'} onClick={onClickBack}/>
                <div className='title'>
                    {getPageTitle(pageNum)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
