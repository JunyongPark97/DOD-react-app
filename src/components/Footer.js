import React from 'react'
import './Footer.css'
import {privacyPolicy, useOfTerm} from '../network/network'

function Footer() {
    function onClickPrivacy(){
        const a = document.createElement('a');
        a.setAttribute('href', privacyPolicy);
        a.setAttribute('target', '_blank');
        a.click();
    }
    function onClickUseOfTerm(){
        const a = document.createElement('a');
        a.setAttribute('href', useOfTerm);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <div className='footer'>
            <p className='company-name'>주식회사 몽데이크</p>
            <p className='company-info'>대표 : 박준용, 이상우 | 사업자 등록번호 : 789-81-01945<br/>
            주소 : 서울특별시 마포구 월드컵북로6길 93, 202호(연남동)<br/>
            비즈니스 문의 : support@mondeique.com<br/>
            통신 판매번호 : 2020-서울-1054
            </p>
            <p className='privacy-policy'><span onClick={onClickPrivacy}>개인정보처리방침</span> &nbsp;&nbsp;&nbsp;<span onClick={onClickUseOfTerm}>디오디 이용약관</span></p>
            <p className='company-info'>2021 주식회사 몽데이크 Corp, all rights reserved</p>
        </div>
    )
}

export default Footer
