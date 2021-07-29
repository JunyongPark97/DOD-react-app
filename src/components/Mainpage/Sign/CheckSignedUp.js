import React from 'react'
import './CheckSignedUp.css'

function CheckSignedUp(props) {
    const {isCheckSignedOpen, handleClickSignIn, handleClickSignUp} = props;
    return (
        <>
            {
                isCheckSignedOpen? (
                    <>
                        <p className='modal-text'>디오디 시작하기</p>
                        <button className = {'modal-signup-btn'} onClick={handleClickSignUp}>
                            회원가입하기
                        </button>
                        <button className = {'modal-signin-btn'} onClick={handleClickSignIn}>
                        이미 가입했었나요?
                        </button>
                    </>
                ) :
                <></>
            }
        </>
    )
}

export default CheckSignedUp
