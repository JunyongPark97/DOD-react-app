import React, {useState, useRef, useEffect} from 'react'
import { Button } from './Button';
import './Payment.css'
import CreateProjectModal from './CreateProjectModal'

import baseUrl from '../network/network';

function Payment(props) {
    const {projectId, name, setName, pageNum, price} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [qr_code, setQRCode] = useState('');
    const [toss_url, setTossUrl] = useState('');
    
    useEffect(()=>{
        fetch(`${baseUrl}/api/v1/deposit-info/`,{
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'}
        }).then(
            res => res.json()
        ).then(res => {
            setQRCode(res.qr_code);
            setTossUrl(res.url);
        })
        if(name !== ''){
            nameInput.current.value = name;
        }
    }, [])

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
            fetch(`${baseUrl}/api/v1/project/${projectId}/depositor/`,{
                method:'PUT',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:JSON.stringify({
                    depositor:nameInput.current.value
                })
            }).then(function(res){
                if(res.ok){
                    setName(nameInput.current.value);
                    console.log(nameInput.current.value);
                }else{
                    console.log(res);
                }
            })
        }
    }
    function onChangeName(){
        setAlertShow(false);
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function onClickTossLink(){
        const a = document.createElement('a');
        a.setAttribute('href', toss_url);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <>
            {
                (pageNum === 1)?
                <div className='payment-container'>
                    <p className='payment-title'><span className='payment-price'>{numberWithCommas(price)}원</span>을 결제해주세요!</p>
                    <p className='payment-subtitle'>현재 무통장 입금만을 지원합니다</p>
                    <div className='payment-text-box'>
                        <p className='payment-text1'>입금자명</p>
                        <p className={alertShow?'payment-name-alert':'payment-name-alert hide'}>입금자명을 입력해주세요!</p>
                    </div>
                    <div className='payment-name-container'>
                        <input ref={nameInput} name='name' className = 'payment-name' placeholder='입금자명을 입력해주세요' onChange={onChangeName} >
                            
                        </input>
                        <button className = 'payment-name-submit-btn' onClick={onClickNameSubmit}>
                            확인
                        </button>
                    </div>
                    <div className={(name!=='')? 'payment-code-container' : 'payment-code-container hide' }>
                        <div className='payment-code-pc'>
                            <p className='payment-code-text1'>PC에서 결제하기</p>
                            <div className='payment-codebox'>
                                <img className='qrcode-img' src={qr_code}/>
                            </div>
                            <p className='payment-code-text2'>휴대폰으로 위 QR코드를 스캔해주세요!</p>
                        </div>
                        <div className='payment-code-mobile'>
                            <p className='payment-code-text1'>모바일에서 결제하기</p>
                            <div className='payment-codebox'>
                                <button className='toss-link-btn' onClick={onClickTossLink}>링크로 결제하기</button>
                            </div>
                            <p className='payment-code-text2'>위 링크에서 토스 혹은 타은행 앱으로 결제해주세요!</p>
                        </div>
                    </div>
                    <button className = {(name!=='')? 'payment-submit-btn' : 'payment-submit-btn disabled'} onClick={(name!=='')? openModal : null}>
                        입금 완료
                    </button>
                    <CreateProjectModal projectId={projectId} name = {name} price={numberWithCommas(price)} isModalOpen={isModalOpen} closeModal={closeModal}/>
                </div>
                :
                <></>
            }
        </>
    )
}

export default Payment
