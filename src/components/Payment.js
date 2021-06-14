import React, {useState, useRef} from 'react'
import { Button } from './Button';
import './Payment.css'
import CreateProjectModal from './CreateProjectModal'

function Payment(props) {
    const {name, setName, pageNum, price, fetchServerToCreateProject} = props;
    const [nameSent, setNameSent] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    
    const nameInput = useRef(null);
    function openModal(){
        setIsModalOpen(true);
    }
    function closeModal(){
        setIsModalOpen(false);
    }
    function onClickNameSubmit(){
        if(nameInput.current.value === ''){
            setAlertShow(true);
        }else{
            setName(nameInput.current.value);
            console.log(nameInput.current.value);
            setNameSent(true);
        }
    }
    function onChangeName(){
        setAlertShow(false);
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            {
                (pageNum === 1)?
                <div className='payment-container'>
                    <p className='payment-title'><span className='payment-price'>{numberWithCommas(price)}원</span>을 결제해주세요!</p>
                    <p className='payment-subtitle'>PC에서도 휴대폰으로 간편하게 결제할 수 있어요</p>
                    <div className='payment-text-box'>
                        <p className='payment-text1'>입금자명</p>
                        <p className={alertShow?'payment-name-alert':'payment-name-alert hide'}>입금자명을 입력해주세요!</p>
                    </div>
                    <div className='payment-name-container'>
                        <input ref={nameInput} name='name' className = 'payment-name' placeholder='입금자명을 입력해주세요' onChange={onChangeName}>

                        </input>
                        <button className = 'payment-name-submit-btn' onClick={onClickNameSubmit}>
                            확인
                        </button>
                    </div>
                    <div className={nameSent? 'payment-code-container' : 'payment-code-container hide' }>
                        <div className='payment-code-pc'>
                            <p className='payment-code-text1'>PC에서 결제하기</p>
                            <div className='payment-codebox'>
                                d
                            </div>
                            <p className='payment-code-text2'>휴대폰으로 위 QR코드를 스캔해주세요!</p>
                        </div>
                        <div className='payment-code-mobile'>
                            <p className='payment-code-text1'>모바일에서 결제하기</p>
                            <div className='payment-codebox'>
                                d
                            </div>
                            <p className='payment-code-text2'>위 링크에서 토스 혹은 타은행 앱으로 결제해주세요!</p>
                        </div>
                    </div>
                    <button className = {nameSent? 'payment-submit-btn' : 'payment-submit-btn disabled'} onClick={nameSent? openModal : null}>
                        입금 완료
                    </button>
                    <CreateProjectModal name = {name} price={numberWithCommas(price)} isModalOpen={isModalOpen} closeModal={closeModal} fetchServerToCreateProject = {fetchServerToCreateProject}/>
                </div>
                :
                <></>
            }
        </>
    )
}

export default Payment
