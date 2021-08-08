import React,{useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import baseUrl from '../../network/network';

import LogoBar from '../common/LogoBar'
import './CreatePost.css'

function CreatePost() {
    const history = useHistory();
    const [readyToSend, setReadyToSend] = useState(false);
    const title = useRef(null);
    const content = useRef(null);
    useEffect(() => {
        return () => {
            window.sessionStorage.removeItem('form_link');
            window.sessionStorage.removeItem('createProjectId');
        }
    }, [])
    function onClickBack(){
        history.goBack();
    }
    function onChangeText(){
        if((title.current.value !== '')&&(content.current.value !== '')){
            setReadyToSend(true);
        }else{
            setReadyToSend(false);
        }
    }
    function onClickSend(){
        fetch(`${baseUrl}/api/v1/board/`,{
            method:'POST',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : `Token ${window.sessionStorage.getItem('DODtoken')}`
            },
            body: JSON.stringify({
                form_link : window.sessionStorage.getItem('form_link'),
                project : parseInt(window.sessionStorage.getItem('createProjectId')),
                title : title.current.value,
                content : content.current.value
            })
        }).then(res => {
            if((res.status >= 200) && (res.status < 400)){
                history.push('/board');
            }
        })
    }
    return (
        <div>
            <LogoBar/>
            <nav className="navbar">
                <div className="navbar-container">
                    <img className="navbar-logo-icon" src={process.env.PUBLIC_URL + '/arrow-goback.png'} onClick={onClickBack}/>
                    <div className='title'>
                        설문 올리기
                    </div>
                </div>
                <p className={readyToSend?'create-content-submit-btn':'create-content-submit-btn disabled'} onClick={readyToSend?onClickSend:null}>완료</p>
            </nav>
            <div className='contour'/>
            <input ref={title} className='create-content-title-input' placeholder='제목' onChange={onChangeText}/>
            <div className='contour-16margin-both'/>
            <textarea ref={content} id='create-content-input' className='create-content-title-input' onChange={onChangeText} cols="40" rows="30" placeholder='내용에 설문 기간과 추첨할 기프티콘을 포함하면 더 많은 응답을 받아보실 수 있어요!.' style={{fontSize : '12px', fontFamily : 'noto-regular', marginTop : '0px'}}></textarea>

        </div>
    )
}

export default CreatePost
