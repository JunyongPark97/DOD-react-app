import React from 'react'
import { useHistory } from 'react-router'
import './WantMoreResponseCard.css'

export default function WantMoreResponseCard() {
    const history = useHistory();
    function onClickMore(){
        history.push('/board');
        //history.push('/createpost');
    }
    return (
        <div className='want-more-response-card-container'>
            <p className='want-more-response-title'>응답률을 높이고 싶으신가요?</p>
            <p className='want-more-response-subtitle'>디오디 설문 게시판에 올리고<br/>더 많은 응답을 받아보세요.</p>
            <div className='want-more-response-innerbox'>
                <p className='want-more-response-btn' onClick={onClickMore}>설문 게시판 가기</p>
                <img className='want-more-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-white.png'}/>
            </div>
            <img className='want-more-img' alt='' src={process.env.PUBLIC_URL + '/pointing.png'}/>
        </div>
    )
}
