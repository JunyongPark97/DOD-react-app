import React,{useState, useEffect} from 'react'
import DodNavbar from './DodNavbar';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import './DashboardPage.css'
import DashboardCard from './DashboardCard';

export default function DashboardPage() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [itemList, setItemList] = useState([]);

    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') === null){
            history.push('/');
        }
        fetch('http://3.36.156.224:8000/api/v1/dashboard/',{
            method:'GET',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.ok){
                return res.json()
            }else{
                console.log(res);
            }
        }).then(res => {
            setItemList(res);
            console.log(res);
        })
    }, [])
    function openMypage(){
        history.push('/mypage');
    }
    function onClickCreateBtn(){
        history.push('/create');
    }
    function deleteProject(index){
        let newArray = itemList;
        newArray.splice(index,1);
        setItemList(newArray);
    }
    return (
        <div>
            <DodNavbar isLoggedIn={isLoggedIn} openModal={openMypage}/>
            <div className='contour'/>
            <p className='dashboard-text'>
                {sessionStorage.getItem('userName')}님은<br/>
                <span className='dashboard-highlight-text'>
                    {itemList.length}개 
                </span>
                설문을 디오디로<br/>
                기프티콘 <span className='dashboard-highlight-text'>즉시</span> 지급 중이에요.
            </p>
            <p className='dashboard-small-text'>
                나의 프로젝트를 확인해보세요.
            </p>
            <div className='contour-12height'/>
            <div className='dashboard-create-btn' onClick={onClickCreateBtn}>
                <p className='dashboard-create-btn-title'><img className='dashboard-icon' src={process.env.PUBLIC_URL + 'dod-icon.png'}/>프로젝트 만들기</p>
                <p className='dashboard-create-btn-subtitle'>새로운 프로젝트를 추가해보세요</p>
                <img className='dashboard-create-img' src={process.env.PUBLIC_URL + 'add-icon.png'}/>
            </div>
            {
                itemList.map((item, index) => <DashboardCard key = {index} item={item} index={index} deleteProject={deleteProject}/>)
            }
        </div>
    )
}
