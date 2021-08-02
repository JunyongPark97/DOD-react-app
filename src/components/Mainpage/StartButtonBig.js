import React from 'react'
import './StartButtonBig.css'
import { dodTestLink } from '../../network/network';

function StartButtonBig(props) {
    const {openModal} = props
    function onClickTest(){
        const a = document.createElement('a');
        a.setAttribute('href', dodTestLink);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <div className='startBtnBig-container'>
            <p className={'startBtnBig-title'}>설문 응답자에게<br/>실시간으로 추첨해주세요</p>
            <p className={'startBtnBig-subtitle'}>원하는 설문에 디오디 링크를 연결하여<br/>여러분만의 실시간 추첨 설문을 시작해보세요</p>
            <div className='startBtnBig-innerbox'>
                <p className='startBtnBig-btn' onClick={onClickTest}>실시간 추첨 체험해보기</p>
                <img className='startBtnBig-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-white.png'}/>
            </div>
            <img className='startBtnBig-img' alt='' src={process.env.PUBLIC_URL + '/mainpage-img.png'}/>
            <img className='startBtnBig-img2' alt='' src={process.env.PUBLIC_URL + '/arrow-down.png'}/>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual1-pc.png'}/>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual2-pc.png'}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual1-mobile.png'}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual2-mobile.png'}/>
            <div className='contour-thick'/>
            <p className='floating-big-btn' onClick={openModal}>실시간 추첨 만들기</p>
        </div>
    )
}

export default StartButtonBig
