import React,{useState} from 'react'
import { Button } from './Button'
import './SignModal.css'

function SignModal(props) {
    const {isModalOpen, closeModalFunction} = props;
    
    
    return (
        
        <>
            {
            isModalOpen? (
                <div className='modal' onClick={closeModalFunction}>
                    <div className='modal-container'>
                        <p className='modal-text'>디오디 시작하기</p>
                        <button className = {'modal-signup-btn'}>
                                회원가입하기
                        </button>
                        <button className = {'modal-signin-btn'}>
                                이미 가입했었나요?
                        </button>
                    </div>
                </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default SignModal

