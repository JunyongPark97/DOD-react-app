import React,{useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router'
import baseUrl from '../../network/network';
import LogoBar from '../common/LogoBar'
import Navbar from '../common/Navbar'
import './Post.css'

export default function Post() {
    const history = useHistory();
    // const navbar = useRef(null);
    const [navText, setNavText] = useState(4);
    const [item, setItem] = useState({
        id: 0,
        is_dod: false,
        form_link:'https://d-o-d.io',
        is_owner:false,
        content:'ㅎㅇㅎㅎㅇㅎㅇㅎ',
        period: null,
        project_status: 0,
        reward_text: null,
        title: "안냐세요~",
        total_respondent: null
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    function getStatusTag(){
        switch(item.project_status){
            case 1:{
                return (<p className='board-card-status-tag available'>실시간 추첨 중</p>)
            }
            case -1:{
                return (<p className='board-card-status-tag notyet'>추첨 시작 전</p>)
            }
            case -2:{
                return (<p className='board-card-status-tag end'>추첨 종료</p>)
            }
            case 0:{
                return (<p className='board-card-status-tag notdod'>일반 설문</p>)
            }
        }
    }
    var component = getStatusTag();
    useEffect(() => {
        if(window.sessionStorage.getItem('DODtoken') === null){
            fetch(`${baseUrl}/api/v1/board/${window.sessionStorage.getItem('retrievePostId')}/`,{
                method:'GET',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8'
                
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
                setItem(res);
            })
        }else{
            fetch(`${baseUrl}/api/v1/board/${window.sessionStorage.getItem('retrievePostId')}/`,{
                method:'GET',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : `Token ${window.sessionStorage.getItem('DODtoken')}`
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
                setItem(res);
            })
        }
        
        return () => {
            window.sessionStorage.removeItem('retrievePostId');
        }
    }, [])
    function onClickBack(){
        sessionStorage.removeItem('retrievePostId');
        history.goBack();
    }
    function onClickGo(){
        const a = document.createElement('a');
        a.setAttribute('href', item.form_link);
        a.setAttribute('target', '_blank');
        a.click();
    }
    function keepModalOpen(event){
        event.stopPropagation();
    }
    function closeModal(){
        setIsModalOpen(false);
    }
    function openModal(){
        setIsModalOpen(true);
    }
    function deletePost(){
        fetch(`${baseUrl}/api/v1/board/${window.sessionStorage.getItem('retrievePostId')}/`,{
            method:'DELETE',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : `Token ${window.sessionStorage.getItem('DODtoken')}`
            }
        }).then(function(res){
            console.log(res);
            if(res.ok){
                history.push('/board');
            }else if(res.status === 401){
                window.alert('권한이 없습니다.');
            }
        })
    }
    function updatePost(){
        window.sessionStorage.setItem('updatePostId', item.id);
        history.push('/post/create/update');
    }
    return (
        <div>
            {
                isModalOpen?(
                    <div className={'modal'} onClick={closeModal}>
                        <div className='modal-container' onClick={keepModalOpen}>
                        <img src={process.env.PUBLIC_URL + 'close-icon.png'} className='modal-close-btn' onClick={closeModal}/>
                            <p className='post-title'>삭제하시겠어요?</p>
                            <p className='post-delete-post-btn' onClick={deletePost}>확인</p>
                        </div>
                    </div>
                ):<></> 
            }

            
            <LogoBar/>
            <Navbar pageNum={navText} onClickBack={onClickBack}/>
            <div className='post-info-box'>
                <div className='post-status-box'>
                    {
                        component
                    }
                    {
                        (item.is_dod)?(<p className='board-card-num'><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/person-icon.png'} alt=''/>{item.total_respondent}</p>) : (<></>)
                    }
                </div>
                <div className='post-info-box2'>
                    <img className='post-profile-img' alt='' src={process.env.PUBLIC_URL + '/profile-img.png'}/>
                    <div className='post-info-innerbox'>
                        <p className='board-card-info-text post'><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/period-icon.png'}/>{
                            (item.period === null)?'내용에서 확인':item.period
                        }</p>
                        <p className='board-card-info-text post'><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'}/>{
                            (item.reward_text === null)?'내용에서 확인':item.reward_text
                        }</p>
                    </div>
                    {
                        (item.is_owner)?<p className='post-btn' id='post-fix' onClick={updatePost}>수정</p> : <></>
                    }
                    {
                        (item.is_owner)?<p className='post-btn' id='post-delete' onClick={openModal}>삭제</p> : <></>
                    }
                </div>
            </div>
            <div className='contour-16margin-both'/>
            <p className='post-title'>{item.title}</p>
            <p className='post-content'>{item.content}</p>
            {
                (item.is_owner)?<></>:<p className='floating-big-btn' onClick={onClickGo}>설문하러 가기</p>
            }
        </div>
    )
}
