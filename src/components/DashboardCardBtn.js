import React,{useState} from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import './DashboardCardBtn.css'

export default function DashboardCardBtn(props) {
    const {status, projectId, depositor, totalPrice, deleteProject} = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const history = useHistory();
    let component = null;
    function onCliclGetLink(){
        sessionStorage.setItem('getLinkProjectId', projectId)
        history.push('/projectlink');
    }
    function onClickDelete(){
        deleteProject();
        setDeleteModalOpen(false);
    }
    function onClickCheckPayment(){
        sessionStorage.setItem('checkPaymentProjectId', projectId);
        sessionStorage.setItem('checkPaymentName', depositor);
        sessionStorage.setItem('checkPaymentPrice', totalPrice);
        history.push('/checkpayment');
    }
    function openDeleteModal(){
        setDeleteModalOpen(true);
    }
    function closeModal(){
        setDeleteModalOpen(false);
    }
    function keepModalOpen(e){
        e.stopPropagation();
    }
    switch(status){
        case 100:
            component = (
                <div className='dashboard-card-btn-container'>
                    <button className='dashboard-card-btn-getlink abled' onClick={onCliclGetLink}>추첨 링크 복사하기</button>
                </div>
                )
            break;
        case 200:
            component = component = (
                <div className='dashboard-card-btn-container'>
                    <button className='dashboard-card-btn-pay' onClick={onClickCheckPayment}><span className='dashboard-card-btn-paytext'>입금을 안했다면</span>결제하기</button>
                    <button className='dashboard-card-btn-delete' onClick={openDeleteModal}>삭제</button>
                    {
                        deleteModalOpen?(
                            <div className='modal' onClick={closeModal}>
                                <div className='modal-container' onClick={keepModalOpen}>
                                    <p className='dashboard-card-btn-title'>프로젝트를 삭제하시겠어요?</p>
                                    <p className='dashboard-card-btn-subtitle'>걱정마세요!<br/> 문의하기를 통해 환불 받으실 수 있어요</p>
                                    <div className='contour-16margin-both'/>
                                    <button className='dashboard-delete' onClick={onClickDelete}>삭제</button>
                                </div>
                            </div>
                        ):(
                            <></>
                        )
                    }
                </div>
                )
            break;
        case 300:
            component = (
                <div className='dashboard-card-btn-container'>
                    <button className='dashboard-card-btn-getlink abled' onClick={onCliclGetLink}>추첨 링크 복사하기</button>
                </div>
                )
            break;
        case 999:
            component = (
                <div className='dashboard-card-btn-container'>
                    <button className='dashboard-card-btn-getlink disabled'>추첨 링크 복사하기</button>
                </div>
                )
            break;
        default :
            component = (
                <div className='dashboard-card-btn-container'>
                    <button className='dashboard-card-btn-getlink abled' onClick={onCliclGetLink}>추첨 링크 복사하기</button>
                </div>
                )
            break;
    }
    return(
        <>
            {component}
        </>
    )
}
