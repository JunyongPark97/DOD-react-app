import React from 'react'
import { Button } from './Button'
import './StartButtonBig.css'

function StartButtonBig(props) {
    const {openModal} = props
    return (
        <div className='startBtnBig-container'>
            <p className={'startBtnBig-title'}>디오디</p>
            <p className={'startBtnBig-subtitle'}>기프티콘 당첨 여부를 응답 즉시 확인할 수 있도록 해요.<br/>공정한 당첨자 선정, 기프티콘 즉시 지급까지 자동으로!</p>
            <div className='startBtnBig-btn-container'>
                <p className='startBtnBig-btn-title'><img src={process.env.PUBLIC_URL + 'dod-icon.png'}/>새 프로젝트 만들기</p>
                <p className='startBtnBig-btn-subtitle'>설문 기간, 당첨자 수, 기프티콘만 설정해주세요.<br/>그 뒤로는 디오디가 알아서 할께요!</p>
                    <Button buttonSize='btn--large' onClick={openModal}>바로 시작</Button>
                <p className='startBtnBig-btn-description'>기프티콘 결제를 제외하고 모든 서비스가 무료에요!</p>
            </div>
            <div className='contour-thick'/>
        </div>
    )
}

export default StartButtonBig
