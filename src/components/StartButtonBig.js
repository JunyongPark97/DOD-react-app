import React from 'react'
import { Button } from './Button'
import './StartButtonBig.css'

function StartButtonBig(props) {
    const {openModal} = props
    return (
        <div className='startBtnBig-container'>
            <p className={'startBtnBig-title'}>설문에만<br/>집중하세요</p>
            <p className={'startBtnBig-subtitle'}>설문 즉시 기프티콘 추첨<br/>디오디를 이용한 설문은 응답률 <span className='startBtnBig-strong'>3배</span></p>
            <img className='startBtnBig-img' src={process.env.PUBLIC_URL + 'dod.png'}/>
            <button className='startBtnBig-btn' onClick={openModal}>추첨 링크 만들기</button>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + 'main-page-gif-web.gif'}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + 'main-page-gif-mobile.gif'}/><div className='contour-thick'/>
        </div>
    )
}

export default StartButtonBig
