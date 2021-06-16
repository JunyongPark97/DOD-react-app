import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import DodNavbar from './DodNavbar';
import DescriptionCard from './DescriptionCard';
import Footer from './Footer'
import StartButtonBig from './StartButtonBig';
import SignModal from './SignModal'
import MainpageDescription from './MainpageDescription';

function Mainpage() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [justLogin, setJustLogin] = useState(true);
    
    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') !== null){
            history.push('/dashboard');
        }
    }, [])

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
        history.push('/dashboard');
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
            <div className='contour'/>
            <StartButtonBig openModal={openModalAndCreate}/>
            <SignModal justLogin = {justLogin} isModalOpen = {isModalOpen} closeModalFunction = {closeModal} loginFunction={login} createProject = {createProject}/>
            <MainpageDescription/> 
            <Footer/>
        </div>
    )
}

export default Mainpage
