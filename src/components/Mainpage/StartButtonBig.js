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
            <p className={'startBtnBig-title'}>설문 응답자에게<br/>실시간으로 추첨해주세요</p>
            <p className={'startBtnBig-subtitle'}>원하는 설문에 디오디 링크를 연결하여<br/>여러분만의 실시간 추첨 설문을 시작해보세요</p>
            <div className='startBtnBig-innerbox'>
                <p className='startBtnBig-btn' onClick={onClickTest}>실시간 추첨 체험해보기</p>
                <img className='startBtnBig-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-white.png'}/>
            </div>
            <img className='startBtnBig-img' alt='' src={process.env.PUBLIC_URL + '/mainpage-img.gif'}/>
            <img className='startBtnBig-img2' alt='' src={process.env.PUBLIC_URL + '/arrow-down.png'}/>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual1-pc.png'} onClick={onClickDetails} style={{'cursor' : 'pointer'}}/>
            <img className='startBtnBig-gif-web' src={process.env.PUBLIC_URL + '/main-manual2-pc.png'}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual1-mobile.png'}  onClick={onClickDetails}  style={{'cursor' : 'pointer'}}/>
            <img className='startBtnBig-gif-mobile' src={process.env.PUBLIC_URL + '/main-manual2-mobile.png'}/>
            <div className='wrapper'>
            <ReactPlayer
                className='player'
                url='https://www.youtube.com/watch?v=8yshMJGcQ7M'
                width='100%'
                controls={true}
                height='100%'/>
            
            </div>
            <div className='contour-thick'/>
            <p id='startBtnBig-start-btn' className={'floating-big-btn'} onClick={openModal} style={{'display' : 'none'}}>무료로 시작하기</p>
        </div>
    )
}

export default StartButtonBig
