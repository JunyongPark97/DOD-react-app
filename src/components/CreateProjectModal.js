import React from 'react'
import moduleName from './CreateProjectModal.css'
export default function CreateProjectModal(props) {
    const {name, price, isModalOpen, closeModal, fetchServerToCreateProject} = props;
    function keepModalOpen(event){
        event.stopPropagation();
    }

    return (
        <>
            {
                isModalOpen? 
                <div className={'modal'} onClick={closeModal}>
                    <div className='modal-container' onClick={keepModalOpen}>
                        <p className='create-modal-text1'>아래의 정보로 입금하셨나요?</p>
                        <p className='create-modal-text2'>입금자명 : <span className='create-modal-value'>{name}</span></p>
                        <p className='create-modal-text3'>결제금액 : <span className='create-modal-value'>{price}원</span></p>
                        <div className='contour-16margin'/>
                        <div className='create-modal-Btn'>
                            <button className='create-modal-button no' onClick={closeModal}>아니요</button>
                            <button className='create-modal-button yes' onClick={fetchServerToCreateProject}>예</button>
                        </div>
                        
                    </div>
                </div>
                :
                <>
                </>
            }  
        </>
    )
}
