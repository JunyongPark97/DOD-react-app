import React,{useState, useEffect} from 'react'
import DodNavbar from '../common/DodNavbar';
import {useHistory} from 'react-router-dom'
import './DashboardPage.css'
import DashboardCard from './DashboardCard';
import Footer from '../common/Footer'
import Navigation from '../common/Navigation';

import baseUrl from '../../network/network';
import WantMoreResponseCard from '../common/WantMoreResponseCard'
import ReactPlayer from 'react-player'

export default function DashboardPage() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [itemList, setItemList] = useState([]);

    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') === null){
            history.push('/');
        }else{
            fetch(`${baseUrl}/api/v1/dashboard/`,{
                method:'GET',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                }
            }).then(res => {
                if(res.ok){
                    return res.json()
                }else if(res.status === 401){
                    window.location.assign('/');
                }else{
                    console.log(res);
                }
            }).then(res => {
                if(res !==undefined){
                    setItemList(res);
                    console.log(res);
                }else{
                    sessionStorage.removeItem('DODtoken');
                    history.push('/');
                }
            })
        }
        //hide btn on click app div
        window.addEventListener("click",hideDeleteBtn);
        //scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        
        return () => {
            window.removeEventListener("click", hideDeleteBtn);
        
        }
    }, [])
    function hideDeleteBtn(){
        const deleteElements = document.getElementsByClassName('dashboard-card-delete-btn')
        for (let item of deleteElements) {
            item.classList.add('none');
        }
    }
    function openMypage(){
        history.push('/mypage');
    }
    function onClickCreateBtn(){
        history.push('/create');
    }
    function removeItem(array, index){
        const newArray = array.filter((x, idx, array) => idx !== index);
        return newArray;
    }
    function deleteProject(index){
        let newArray = removeItem(itemList, index);
        setItemList(newArray);
        window.location.reload();
    }
    function getActiveProjectsNum(list){
        var num = 0;
        list.map(item => {
            if(item.project_status === 100){
                num += 1;
            }
        })
        return num;
    }
    function getDashboardCards(items){
        if(items.length > 1){
            var list = items.slice(1, undefined);
            console.log(items);
            console.log(list);
            var latterList = list.map((item, index) => <DashboardCard key = {index} item={item} index={index} deleteProject={deleteProject}/>);
            return (<>
                <DashboardCard item={items[0]} deleteProject={deleteProject}/>
                <WantMoreResponseCard/>
                {
                    latterList
                }
            </>)
        }else if(items.length === 1){
            return (<>
                <DashboardCard item={items[0]} deleteProject={deleteProject}/>
                <WantMoreResponseCard/>
            </>)
        }else{
            return (<>
                <div className='wrapper'>
                    <ReactPlayer
                    className='player'
                    controls={true}
                    url='https://www.youtube.com/watch?v=8yshMJGcQ7M'
                    width='100%'
                    height='100%'/>
            
                </div>
            </>)
        }
    }
    function getTextComponent(itemList){
        const activeProjectNum = getActiveProjectsNum(itemList);
        if(activeProjectNum === 0){
            return (
                <p className='dashboard-text'>
                    {sessionStorage.getItem('userName')}님은<br/>
                    추첨 중인<br/>
                    설문이 없어요!
                </p>
            )
        }else{
            return (
                <p className='dashboard-text'>
                    {sessionStorage.getItem('userName')}님은<br/>
                    <span className='dashboard-highlight-text'>
                        {getActiveProjectsNum(itemList)}개 
                    </span> 설문을<br/>
                    실시간 추첨 중이에요!
                </p>
            )
        }
    }
    return (
        <>
            <div className='dashboard-container' onClick={hideDeleteBtn}>
                <DodNavbar isLoggedIn={isLoggedIn} openModal={openMypage}/>
                <Navigation location={1} isLoggedIn={isLoggedIn} openModal={openMypage}/>
                {
                    getTextComponent(itemList)
                }
                <div className='contour'/>
                {
                    getDashboardCards(itemList)
                }
                <p className='floating-big-btn' onClick={onClickCreateBtn}>실시간 추첨 링크 만들기</p>
                <Footer/>
            </div>
            
        </>
        
    )
}
