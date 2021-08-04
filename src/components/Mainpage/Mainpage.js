import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useHistory, withRouter} from "react-router-dom"
import DodNavbar from '../common/DodNavbar';
import Footer from '../common/Footer'
import StartButtonBig from './StartButtonBig';
import SignModal from './Sign/SignModal'
import Navigation from '../common/Navigation';

function Mainpage() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [justLogin, setJustLogin] = useState(true);
    const [showFB, setShowFB] = useState(false);
    useEffect(()=>{
        if(window.sessionStorage.getItem('DODtoken') !== null){
            setLoggedIn(true);
        }
    },[])
    function openModal(){
        setJustLogin(true);
        setModalOpen(true);
    }
    function closeModal(){
        setModalOpen(false);
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('confirmKey');
    }
    function login(){
        window.location.reload();
    }
    function createProject(){
        history.push('/create');
    }
    function openModalAndCreate(){
        if(window.sessionStorage.getItem('DODtoken') !== null){
            createProject();
        }else{
            setJustLogin(false);
            setModalOpen(true);
        }
    }
    return (
        <div className='main-container'>
            <DodNavbar isLoggedIn = {loggedIn} openModal = {openModal}/>
            <Navigation location={0} isLoggedIn={loggedIn} openModal={openModal}/>
            <StartButtonBig showFB={showFB} openModal={openModalAndCreate}/>
            <SignModal justLogin = {justLogin} isModalOpen = {isModalOpen} closeModalFunction = {closeModal} loginFunction={login} createProject = {createProject}/>
            <Footer/>
        </div>
    )
}

export default withRouter(Mainpage)
