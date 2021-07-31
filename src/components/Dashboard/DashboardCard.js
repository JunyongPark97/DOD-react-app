import React,{useEffect, useState} from 'react'
import './DashboardCard.css'
import StatusTag from './StatusTag';
import baseUrl from '../../network/network';
import Progress from 'react-progressbar'

export default function DashboardCard(props) {
    const {item, index, deleteProject} = props;
    const [showDelete, setShowDelete] = useState(false);
    const products = item.products;
    function getProgressbarBackColor(){
        switch(item.project_status){
            case 999:
                return '#9696A3';
            case 300:
                return '#FFEFCF';
            case 100:
                return '#E2D6FF';
        }
    }
    function getProgressbarColor(){
        switch(item.project_status){
            case 999:
                return '#9696A3';
            case 300:
                return '#FFEFCF';
            case 100:
                return '#7E47FF';
        }
    } 
    useEffect(() => {
        document.getElementsByClassName(`progressbar-container-${item.id}`)[0].style.background = getProgressbarBackColor()
        
    }, [])
    function deleteItem(){
        fetch(`${baseUrl}/api/v1/project/${item.id}/`,{
            method:'DELETE',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.ok){
                deleteProject(index);
            }else if(res.status === 401){
                window.location.assign('/');
            }else{
                console.log(res);
            }
        })
    }
    function onClickMore(){
        console.log('dd');
        setShowDelete(true);
    }
    return (
        <div className='dashboard-card-container'>
            <p className={showDelete?'dashboard-card-delete-btn':'dashboard-card-delete-btn none'}>삭제</p>
            <div className='dashboard-card-title-box'>
                <div className='dashboard-card-title-innerbox'>
                    <p className='dashboard-card-title'>
                        {item.name}
                    </p>
                    <StatusTag stats={item.project_status}/>
                </div>
                <img className='dashboard-card-more-btn' onClick={onClickMore} src={process.env.PUBLIC_URL + '/more-icon.png'} alt=''/>            
            </div>
            <p className='dashboard-card-percentage'>{item.progress}% 지급</p>
            <Progress className={`progressbar-container progressbar-container-${item.id}`}color={getProgressbarColor()} height='8px' completed={item.progress}/>
            <div className='dashboard-card-btn-box'>
            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-calendar.png'} alt=''/>
                <p className='dashboard-card-text-16'>{item.start_at} ~ {item.dead_at}</p>
            </div>
            <div className='dashboard-card-btn-box'>
                <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/person-icon-grey.png'} alt=''/>
                <p className='dashboard-card-text-28'>{item.total_respondent}명</p>
            </div>
            {
                (item.project_status === 999)? (<></>):(
                    <>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-link.png'} alt=''/>
                            <div className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>추첨 링크</p>
                                <p className='dashboard-card-text-12'>연결을 아직 못했다면?</p>
                            </div>
                            <p id='dashboard-card-checklink-btn' className={(item.project_status === 100)? 'dashboard-card-btn enabled':'dashboard-card-btn'}>연결하기</p>
                        </div>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'} alt=''/>
                            <div  className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>기프티콘</p>
                                <p className='dashboard-card-text-12'>뭐가 얼마나 남은거지?</p>
                            </div>
                            <p id='dashboard-card-checkgift-btn' className={(item.project_status === 100)? 'dashboard-card-btn enabled':'dashboard-card-btn'}>확인하기</p>
                        </div>
                    </>
                )
            }
        </div>
    )
}
