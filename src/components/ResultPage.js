import React,{useState, useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './ResultPage.css'
import ResultModal from './ResultModal'
import baseUrl from '../network/network';

export default function ResultPage(props) {
    const history=useHistory();
    const queryString = require('query-string');
    const params = queryString.parse(props.location.search)
    const [projectKey, setProjectId] = useState(params.p);
    const [validatorKey, setValidatorKey] = useState(params.v);
    const [smsSuccess, setsmsSuccess] = useState(false);
    const [smsFail, setsmsFail] = useState(false);
    const [confirmFailed, setConfirmFailed] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [win, setWin] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [itemName, setItemName] = useState('');

    const confirmKeyAlertMessage = useRef(null);
    const smsAlertMessage = useRef(null);
    const getConfirmKeyButton = useRef(null);

    const [smsSent, setsmsSent] = useState(false);

    const [phone, setPhone] = useState('');
    const [sentPhone, setSentPhone] = useState('');
    const [confirmKey, setConfirmKey] = useState('');

    useEffect(()=>{
        fetch(`${baseUrl}/api/v1/check/is_valid/`,{
            method:'POST',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
            },
            body:JSON.stringify({
                project_key:projectKey,
                validator:validatorKey
            })
        }).then(res => {
            if(res.status === 200){
                return res.json();
            }else{
                history.push('/invalid');
            }
        }).then(res => {
            if(res.dod_status === 400){
                history.push('/invalid');
            }else if(res.dod_status === 999){
                history.push('/forbidden');
            }
        })
    }, [])


    function onChangePhoneInput(e){
        setsmsSuccess(false);
        setsmsFail(false);
        setPhone(e.target.value);
    }
    function onChangeConfirmKey(e){
        setConfirmFailed(false);
        setConfirmKey(e.target.value);
    }
    function changeButtonText(disable){
        const btn = getConfirmKeyButton.current;
        if(disable){
            btn.disabled = true;
            btn.firstChild.data = '전송중';
            btn.style.backgroundColor = '#CFCFCF';
            btn.style.borderColor = '#CFCFCF'
            btn.classList.add('noHover');
        }else{
            btn.disabled = false;
            btn.firstChild.data = '인증번호 문자 받기';
            btn.style.backgroundColor = '#7C44FF';
            btn.style.borderColor = '#7C44FF'
            btn.classList.remove('noHover');
        }
    }

    function onClickGetConfirmKey() {
        setConfirmFailed(false);
        if((phone != '')&&phone.length == 11){
            changeButtonText(true);
            fetch(`${baseUrl}/api/v1/sms/respondent_send/`,{
                method:"POST",
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8'},
                body:JSON.stringify({
                    phone:phone
                })
            }).then(function(res) {
                changeButtonText(false);
                if(res.ok){
                    setsmsSuccess(true);//안내메시지
                    setsmsFail(false);//안내메시지
                    setsmsSent(true);
                    setSentPhone(phone);
                }else if(res.status == 410){
                    smsFailAlert('다시 시도해주세요.');
                    setsmsSent(false);
                }else{
                    return res.json();
                }
            }
            )
            .then(
                (res) => {
                    if(res.non_field_errors[0] != ''){
                        smsFailAlert(res.non_field_errors[0]);
                    }else{
                        smsFailAlert('전화번호를 확인해주세요.')
                    }
                    setsmsSent(false);
                }
            ).catch(function(error){
                
            })
        }else{
            smsFailAlert('전화번호를 확인해주세요.');
            setsmsSent(false);
        }
    }

    function smsFailAlert(text){
        setsmsSuccess(false);
        smsAlertMessage.current.innerText = text;
        setsmsFail(true);
    }

    function onClickConfirm(){
        if(smsSent){
            if(confirmKey == ''){
                confirmFailAlert('인증번호를 입력해주세요.')
            }else{
                fetch(`${baseUrl}/api/v1/sms/respondent_confirm/`,{
                    method:"POST",
                    headers:{
                        'accept' : 'application/json',
                        'content-type' : 'application/json;charset=UTF-8'},
                    body:JSON.stringify({
                        phone:sentPhone,
                        confirm_key : confirmKey,
                        project_key:projectKey,
                        validator:validatorKey
                    })
                }).then(function(res){
                    return res.json();
                }).then(res => {
                    if(res.is_win === undefined){
                        if(res.non_field_errors[0] != ''){
                            confirmFailAlert(res.non_field_errors[0])
                        }else{
                            confirmFailAlert('잘못된 인증번호입니다.')
                        }
                    }else{
                        setWin(res.is_win);
                        setItemName(res.item_name);
                        setShowResultModal(true);
                        setTimeout(()=>{
                            setShowResult(true);
                        }, 4800 )
                    }
                }).catch(function(res){
                    
                })
            }
        }else{
            confirmFailAlert('인증번호를 먼저 전송해주세요.');
        }
    }
    function confirmFailAlert(text){
        confirmKeyAlertMessage.current.innerText = text;
        setConfirmFailed(true);
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
                <img className='result-page-dod-img' src={process.env.PUBLIC_URL + '/../dod.png'}/>
                <p className='result-page-text'>
                    당첨시 잘못된 번호로 전달되는 것을 방지하기 위해<br/>
                    아래 휴대전화 문자 인증을 해주세요<br/>
                    추첨이 끝나는 즉시 파기됩니다.
                </p>          
            </div>
            <div>
                <div className='signup-textbox'>
                    <p className='signup-small-text'>전화번호</p>
                    <p className={smsSuccess? 'signup-sms-success' : 'signup-sms-success hide'}>인증번호가 전송되었어요.</p>
                    <p ref = {smsAlertMessage} className={smsFail? 'signup-sms-fail' : 'signup-sms-fail hide'}>전화번호를 확인해주세요.</p>
                </div>
                <input name='id' className = 'signup-id-input' type='tel' placeholder='휴대전화 번호를 입력해주세요' onChange={onChangePhoneInput}>
                </input>
                <button ref={getConfirmKeyButton} id = 'result-getConfirmKey' className='result-btn' onClick={onClickGetConfirmKey}>
                    인증번호 문자 받기
                </button>
                <div className='contour-16margin-both'/>
                <div className='signup-textbox'>
                    <p className='signup-small-text'>인증번호</p>
                    <p ref={confirmKeyAlertMessage} className={confirmFailed? 'signup-confirm-fail' : 'signup-confirm-fail hide'}>인증번호가 다릅니다.</p>
                </div>
                <input name='pw' className = 'signup-pw-input' type='text' placeholder='인증번호를 입력해주세요' onChange={onChangeConfirmKey}>
                </input>
                <button id = 'result-confirm' className='result-btn' onClick={onClickConfirm}>
                    인증 후 당첨 확인하기
                </button>
            </div>
            <ResultModal isModalOpen={showResultModal} showResult = {showResult} win={win} item_name={itemName}/>
        </div>
    )
}