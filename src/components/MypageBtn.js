import React from 'react'
import './MypageBtn.css'

export default function MypageBtn(props) {
    const {imgsrc, text, link} = props;
    function onClickBtn(){
        const a = document.createElement('a');
        a.setAttribute('href', link);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <div className='mypage-btn-container' onClick={onClickBtn}>
            <img src={imgsrc} className='mypage-btn-icon'/>
            <p className='mypage-btn-text'>{text}</p>
            <img src={process.env.PUBLIC_URL + 'arrow-go.png'} className='mypage-btn-arrow'/>
        </div>
    )
}
