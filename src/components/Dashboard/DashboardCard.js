import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import './DashboardCard.css'
import StatusTag from './StatusTag';
import baseUrl from '../../network/network';
import Progress from 'react-progressbar'
import CheckLeftGiftModal from './CheckLeftGiftModal'

export default function DashboardCard(props) {
    const history = useHistory();
    const {item, index, deleteProject} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGiftListModalOpen, setIsGiftListModalOpen] = useState(false);
    const [giftItem, setGiftItem] = useState({
        'id':0,
        'type':1,
        'data':[]
    })
    // const products = item.products;
    function getProgressbarBackColor(){
        switch(item.project_status){
            case 999:
                return '#9696A3';
            case 400:
                return '#CFFFE7';
            case 300:
                return '#FFEFCF';
            case 200:
                return '#FFD6DA';
            case 100:
                return '#E2D6FF';
        }
    }
    function getProgressbarColor(){
        switch(item.project_status){
            case 999:
                return '#9696A3';
            case 400:
                return '#3AE68F';
            case 300:
                return '#FFEFCF';
            case 200:
                return '#FF4759';
            case 100:
                return '#7E47FF';
        }
    } 
    function getCardButtons(item){
        switch(item.project_status){
            case 999:
                return (<></>);
            case 400:
                return (
                    <>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-link.png'} alt=''/>
                            <div className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>추첨 링크</p>
                                <p className='dashboard-card-text-12'>연결을 아직 못했다면?</p>
                            </div>
                            <p id='dashboard-card-checklink-btn' className={'dashboard-card-btn test'} onClick={onClickCheckLink}>연결하기</p>
                        </div>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'} alt=''/>
                            <div  className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>기프티콘</p>
                                <p className='dashboard-card-text-12'>뭐가 얼마나 남은거지?</p>
                            </div>
                            <p id='dashboard-card-checkgift-btn' className={'dashboard-card-btn test'} onClick={openGift}>확인하기</p>
                        </div>
                    </>                    
                );
            case 200:
                return (
                    <>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-link.png'} alt=''/>
                            <div className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>추첨 링크</p>
                                <p className='dashboard-card-text-12'>연결을 아직 못했다면?</p>
                            </div>
                            <p id='dashboard-card-checklink-btn' className={'dashboard-card-btn disabled'} onClick={onClickCheckLink}>연결하기</p>
                        </div>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'} alt=''/>
                            <div  className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>기프티콘</p>
                                <p className='dashboard-card-text-12' style={{color:'#FF4759'}}>추가해야 추첨이 활성화돼요!</p>
                            </div>
                            <p id='dashboard-card-checkgift-btn' className={'dashboard-card-btn disabled'} onClick={addGift}>추가하기</p>
                        </div>
                    </>                    
                );
            case 300:
                return (
                    <>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-link.png'} alt=''/>
                            <div className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>추첨 링크</p>
                                <p className='dashboard-card-text-12'>연결을 아직 못했다면?</p>
                            </div>
                            <p id='dashboard-card-checklink-btn' className={'dashboard-card-btn'} onClick={onClickCheckLink}>연결하기</p>
                        </div>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'} alt=''/>
                            <div  className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>기프티콘</p>
                                <p className='dashboard-card-text-12'>뭐가 얼마나 남은거지?</p>
                            </div>
                            <p id='dashboard-card-checkgift-btn' className={'dashboard-card-btn'} onClick={openGift}>확인하기</p>
                        </div>
                    </>                    
                );
            case 100:
                return (
                    <>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/icon-link.png'} alt=''/>
                            <div className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>추첨 링크</p>
                                <p className='dashboard-card-text-12'>연결을 아직 못했다면?</p>
                            </div>
                            <p id='dashboard-card-checklink-btn' className={'dashboard-card-btn enabled'} onClick={onClickCheckLink}>연결하기</p>
                        </div>
                        <div className='dashboard-card-btn-box'>
                            <img className='dashboard-card-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'} alt=''/>
                            <div  className='dashboard-card-more-text-box'>
                                <p className='dashboard-card-text-16'>기프티콘</p>
                                <p className='dashboard-card-text-12'>뭐가 얼마나 남은거지?</p>
                            </div>
                            <p id='dashboard-card-checkgift-btn' className={'dashboard-card-btn enabled'} onClick={openGift}>확인하기</p>
                        </div>
                    </>                    
                );
        }
    }
    function openGift(){
        fetch(`${baseUrl}/api/v1/dashboard/${item.id}/gifticons/`,{
            method:'GET',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : `Token ${window.sessionStorage.getItem('DODtoken')}`
            }
        }).then(res => res.json())
        .then(function(res){
            setGiftItem(res);
            setIsGiftListModalOpen(true);
        })
    }
    function addGift(){
        window.sessionStorage.setItem('AddGiftProjectId', item.id);
        history.push('/addgift');
    }
    function closeGift(){
        setIsGiftListModalOpen(false);
    }
    useEffect(() => {
        document.getElementsByClassName(`progressbar-container-${item.id}`)[0].style.background = getProgressbarBackColor()
    }, [])
    function deleteItem(e){
        e.stopPropagation();
        fetch(`${baseUrl}/api/v1/project/${item.id}/`,{
            method:'DELETE',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.status >= 200 && res.status < 400){
                deleteProject(index);
                setIsModalOpen(false);
            }else if(res.status === 401){
                window.location.assign('/');
            }else if(res.status === 403){
                setIsModalOpen(false);
                window.alert(`추첨이 진행되어 삭제하실수 없어요!
시험해보신 경우라면 문의하기를 이용해주세요!`);
            }
        })
    }
    function onClickCheckLink(){
        sessionStorage.setItem('getLinkProjectId', item.id);
        history.push('/projectlink');
    }
    function openModal(){
        setIsModalOpen(true);
    }
    function closeModal(){
        setIsModalOpen(false);
    }
    function keepModalOpen(e){
        e.stopPropagation();
    }
    function onClickMore(e){
        setTimeout(function(){
            document.getElementById(`dashboard-card-delete-btn-${item.id}`).classList.remove("none");
    
        },100);
    }
    return (
        <div className='dashboard-card-container'>
            <p id={`dashboard-card-delete-btn-${item.id}`} className={`dashboard-card-delete-btn none`} onClick={openModal}>삭제</p>
            <div className='dashboard-card-title-box'>
                <div className='dashboard-card-title-innerbox'>
                    <p className='dashboard-card-title'>
                        {item.name}
                    </p>
                    <StatusTag status={item.project_status}/>
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
                getCardButtons(item)
            }
            {
                isModalOpen?(
                    <div className={'modal'} onClick={closeModal}>
                        <div className='modal-container' onClick={keepModalOpen}>
                        <img src={process.env.PUBLIC_URL + 'close-icon.png'} className='modal-close-btn' onClick={closeModal}/>
                            <p className='delete-post-title'>삭제하시겠어요?</p>
                            <p className='delete-post-subtitle'>응모자가 있는 링크는 삭제가 불가능해요.<br/>문의하기를 통해 문의해주세요!</p>
                            <p className='post-delete-post-btn' onClick={deleteItem}>삭제하기</p>
                        </div>
                    </div>
                ):<></> 
            }
            {
                isGiftListModalOpen?<CheckLeftGiftModal closeModal={closeGift} res={giftItem}/>:<></>
            }
        </div>
    )
}
