import React,{useState, useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './ResultPage.css'

export default function ResultPage({match}) {
    const history=useHistory();
    const [projectKey, setProjectId] = useState(match.params.projectKey);
    const [smsSuccess, setsmsSuccess] = useState(false);
    const [smsFail, setsmsFail] = useState(false);
    const [confirmFailed, setConfirmFailed] = useState(false);

    const confirmKeyAlertMessage = useRef(null);
    const smsAlertMessage = useRef(null);

    const [smsSent, setsmsSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const [allowedUrl, setAllowedUrl] = useState(false);

    const [phone, setPhone] = useState('');
    const [sentPhone, setSentPhone] = useState('');
    const [confirmKey, setConfirmKey] = useState('');

    useEffect(()=>{
        const money = sessionStorage.getItem('referrer');
        console.log(money);
        console.log('history', history)
        if(money !== 'www.google.com'){
            setAllowedUrl(false);
        }else{
            setAllowedUrl(true);
        }
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

    function onClickGetConfirmKey() {
        if((phone != '')&&phone.length == 11){
            fetch('http://3.36.156.224:8000/api/v1/sms/respondent_send/',{
                method:"POST",
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8'},
                body:JSON.stringify({
                    phone:phone
                })
            }).then(function(res) {
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
                    console.log(res);
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
                console.log(sentPhone);
                console.log(confirmKey);
                console.log(projectKey);
                fetch('http://3.36.156.224:8000/api/v1/sms/respondent_confirm/',{
                    method:"POST",
                    headers:{
                        'accept' : 'application/json',
                        'content-type' : 'application/json;charset=UTF-8'},
                    body:JSON.stringify({
                        phone:sentPhone,
                        confirm_key : confirmKey,
                        project_key:projectKey
                    })
                }).then(function(res){
                    if(res.ok){
                        sessionStorage.setItem('phone', sentPhone);
                        sessionStorage.setItem('confirmKey', confirmKey);
                        // openPWAssign();
                    }else{
                        console.log(res);
                        return res.json();
                    }
                }).then(
                    (res) => {
                        if(res.non_field_errors[0] != ''){
                            confirmFailAlert(res.non_field_errors[0])
                        }else{
                            confirmFailAlert('잘못된 인증번호입니다.')
                        }
                    }
                ).catch(function(res){
                    
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
                {
                    allowedUrl?(
                        <p className='result-page-text'>
                            당첨시 잘못된 번호로 전달되는 것을 방지하기 위해<br/>
                            아래 휴대전화 문자 인증을 해주세요<br/>
                            추첨이 끝나는 즉시 파기됩니다.
                        </p>
                    ):(
                        <p className='result-page-text-alarm'>
                            현재 이용할 수 없는 추첨입니다.<br/>
                            설문자에게 문의해 주세요!
                        </p>
                    )
                }
                
                
            </div>
            {
                allowedUrl?(
                    <div>
                        <div className='signup-textbox'>
                            <p className='signup-small-text'>전화번호</p>
                            <p className={smsSuccess? 'signup-sms-success' : 'signup-sms-success hide'}>인증번호가 전송되었어요.</p>
                            <p ref = {smsAlertMessage} className={smsFail? 'signup-sms-fail' : 'signup-sms-fail hide'}>전화번호를 확인해주세요.</p>
                        </div>
                        <input name='id' className = 'signup-id-input' type='tel' placeholder='휴대전화 번호를 입력해주세요' onChange={onChangePhoneInput}>
                        </input>
                        <button id = 'result-getConfirmKey' className='result-btn' onClick={onClickGetConfirmKey}>
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
                ):(<div>
                    <p className='result-more-btn'>혹시! 디오디가 궁금하신가요?</p>
                    <button className='result-btn'>디오디에 대해 알아보기</button>
                </div>)
            }
            
        </div>
    )
}