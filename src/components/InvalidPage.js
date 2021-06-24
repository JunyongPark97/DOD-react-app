import React from 'react'

export default function InvalidPage() {
    function onClickMore(){
        window.location.assign('/');
    }
    return (
        <div className='result-page-container'>
            <div className='result-page-top-container'>
                <img className='result-page-logo' src={process.env.PUBLIC_URL + '/../nav-logo.png'}/>
            </div>
            <div className='contour'/>
            <div className='result-page-content'>
                <p className='result-page-title'>기프티콘 당첨 여부를<br/>즉시 확인하세요</p>
                <p className='result-page-subtitle'>
                    설문 응답 즉시 디오디가 알려드려요!
                </p>
                <img className='result-page-dod-img invalid-page' src={process.env.PUBLIC_URL + '/../dod-invalid.png'}/>
                <p className='result-page-text-alarm'>
                    현재 이용할 수 없는 추첨입니다.<br/>
                    설문자에게 문의해 주세요!
                </p>
                
                
            </div>
            <div>
                <p className='result-more-btn'>혹시! 디오디가 궁금하신가요?</p>
                <button className='result-btn' onClick={onClickMore}>디오디에 대해 알아보기</button>
            </div>
        </div>
    )
}
