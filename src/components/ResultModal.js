import React,{useState, useEffect} from 'react'
import './ResultModal.css'

export default function ResultModal(props) {
    const {isModalOpen, win} = props;
    const [showResult, setShowResult] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setShowResult(true);
        }, 3000)
    },[])
    function onClickMore(){
        window.location.assign('/');
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
                                        win?(<p className='result-modal-title'>축하합니다!<br/>당첨되셨습니다!</p>):(<p className='result-modal-title'>아쉬워요ㅠㅠ<br/>다음에는 꼭 당첨되실거에요!</p>)
                                    }
                                    <img className='result-modal-img' src={process.env.PUBLIC_URL + 'dod.png'}></img>
                                    {
                                        win?(<p className='result-modal-subtitle'>인증하신 번호로 문자 발송되셨습니다!</p>):(<p className='result-modal-title'>설문에 응해주셔서 감사합니다!</p>)
                                    }
                                    <div>
                                        <p className='result-more-btn'>혹시! 디오디가 궁금하신가요?</p>
                                        <button className='result-btn' onClick={onClickMore}>디오디에 대해 알아보기</button>
                                    </div>
                                </>
                            ):(
                                <>
                                    <p className='result-modal-title'>
                                        추첨이 시작되었습니다!
                                    </p>
                                    <img className='result-modal-img' src={process.env.PUBLIC_URL + ''}/>
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
