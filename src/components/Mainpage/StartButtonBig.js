import React,{useEffect, useRef} from 'react'
import './StartButtonBig.css'
import { dodTestLink, dodAdvantageDetail } from '../../network/network';
import $ from 'jquery';
import ReactPlayer from 'react-player'

function StartButtonBig(props) {
    const {openModal} = props
    const fb = useRef(null);
    function onClickTest(){
        const a = document.createElement('a');
        a.setAttribute('href', dodTestLink);
        a.setAttribute('target', '_blank');
        a.click();
    }
    useEffect(()=>{
        window.addEventListener('scroll', listenToScroll);
    },[])
    function listenToScroll(){
        const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

        if(winScroll > 340){
            $('#startBtnBig-start-btn').fadeIn();
        }else if(winScroll < 340){
            $('#startBtnBig-start-btn').fadeOut();
        }
        
    }
    function onClickDetails(){
        const a = document.createElement('a');
        a.setAttribute('href', dodAdvantageDetail);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <div className='startBtnBig-container'>
            <div className='startBtnBig-title-box'>
                <p className={'startBtnBig-title'}>구글폼에<br/>링크 한 줄로<br/>실시간 추첨</p>
                <p className='startBtnBig-btn'>무료로 링크 만들기</p>
                <img className='startBtnBig-img' alt='' src={process.env.PUBLIC_URL + '/mainpage-img.png'}/>
            </div>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual1-pc.png'}/>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual2-pc.png'}  onClick={onClickTest} style={{'cursor' : 'pointer'}}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual1-mobile.png'}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual2-mobile.png'}  onClick={onClickTest}  style={{'cursor' : 'pointer'}}/>
            <div className='contour-thick'/>
            <p id='startBtnBig-start-btn' className={'floating-big-btn'} onClick={openModal} style={{'display' : 'none'}}>무료로 시작하기</p>
        </div>
    )
}

export default StartButtonBig
