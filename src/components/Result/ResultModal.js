import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import './ResultModal.css'
import {dodMoreBoard, giftNotDelivered} from '../../network/network'

export default function ResultModal(props) {
    const history = useHistory();
    const {isModalOpen, showResult,win,item_name,item_img_url, is_dod_lottery} = props;
    function onClickMore(){
        window.location.assign(dodMoreBoard);
    }
    function onClickSmsAgain(){
        const a = document.createElement('a');
        a.setAttribute('href', giftNotDelivered);
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
                                        win?(
                                            is_dod_lottery?<p className='result-modal-title'>축하합니다!<br/>디오디 추첨에 당첨되셨어요!</p>:<p className='result-modal-title'>축하합니다!<br/>당첨되셨어요!</p>
                                        ):(<></>)
                                    }
                                    {
                                        win?(
                                            is_dod_lottery?<p className='result-modal-subtitle'>디오디 추첨은 매일 저녁 일괄발송 됩니다.</p>:<p className='result-modal-subtitle'>인증하신 번호로 문자 발송되었습니다!</p>
                                        ):(<></>)
                                    }
                                    <img className={win?('result-modal-img-win'):('result-modal-img')} src={win?(item_img_url):(process.env.PUBLIC_URL + 'dod-sorry.gif')}></img>
                                    {
                                        win?(
                                            is_dod_lottery?(
                                                <p className='result-win-alert-text'>·모바일 쿠폰의 유효기간 연장 및 환불이 불가하므로<br/>
                                                    반드시 유효기간 내 사용하시기 바랍니다
                                                    <br/>
                                                    ·디오디 추첨은 매일 저녁 일괄발송 됩니다.
                                                </p>
                                            ):(
                                                <p className='result-win-alert-text'>·모바일 쿠폰의 유효기간 연장 및 환불이 불가하므로<br/>
                                                    반드시 유효기간 내 사용하시기 바랍니다
                                                    <br/>
                                                    ·쿠폰 확인이 안되실 경우, <u style={{fontFamily : 'noto-medium', cursor:'pointer'}} className='clickable' onClick={onClickSmsAgain}>여기를 클릭해 주세요</u>
                                                </p>
                                            )
                                            
                                        ):(
                                            <p className='result-win-alert-text'>·평균 3-5%의 확률로 당첨자가 선정됩니다.
                                                <br/>
                                                ·한번 더 추첨하시고 싶으시다면, 디오디에서 다른<br/>설문에 참여하실 수 있습니다.
                                                <br/>
                                                ·설문 종료 후 미지급 상품은 미당첨자를 대상으로<br/>재추첨하여 전달해드립니다.
                                            </p>
                                        )
                                    }
                                    <div className='result-modal-plz-container clickable' onClick={onClickMore}  style={{cursor:'pointer'}}>
                                        <p className='result-modal-plz-text' style={{cursor:'pointer'}}>
                                            다른 설문 참여하고<br/>한번 더 추첨하실 수 있어요
                                        </p>
                                        <div style={{cursor:'pointer'}} className='result-modal-plz-innerbox'>
                                            <p style={{cursor:'pointer'}} className='result-modal-plz-btn' >자세히 보기</p>
                                            <img style={{cursor:'pointer'}} className='result-modal-plz-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-blue.png'}/>
                                        </div>
                                        <img style={{cursor:'pointer'}} className='result-modal-plz-img' alt='' src={process.env.PUBLIC_URL + '/hand.png'}/>
                                    </div>
                                </>
                            ):(
                                <>
                                    <img className='result-modal-img-animation' src={process.env.PUBLIC_URL + 'dod-speech-with-mention60.gif'}/>
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
