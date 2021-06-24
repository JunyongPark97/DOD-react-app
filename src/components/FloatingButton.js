import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import './FloatingButton.css'
import {kakaoLink} from '../network/network'

function FloatingButton() {
    const history = useHistory();
    function onClickFb(){
        window.location.assign(kakaoLink)
    }
    return (
        <div className='fb-container' onClick={onClickFb}>
            <div className='fb-text'>
                궁금한게 있으신가요?
            </div>
            <img className='fb-icon' src={process.env.PUBLIC_URL + 'fb-icon.png'}/>
        </div>
    )
}

export default FloatingButton
