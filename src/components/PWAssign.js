import React,{useState} from 'react'
import {Button} from './Button'
import './PWAssign.css'
import baseUrl from '../network/network';

function PWAssign(props) {
    const {isOpen, closeModal, loginFunction} = props;
    const [showAlert, setShowAlert] = useState(false);
    const [pw1 , setPw1] = useState('');
    const [pw2, setPw2] = useState('');


    function onChangePw1(e){
        setPw1(e.target.value);
    }
    function onChangePw2(e) {
        setPw2(e.target.value);
        handleAlert(e.target.value);
    }
    function handleAlert(tempPw2){
        if(tempPw2 === pw1){
            setShowAlert(false);
        }else{
            setShowAlert(true);
        }
    }

    function signUp(){
        if(pw1 === pw2 && pw1 !== ''){
            fetch(`${baseUrl}/accounts/v1/signup/`,{
                method:"POST",
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8'},
                body:JSON.stringify({
                    phone: sessionStorage.getItem('phone'),
                    confirm_key: sessionStorage.getItem('confirmKey'),
                    password : pw1
                })
            }).then(res => res.json())
            .then(res => {
                sessionStorage.setItem('DODtoken', res.token);
                sessionStorage.setItem('userName', res.name);
                window.dataLayer.push({
                    'userid': `${res.id}`
                }); //고객 번호와 같은 개인정보가 아닌 고유한 식별 값을 입력합니다.
                loginFunction();
                closeModal();
            })
        }
    }

    return (
        <>
            {
            isOpen?  (
                <>
                    <p className='pwassign-text'>인증되었어요!<br/>비밀번호를 설정해주세요!</p>
                    <div className='pwassign-textbox'>
                        <p className='pwassign-small-text'>비밀번호</p>
                    </div>
                    <input name='pw' className = 'pwassign-id-input' onChange={onChangePw1} type='password' placeholder='비밀번호를 입력해주세요.' maxLength='12'>

                    </input>
                    <div className='pwassign-textbox'>
                        <p className='pwassign-small-text'>비밀번호 재확인</p>
                        <p className={showAlert? 'pwassign-alert' : 'pwassign-alert hide'}>비밀번호가 일치하지 않아요.</p>
                    </div>
                    <input name='pw2' className = 'pwassign-pw-input' onChange={onChangePw2} type='password' placeholder='다시 한번 입력해주세요.'  maxLength='12'>

                    </input>
                    <div className='contour-16margin'/>
                    <Button buttonSize='btn--xlarge' className='pwassign-submit-btn' onClick={signUp}>
                        회원가입 완료하기
                    </Button>
                </>
            ) : <></>
        }
        </>
    )
}

export default PWAssign
