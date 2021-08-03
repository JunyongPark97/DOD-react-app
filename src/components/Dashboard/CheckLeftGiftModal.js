import React from 'react'

function CheckLeftGiftModal(props) {
    const {isModalOpen, closeModal}
    function keepModalOpen(e){
        e.stopPropagation();
    }
    return (
        isModalOpen?(
            <div className={'modal'} onClick={closeModal}>
                <div className='check-gift-modal-container' onClick={keepModalOpen}>
                <img src={process.env.PUBLIC_URL + 'close-icon.png'} className='modal-close-btn' onClick={closeModal}/>
                    <p className='post-title'>삭제하시겠어요?</p>
                    <p className='post-delete-post-btn' onClick={deletePost}>확인</p>
                </div>
            </div>
        ):<></> 
    )
}

export default CheckLeftGiftModal
