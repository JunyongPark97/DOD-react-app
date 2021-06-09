import React from 'react'
import {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import DodNavbar from './DodNavbar';
import DescriptionCard from './DescriptionCard';
import Footer from './Footer'
import StartButtonBig from './StartButtonBig';
import SignModal from './SignModal'

function Mainpage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    function openModal(){
        setModalOpen(true);
    }
    function closeModal(){
        setModalOpen(false);
    }
    return (
        <div>
            <DodNavbar isLoggedIn = {loggedIn} openModal = {openModal}/>
            <div className='contour'/>
            <StartButtonBig isLoggedIn={loggedIn}/>
            <SignModal isModalOpen = {isModalOpen} closeModalFunction = {closeModal}/>
            <DescriptionCard icon = {process.env.PUBLIC_URL + 'favicon.ico'} mainTitle = 'title' subTitle = 'subtitle' content='content'/>
            <DescriptionCard icon = {process.env.PUBLIC_URL + 'favicon.ico'} mainTitle = 'title' subTitle = 'subtitle' content='content'/>
            <Footer/>
        </div>
    )
}

export default Mainpage
