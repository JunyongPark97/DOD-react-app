import React from 'react'
import { howToApply } from '../../network/network';

export default function ForbiddenPage() {
    function onClickMore(){
        window.location.assign('/board');
    }
    function onClickDod(){
        window.location.assign('/');
    }
    function onClickHowToApply(){
        window.location.assign(howToApply);
    }
    return (
        <div className='result-page-container'>
            <div className='result-page-top-container'>
                <img className='result-page-logo' src={process.env.PUBLIC_URL + '/../nav-logo.png'}/>
            </div>
            <div className='contour'/>
            <div className='result-page-content'>
                <p className='result-page-title'>설문에 참여하셨나요?<br/>
                유효하지 않은 접근입니다.</p>
                <img className='result-page-dod-img forbidden-page' src={process.env.PUBLIC_URL + '/../forbidden.png'}/>
            </div>
            <div className='contour-16margin-both'/>
            <div id='result-page-forbidden-howtoapply' className='result-page-button-container clickable' onClick={onClickHowToApply}>
                <p className='result-page-button-text'>설문에 참여하는 방법이 궁금해요</p>
                <img alt='' className='result-page-button-icon' src={process.env.PUBLIC_URL + '/result-arrow.png'}/>
            </div>
            <div id='result-page-forbidden-aboutdod' className='result-page-button-container clickable' onClick={onClickDod}>
                <p className='result-page-button-text'>디오디는 어떤 서비스인가요?</p>
                <img alt='' className='result-page-button-icon' src={process.env.PUBLIC_URL + '/result-arrow.png'}/>
            </div>
            <div id='result-page-forbidden-anyother' className='result-page-button-container-violet clickable' onClick={onClickMore}>
                <p className='result-page-button-text'>실시간 추첨할 수 있는<br/>다른 설문들이 더 있나요?</p>
                <img alt='' className='result-page-button-icon' src={process.env.PUBLIC_URL + '/result-arrow.png'}/>
            </div>
        </div>
    )
}
