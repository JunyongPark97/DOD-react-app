import React,{useState, useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './ResultPage.css'
import baseUrl from '../../network/network';
import InactiveResultModal from './InactiveResultModal';

export default function InactiveResultPage(props) {
    const {location} = props;
    const history=useHistory();
    const queryString = require('query-string');
    const params = queryString.parse(location)
    const [projectKey, setProjectId] = useState(params.p);
    const [validatorKey, setValidatorKey] = useState(params.v);
    const [smsSuccess, setsmsSuccess] = useState(false);
    const [smsFail, setsmsFail] = useState(false);
    const [confirmFailed, setConfirmFailed] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [win, setWin] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemImgUrl, setItemImgUrl] = useState('');
    const [marketingAgree, setMarketingAgree] = useState(true);
    const [showMarketingAgree, setShowMarketingAgree] = useState(false);

    const confirmKeyAlertMessage = useRef(null);
    const smsAlertMessage = useRef(null);
    const getConfirmKeyButton = useRef(null);
    const pwInput = useRef(null);

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
            btn.firstChild.data = '?????????';
            btn.style.backgroundColor = '#CDCDD6';
            btn.style.borderColor = '#CDCDD6'
            btn.classList.add('noHover');
        }else{
            btn.disabled = false;
            btn.firstChild.data = '???????????? ?????? ??????';
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
                    phone:phone,
                    project_key:projectKey
                })
            }).then(function(res) {
                changeButtonText(false);
                if(res.ok){
                    setsmsSuccess(true);//???????????????
                    setsmsFail(false);//???????????????
                    setsmsSent(true);
                    setSentPhone(phone);
                    pwInput.current.focus();
                    res.json().then((data) => {
                        if(!data.agreed){
                            setShowMarketingAgree(true);
                        }
                    })
                }else if(res.status == 410){
                    smsFailAlert('?????? ??????????????????.');
                    setsmsSent(false);
                }else{
                    return res.json();
                }
            })
            .then(
                (res) => {
                    if(res.non_field_errors[0] != ''){
                        smsFailAlert(res.non_field_errors[0]);
                    }else{
                        smsFailAlert('??????????????? ??????????????????.')
                    }
                    setsmsSent(false);
                }
            ).catch(function(error){
                
            })
        }else{
            smsFailAlert('??????????????? ??????????????????.');
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
                confirmFailAlert('??????????????? ??????????????????.')
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
                        validator:validatorKey,
                        agree:marketingAgree
                    })
                }).then(function(res){
                    return res.json();
                }).then(res => {
                    if(res.is_win === undefined){
                        if(res.non_field_errors[0] != ''){
                            confirmFailAlert(res.non_field_errors[0])
                        }else{
                            confirmFailAlert('????????? ?????????????????????.')
                        }
                    }else{
                        setWin(res.is_win);
                        setItemName(res.item_name);
                        setItemImgUrl(res.won_thumbnail);
                        setShowResultModal(true);
                        setTimeout(()=>{
                            setShowResult(true);
                        }, 6000 )
                    }
                }).catch(function(res){
                    
                })
            }
        }else{
            confirmFailAlert('??????????????? ?????? ??????????????????.');
        }
    }
    function confirmFailAlert(text){
        confirmKeyAlertMessage.current.innerText = text;
        setConfirmFailed(true);
    }
    function onClickMarketingAgree(){
        setMarketingAgree(!marketingAgree);
    }
    return (
        <div className='result-page-container'>
            <div className='result-page-content'>
                <p className='result-page-title'>??????????????? ??????<br/>????????? ???????????????</p>
                <p className='result-page-subtitle'>
                    ??????????????? ???????????? ????????? ?????????????????????!
                </p>
                <img className='result-page-dod-img' src={process.env.PUBLIC_URL + '/../gift-off.png'}/>
                <p className='result-page-text'>
                    ????????? ????????? ????????? ???????????? ?????? ???????????? ??????<br/>
                    ???????????? ?????? ????????? ??????????????? ????????????.<br/>
                    ????????? ????????? ?????? ???????????????.
                </p>          
            </div>
            <div className='result-page-input-container'>
                <div className='signup-textbox'>
                    <p className='signup-small-text'>????????????</p>
                    <p className={smsSuccess? 'signup-sms-success' : 'signup-sms-success hide'}>??????????????? ??????????????????.</p>
                    <p ref = {smsAlertMessage} className={smsFail? 'signup-sms-fail' : 'signup-sms-fail hide'}>??????????????? ??????????????????.</p>
                </div>
                <input name='id' className = 'signup-id-input' type='tel' placeholder='???????????? ????????? ??????????????????' onChange={onChangePhoneInput}>
                </input>
                <button ref={getConfirmKeyButton} id = 'result-getConfirmKey' className='result-btn' onClick={onClickGetConfirmKey}>
                    ???????????? ?????? ??????
                </button>
                <div className='contour-16margin-both'/>
                <div className='signup-textbox'>
                    <p className='signup-small-text'>????????????</p>
                    <p ref={confirmKeyAlertMessage} className={confirmFailed? 'signup-confirm-fail' : 'signup-confirm-fail hide'}>??????????????? ????????????.</p>
                </div>
                <input ref={pwInput} name='pw' className = 'signup-pw-input' type="number" pattern="\d*" placeholder='??????????????? ??????????????????' onChange={onChangeConfirmKey}>
                </input>
                {
                    showMarketingAgree?<>
                        <div className='result-page-marketing-agree-container'>
                            <img alt='' src={marketingAgree?process.env.PUBLIC_URL + '/box-checked.png':process.env.PUBLIC_URL + '/box-empty.png'} style={{cursor:'pointer'}} onClick={onClickMarketingAgree}/>
                            <p style={{fontFamily:'noto-regular', fontSize:'12px', color:'#020203', marginLeft:'8px', marginTop:'0px', marginBottom: '0px'}}>
                                ????????? ?????? <span style={{color:'#4784FF', cursor:'pointer'}}>?????? ??????</span>??? <span style={{color:'#4784FF', cursor:'pointer'}}>????????? ??????</span>??? ???????????????.<span style={{color:'#7E47FF'}}>(??????)</span>
                            </p>
                        </div>
                    </>:<></>
                }
                <button id = 'result-confirm' className='result-btn last' onClick={onClickConfirm}>
                    ?????? ??? ?????? ????????????
                </button>
            </div>
            <InactiveResultModal isModalOpen={showResultModal} showResult = {showResult} win={win} item_name={itemName} item_img_url={itemImgUrl}/>
        </div>
    )
}