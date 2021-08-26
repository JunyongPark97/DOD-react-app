import React from 'react'
import { dodMoreBoard } from '../../network/network';
import './ThanksPage.css'

export default function ThanksPage() {
    function onClickMore(){
        window.location.assign(dodMoreBoard);
    }
    return (
        <div className='result-page-container'>
            <div className='result-page-top-container'>
                <img className='result-page-logo' src={process.env.PUBLIC_URL + '/../nav-logo.png'}/>
            </div>
            <div className='contour result-page'/>
            <p className='thanks-page-title'>
                감사합니다!
            </p>
            <p className='thanks-page-subtitle'>
                실시간 추첨 설문이 올라오면<br/>카카오톡으로 알려드릴께요!
            </p>
            <img alt='' src={process.env.PUBLIC_URL + '/alarm.png'} style={{width:'120px', height:'120px'}} className='thanks-page-img'/>
            <div className='result-modal-plz-container clickable' style={{backgroundColor:'#F0F5FF'}} onClick={onClickMore}>
                <p className='result-modal-plz-text'>
                    다른 설문 참여하고<br/>한번 더 추첨하실 수 있어요
                </p>
                <div className='result-modal-plz-innerbox' style={{backgroundColor:'#F0F5FF'}} >
                    <p className='result-modal-plz-btn' style={{backgroundColor:'#F0F5FF'}}  >자세히 보기</p>
                    <img className='result-modal-plz-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-blue.png'}/>
                </div>
                <img className='result-modal-plz-img' alt='' src={process.env.PUBLIC_URL + '/hand.png'}/>
            </div>
            
        </div>
    )
}
