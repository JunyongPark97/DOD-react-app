import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useHistory, withRouter} from "react-router-dom"
import DodNavbar from '../common/DodNavbar';
import Footer from '../common/Footer'
import StartButtonBig from './StartButtonBig';
import SignModal from './Sign/SignModal'
import MainpageDescription from './MainpageDescription';
import Navigation from '../common/Navigation';

function Mainpage() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [justLogin, setJustLogin] = useState(true);
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
        window.location.assign('/');
    }
    function createProject(){
        history.push('/create');
    }
    function openModalAndCreate(){
        setJustLogin(false);
        setModalOpen(true);
    }
    return (
        <div>
            <DodNavbar isLoggedIn = {loggedIn} openModal = {openModal}/>
            <Navigation location={0} isLoggedIn={loggedIn} openModal={openModal}/>
            <StartButtonBig openModal={openModalAndCreate}/>
            <SignModal justLogin = {justLogin} isModalOpen = {isModalOpen} closeModalFunction = {closeModal} loginFunction={login} createProject = {createProject}/>
            <MainpageDescription/> 
            <Footer/>
        </div>
    )
}

export default withRouter(Mainpage)
