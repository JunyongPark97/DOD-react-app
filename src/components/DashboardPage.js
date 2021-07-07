import React,{useState, useEffect} from 'react'
import DodNavbar from './DodNavbar';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import './DashboardPage.css'
import DashboardCard from './DashboardCard';
import MainpageDescription from './MainpageDescription';
import Footer from './Footer'

import baseUrl from '../network/network';

export default function DashboardPage() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [itemList, setItemList] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

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
                    if(res.length === 0){
                        setShowInfo(true);
                    }
                }else{
                    sessionStorage.removeItem('DODtoken');
                    history.push('/');
                }
            })
        }
    }, [])
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
        if(newArray.length === 0){
            setShowInfo(true);
        }else{
            setShowInfo(false);
        }
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
    return (
        <div className='dashboard-container'>
            <DodNavbar isLoggedIn={isLoggedIn} openModal={openMypage}/>
            <div className='contour'/>
            <p className='dashboard-text'>
                {sessionStorage.getItem('userName')}님은<br/>
                <span className='dashboard-highlight-text'>
                    {getActiveProjectsNum(itemList)}개 
                </span>&nbsp;
                설문을 디오디로<br/>
                기프티콘 <span className='dashboard-highlight-text'>추첨 중</span>이에요!
            </p>
            <div className='dashboard-create-btn' onClick={onClickCreateBtn}>
                <div className='dashboard-create-btn-box'>
                    <p className='dashboard-create-btn-title'><img className='dashboard-icon' src={process.env.PUBLIC_URL + 'project-icon.png'}/>추첨 링크 만들기</p>
                    <p className='dashboard-create-btn-subtitle'>즉시 지급으로 응답률을 높여보세요</p>
                </div>
                <img className='dashboard-create-img' src={process.env.PUBLIC_URL + 'add-icon.png'}/>
            </div>
            
            {
                itemList.map((item, index) => <DashboardCard key = {index} item={item} index={index} deleteProject={deleteProject}/>)
            }
            {
                showInfo?<>
                    <div className='contour-12height'/>
                    <MainpageDescription/>
                </>:<></>
            }
            <Footer/>
        </div>
    )
}
