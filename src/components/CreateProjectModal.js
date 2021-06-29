import React,{useState} from 'react'
import './CreateProjectModal.css'
import baseUrl from '../network/network';
import StatusTag from './StatusTag'

export default function CreateProjectModal(props) {
    const {name, price, isModalOpen, closeModal,projectId} = props;
    function keepModalOpen(event){
        event.stopPropagation();
    }
    const [clicked, setClicked] = useState(false);
    function onClickYes(){
        fetch(`${baseUrl}/api/v1/deposit-success/${projectId}/`,{
            method:'GET',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.ok){
                setClicked(true);
            }else{
                window.alert('다시 로그인해주세요.')
                window.location.assign('/');
            }
        })
    }
    function onClickCheckLink(){
        sessionStorage.setItem('getLinkProjectId', projectId);
        window.location.assign('/projectlink');
    }
    function closeModalHandler(){
        setClicked(false);
        closeModal();
    }
    return (
        <>
            {
                isModalOpen? 
                <div className={'modal'} onClick={closeModalHandler}>
                    <div className='modal-container' onClick={keepModalOpen}>
                        {
                            clicked?(<>
                                <p className='create-modal-text1'>추첨 링크가 생성되었어요!</p>
                                <p className='create-modal-text2'>입금 확인까지 <span className='text-strong'>최대 10분</span>정도 소요됩니다.<br/>
                                확인뒤 안내문자와 함께 상태가 바뀌어요!
                                </p>
                                <div className='create-modal-status-text'>
                                    <StatusTag status={200}/>
                                    <img src={process.env.PUBLIC_URL + 'arrow.png'}/>
                                    <StatusTag status={300}/>
                                    or
                                    <StatusTag status={100}/>
                                </div>
                                <div className='contour-16margin'/>
                                <div className='create-modal-Btn'>
                                    <button className='create-modal-button-checklink' onClick={onClickCheckLink}>확인</button>
                                </div>
                            </>):(<>
                                <p className='create-modal-text1'>아래의 정보로 입금하셨나요?</p>
                                <p className='create-modal-text2'>입금자명 : <span className='create-modal-value'>{name}</span></p>
                                <p className='create-modal-text3'>결제금액 : <span className='create-modal-value'>{price}원</span></p>
                                <div className='contour-16margin'/>
                                <div className='create-modal-Btn'>
                                    <button className='create-modal-button no' onClick={closeModalHandler}>아니요</button>
                                    <button className='create-modal-button yes' onClick={onClickYes}>예</button>
                                </div>
                            </>)
                        }
                        
                    </div>
                </div>
                :
                <>
                </>
            }  
        </>
    )
}
