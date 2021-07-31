import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import DodNavbar from '../common/DodNavbar';
import Navigation from '../common/Navigation';
import './Board.css'
import SignModal from '../Mainpage/Sign/SignModal';
import BoardCard from './BoardCard';
import baseUrl from '../../network/network';
import PageNavigator from '../common/PageNavigator';

function Board() {
    var history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [justLogin, setJustLogin] = useState(true);
    const [postList, setPostList] = useState([]);
    const [totalPageNum, setTotalPageNum] = useState(1);
    const [pagenums, setPagenums] = useState([]);
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [min, setMin] = useState(1);
    useEffect(() => {
        if(window.sessionStorage.getItem('DODtoken') !== null){
            setLoggedIn(true);
        }
        fetch(`${baseUrl}/api/v1/board/`,{
            method:'GET',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'
            }
        }).then(res=>{
            return res.json();
        }).then(res=>{
            console.log(res);
            console.log(res.total_page);
            setTotalPageNum(res.total_page);
            if(res.next === null){
                setCurrentPageNum(res.total_page);
                makeList(res.total_page, res.total_page);
            }else{
                setCurrentPageNum(res.next - 1);
                makeList(res.next - 1, res.total_page);
            }
            var newList = res.results;
            setPostList([...newList]);
        })
    }, [])
    function onClickNavigator(page){
        fetch(`${baseUrl}/api/v1/board/?page=${page}`,{
            method:'GET',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'
            }
        }).then(res=>{
            return res.json();
        }).then(res=>{
            setTotalPageNum(res.total_page);
            if(res.next === null){
                setCurrentPageNum(res.total_page);
                makeList(res.total_page, res.total_page);
            }else{
                setCurrentPageNum(res.next - 1);
                makeList(res.next - 1, res.total_page);
            }
            console.log(res);
            var newList = res.results;
            setPostList([...newList]);
        })
    }
    function makeList(num, total){
        var min = parseInt(num/5) * 5 + 1;
        var max = min + 4;
        console.log(min, max);
        var list = [];
        if(total >= max){
            for(var j = 0; j <5; j++){
                list.push(min + j);
            }
        }else{
            for(var j = 0; j <total - min + 1; j++){
                list.push(j+1);
            }
        }
        console.log(list);
        setPagenums(list);
    }
    function onClickLeft(){
        if(min > 1){
            makeList(min - 5, totalPageNum);
            setMin(min - 5);
        }
    }
    function onClickRight(){
        if((min + 5) < totalPageNum){
            makeList(min + 5, totalPageNum);
            setMin(min + 5);
        }
    }
    
    function login(){
        window.location.reload();
    }
    function createProject(){
        history.push('/createpost');
    }
    function openModal(){
        setJustLogin(true);
        setModalOpen(true);
    }
    function closeModal(){
        setModalOpen(false);
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('confirmKey');
    }
    function openModalAndCreate(){
        setJustLogin(false);
        setModalOpen(true);
    }
    return (
        <div className='board-container'>
            <DodNavbar isLoggedIn={loggedIn} openModal={openModal}/>
            <Navigation location={2} isLoggedIn={loggedIn} openModal={openModal}/>
            <div className='board-text-container'>
                <p className='createproject-text board'>
                    디오디의<br/>누적 실시간 추첨 수
                </p>
                <p className='board-total-text'>5.3K</p>
            </div>
            <div className='contour'/>
            {
                postList.map((item, index) =>{
                    return <BoardCard key={index} item={item}/>
                })
            }
            <PageNavigator currentPageNum={currentPageNum} onClickRight={onClickRight} onClickLeft={onClickLeft} pagenums={pagenums} totalPageNum={totalPageNum} onClickNavigator={onClickNavigator}/>
            <SignModal justLogin = {justLogin} isModalOpen = {isModalOpen} closeModalFunction = {closeModal} loginFunction={login} createProject = {createProject}/>
            <p onClick={(loggedIn)?createProject:openModalAndCreate} className={(loggedIn)?'floating-big-btn':'floating-big-btn disabled'}>설문 올리기</p>
        
        </div>
    )
}

export default Board
