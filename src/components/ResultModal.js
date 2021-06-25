import React,{useState, useEffect} from 'react'
import './ResultModal.css'
import {dodMoreLink} from '../network/network'

export default function ResultModal(props) {
    const {isModalOpen, showResult,win,item_name} = props;
    function onClickMore(){
        window.location.assign(dodMoreLink);
    }
    function onClickSmsAgain(){
        const a = document.createElement('a');
        a.setAttribute('href', 'https://www.notion.so/755a29a0d63b40fe91e1cd9c915b3039');
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <>
            {
            isModalOpen? (
                <div className='modal'>
                    <div className='modal-container'>
                        {
                            showResult?(
                                <>
                                    {
                                        win?(<p className='result-modal-title'>축하합니다!<br/>'{item_name}'당첨!</p>):(<p className='result-modal-title'>아쉬워요ㅠㅠ<br/>다음에는 꼭 당첨되실 거에요!</p>)
                                    }
                                    {
                                        win?(<p className='result-modal-subtitle'>인증하신 번호로 문자 발송되셨습니다!</p>):(<p className='result-modal-subtitle'>설문에 응해주셔서 감사합니다!</p>)
                                    }
                                    <img className={win?('result-modal-img-win'):('result-modal-img')} src={win?(process.env.PUBLIC_URL + 'dod-cong.png'):(process.env.PUBLIC_URL + 'dod-sorry.png')}></img>
                                    
                                    <div>
                                        <p className='result-more-btn'>혹시! 디오디가 궁금하신가요?</p>
                                        <button className='result-btn  result-modal' onClick={onClickMore}>디오디에 대해 알아보기</button>
                                    </div>
                                    {
                                        win?(
                                            <p className='result-win-alert-text'>· 모바일 쿠폰의 유효기간 연장 및 환불이 불가하므로<br/>
                                                반드시 유효기간 내 사용하시기 바랍니다
                                                <br/>
                                                · 만약 쿠폰 확인이 안되실 경우, <u onClick={onClickSmsAgain}>여기를 클릭해 주세요</u>
                                            </p>
                                        ):(<></>)
                                    }
                                    

                                </>
                            ):(
                                <>
                                    <p className='result-modal-title'>
                                        추첨이 시작되었습니다!
                                    </p>
                                    <img className='result-modal-img' src={process.env.PUBLIC_URL + 'dod-animation1.gif'}/>
                                </>
                            )
                        }
                        
                    </div>
                </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}
