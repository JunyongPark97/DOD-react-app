import React from 'react'
import {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import DodNavbar from './DodNavbar';
import DescriptionCard from './DescriptionCard';
import Footer from './Footer'
import StartButtonBig from './StartButtonBig';
import SignModal from './SignModal'

function Mainpage() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('DODtoken'));
    const [isModalOpen, setModalOpen] = useState(false);
    
    function openModal(){
        setModalOpen(true);
    }
    function closeModal(){
        setModalOpen(false);
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('confirmKey');
    }
    function login(){
        setLoggedIn(true);
    }
    function createProject(){
        history.push('/create');
    }
    return (
        <div>
            <DodNavbar isLoggedIn = {loggedIn} openModal = {openModal}/>
            <div className='contour'/>
            <StartButtonBig isLoggedIn={loggedIn} onClick={loggedIn? createProject : openModal}/>
            <SignModal isModalOpen = {isModalOpen} closeModalFunction = {closeModal} loginFunction={login}/>
            <DescriptionCard icon = {process.env.PUBLIC_URL + 'favicon.ico'} mainTitle = 'title' subTitle = 'subtitle' content='content'/>
            <DescriptionCard icon = {process.env.PUBLIC_URL + 'favicon.ico'} mainTitle = 'title' subTitle = 'subtitle' content='content'/>
            <Footer/>
        </div>
    )
}

export default Mainpage
