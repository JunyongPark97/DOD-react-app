import React,{useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router'
import baseUrl from '../../network/network';
import LogoBar from '../common/LogoBar'
import Navbar from '../common/Navbar'

export default function Post() {
    const history = useHistory();
    // const navbar = useRef(null);
    const [navText, setNavText] = useState(4);
    useEffect(() => {
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
        })
        return () => {
            window.sessionStorage.removeItem('retrievePostId');
        }
    }, [])
    function onClickBack(){
        sessionStorage.removeItem('retrievePostId');
        history.goBack();
    }
    return (
        <div>
            <LogoBar/>
            <Navbar pageNum={navText} onClickBack={onClickBack}/>
            
        </div>
    )
}
