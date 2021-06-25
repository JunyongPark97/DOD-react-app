import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import MypageBtn from './MypageBtn';
import './Mypage.css'

import baseUrl,{kakaoLink} from '../network/network';

export default function Mypage() {
    const history = useHistory();
    const [items, setItems] = useState([
        {
            icon_src:`${process.env.PUBLIC_URL + 'mypage-icon-1.png'}`,
            link:'',
            title:'자주 묻는 질문'
        },
        {
            imgicon_srcsrc:`${process.env.PUBLIC_URL + 'mypage-icon-2.png'}`,
            link:kakaoLink,
            title:'문의 상담하기'
        },
        {
            icon_src:`${process.env.PUBLIC_URL + 'mypage-icon-3.png'}`,
            link:'',
            title:'건의하기'
        },
        {
            icon_src:`${process.env.PUBLIC_URL + 'mypage-icon-4.png'}`,
            link:'',
            title:'공지사항'
        },
    ])
    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') === null){
            history.push('/');
        }else{
            fetch('http://3.36.156.224:8000/api/v1/third-party-menus/',{
                method:'GET',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                }
            }).then((res)=>{
                return res.json();
            }).then((res)=>{
                setItems(res);
            })
        }
    },[])
    
    function onClickBack(){
        history.goBack();
    }
    function logout(){
        fetch(`${baseUrl}/accounts/v1/logout/`,{
            method:'POST',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.ok){
                sessionStorage.clear();
                history.push('/');
            }else{
                window.alert('잠시 뒤에 다시 시도해 주세요')
            }
        })

    }
    return (
        <div>
            <Navbar pageNum={3} onClickBack={onClickBack}/>
            {
                items.map((item,index) => 
                    <MypageBtn key = {index} imgsrc={item.icon_src} link={item.link} text = {item.title}/>
                )
            }
            <div className='mypage-logout-container' onClick={logout}>
                <p className='mypage-logout-text'>로그아웃</p>
            </div>
        </div>
    )
}
