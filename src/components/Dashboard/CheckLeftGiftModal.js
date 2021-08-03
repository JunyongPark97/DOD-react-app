import React from 'react'

function CheckLeftGiftModal(props) {
    const {isModalOpen, closeModal, res}
    function keepModalOpen(e){
        e.stopPropagation();
    }
    function getComponents(res){
        var itemList = res.data;
        if(res.type === 1){
            var component = (
                itemList.map((item, index) => {
                    <div className='gift-list-item-card' index ={index}>
                        <img src={item.thumbnail} alt='' className='gift-list-item-img'/>
                        <p className='gift-list-item-num'><span className='gift-list-item-status'>{item.left_count}</span>/{item.total_count}</p>
                    </div>
                })
            )
            return component;
        }else{
            var component = (
                itemList.map((item, index) => {
                    <div className='gift-list-private-gift-card' index={index}>
                        <img src={item.thumbnail} alt='' className='gift-list-private-gift-img'/>
                        <div className='gift-list-private-alpha'/>
                    </div>
                })
            )
            return component;
        }
    }
    return (
        isModalOpen?(
            <div className={'modal'} onClick={closeModal}>
                <div className='check-gift-modal-container' onClick={keepModalOpen}>
                    <img src={process.env.PUBLIC_URL + 'close-icon.png'} className='modal-close-btn' onClick={closeModal}/>
                    <p className='post-title'>기프티콘 지급 현황</p>
                    <div className='check-gift-container'>
                        {
                            getComponents(res)
                        }
                    </div>
                </div>
            </div>
        ):<></> 
    )
}

export default CheckLeftGiftModal
