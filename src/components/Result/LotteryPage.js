import React, { useState } from 'react'
import './LotteryPage.css'
import ProjectInfo from './ProjectInfo';

function LotteryPage(props) {
    const {innerComponent, projectInfoObj} = props;
    // console.log(projectInfoObj);
    const [onLottery, setOnLottery] = useState(true);
    function onClickTab(){
        setOnLottery(!onLottery);
    }
    return (
        <div className='lottery-container'>
            <div className='lottery-page-top-container' style={{backgroundColor:'#F3F4F6', background:'none'}}>
                <img className='result-page-logo' src={process.env.PUBLIC_URL + '/../nav-logo.png'}/>
            </div>
            <p className='lottery-title'>
                구글폼에 링크하나로 실시간 추첨, 디오디
            </p>
            <div className='lottery-tab'>
                <p className={onLottery?'lottery-tab-on':'lottery-tab-off'} onClick={onLottery?null:onClickTab}>
                    실시간 추첨하기
                </p>
                <p className={onLottery?'lottery-tab-off':'lottery-tab-on'} onClick={onLottery?onClickTab:null}>
                    추첨 상품 공지
                </p>
            </div>
            <div>
                {
                    onLottery?innerComponent:<ProjectInfo projectInfoObj={projectInfoObj}/>
                }
            </div>
        </div>
    )
}

export default LotteryPage
