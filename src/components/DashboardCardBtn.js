import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import './DashboardCardBtn.css'

export default function DashboardCardBtn(props) {
    const {status, projectId, deleteProject} = props;
    const history = useHistory();
    let component = null;
    function onCliclGetLink(){
        sessionStorage.setItem('getLinkProjectId', projectId)
        history.push('/projectlink');
    }
    function onClickDelete(){
        deleteProject()
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
                    <button className='dashboard-card-btn-pay'><span className='dashboard-card-btn-paytext'>입금을 안했다면</span>결제하기</button>
                    <button className='dashboard-card-btn-delete' onClick={onClickDelete}>삭제</button>
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
