import React from 'react'
import './CheckLeftGiftModal.css'

function CheckLeftGiftModal(props) {
    const {closeModal, res} = props;
    function keepModalOpen(e){
        e.stopPropagation();
    }
    function getComponents(res){
        var itemList = res.data;
        console.log(itemList);
        if(res.type === 1){
            console.log('type 1');
            var component = (
                itemList.map((item, index) => {
                    return (
                        <div className='gift-list-item-card' index ={index}>
                            <img src={item.thumbnail} alt='' key={index} className='gift-list-item-img'/>
                            <p key={index} className='gift-list-item-num'><span key={index} className='gift-list-item-status'>{item.left_count}</span>/{item.total_count}</p>
                        </div>
                    )
                })
            )
            return component;
        }else{
            console.log('type 2');
            var component = (
                itemList.map((item, index) => {
                    return (
                        <div className='gift-list-private-gift-card' index={index}>
                            <img src={item.thumbnail} key={index} alt='' className='gift-list-private-gift-img'/>
                            {
                                item.is_used?<div key={index} className='gift-list-private-alpha'/>:<></>
                            }
                        </div>
                    )
                })
            )
            return component;
        }
    }
    return (
        
        <div className={'modal'} onClick={closeModal}>
            <div className='check-gift-modal-container' onClick={keepModalOpen}>
                <img src={process.env.PUBLIC_URL + 'close-icon.png'} className='modal-close-btn' onClick={closeModal}/>
                <p className='post-title' style={{padding : '0px'}}>기프티콘 지급 현황</p>
                <div className='check-gift-container'>
                    {
                        getComponents(res)
                    }
                </div>
            </div>
        </div>
        
    )
}

export default CheckLeftGiftModal
