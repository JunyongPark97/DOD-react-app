import React from 'react'
import { Button } from './Button'
import './StartButtonBig.css'

function StartButtonBig(props) {
    const {openModal} = props
    return (
        <div className='startBtnBig-container'>
            <p className={'startBtnBig-title'}>당첨자 선정부터<br/>기프티콘 지급까지</p>
            <p className={'startBtnBig-subtitle'}>설문 응답 즉시 디오디가 알아서해요!</p>
            <img className='startBtnBig-img' src={process.env.PUBLIC_URL + 'dod.png'}/>
            <button className='startBtnBig-btn' onClick={openModal}>추첨 링크 만들기</button>
            <div className='contour-thick'/>
        </div>
    )
}

export default StartButtonBig
