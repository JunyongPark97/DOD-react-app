import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar(props) {
    const {pageNum, onClickBack} = props;
    function getPageTitle(pageNumber){
        switch(pageNumber){
            case 0: 
                return '추첨 링크 만들기'
            case 1:
                return '결제 안내'
            case 2:
                return '링크 안내'
            case 3:
                return '더 보기'
            case 4:
                return '설문 게시판'
            case 5:
                return '내가 올린 설문'
            case 6:
                return '설문 올리기'
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <img className="navbar-logo-icon" src={process.env.PUBLIC_URL + '/arrow-goback.png'} onClick={onClickBack}/>
                    <div className='title'>
                        {getPageTitle(pageNum)}
                    </div>
                </div>
                
            </nav>
            <div className='contour'/>
        </>
        
    )
}

export default Navbar
