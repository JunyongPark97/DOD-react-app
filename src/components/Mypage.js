import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import MypageBtn from './MypageBtn';
import './Mypage.css'

import baseUrl from '../network/network';

export default function Mypage() {
    const history = useHistory();
    const [items, setItems] = useState([
        {
            imgsrc:`${process.env.PUBLIC_URL + 'mypage-icon-1.png'}`,
            link:'',
            text:'자주 묻는 질문'
        },
        {
            imgsrc:`${process.env.PUBLIC_URL + 'mypage-icon-2.png'}`,
            link:'http://pf.kakao.com/_nfxcTs',
            text:'문의 상담하기'
        },
        {
            imgsrc:`${process.env.PUBLIC_URL + 'mypage-icon-3.png'}`,
            link:'',
            text:'건의하기'
        },
        {
            imgsrc:`${process.env.PUBLIC_URL + 'mypage-icon-4.png'}`,
            link:'',
            text:'공지사항'
        },
    ])
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
                items.map(item => 
                    <MypageBtn imgsrc={item.imgsrc} link={item.link} text = {item.text}/>
                )
            }
            <div className='mypage-logout-container' onClick={logout}>
                <p className='mypage-logout-text'>로그아웃</p>
            </div>
        </div>
    )
}
