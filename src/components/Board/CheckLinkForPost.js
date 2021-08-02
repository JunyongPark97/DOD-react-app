import React,{useState, useRef} from 'react'
import { useHistory } from 'react-router'
import LogoBar from '../common/LogoBar'
import Navbar from '../common/Navbar'
import './CheckLinkForPost.css'
import {DisappearedLoading} from 'react-loadingg'
import baseUrl from '../../network/network'

export default function CheckLinkForPost() {
    const history = useHistory();
    const alarm = useRef(null);
    const linkinput = useRef(null);
    const [onLoad, setOnLoad] = useState(false);
    const [isDod, setIsDod] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [projectId, setProjectId] = useState(null);
    function onClickBack(){
        history.goBack();
    }
    function getComponent(onload, isAvailable){
        if(onload){
            return <DisappearedLoading color='#7E47FF' size='small' style={{width:'77px', height:'56px', position:'relative', marginLeft:'16px'}}/>
        }else{
            if(isAvailable){
                return <p className='create-post-next-btn' onClick={onClickNext}>다음</p>
            }else{
                return <p className='create-post-btn-hidden'>다음</p>
            }
        }
    }
    function onClickNext(){
        window.sessionStorage.setItem('form_link', linkinput.current.value);
        window.sessionStorage.setItem('createProjectId',projectId);
        history.push('/post/create/content');
    }
    function onHandleChange(e){
        if(e.target.value !== ''){
            setOnLoad(true);
            const link = e.target.value;
            fetch(`${baseUrl}/api/v1/board/check_dod/`,{
                method:'POST',
                headers:{
                        'accept' : 'application/json',
                        'content-type' : 'application/json;charset=UTF-8',
                        'Authorization' : `Token ${window.sessionStorage.getItem('DODtoken')}`
                },
                body:JSON.stringify({
                    form_link : link
                })
            }).then(res=> {return res.json()})
            .then(res =>{
                console.log(res);
                if(res.valid){
                    setIsAvailable(true);
                    setTimeout(function(){
                        setOnLoad(false);
                        if(res.is_dod){
                            alarm.current.innerHTML = '디오디가 있는 설문이네요! 다음을 눌러 진행해주세요.'
                            setProjectId(res.project);
                            setShowAlert(true);
                            setIsDod(true);
                        }else{
                            alarm.current.innerHTML = '디오디가 없는 설문이네요! 디오디를 붙여보시겠어요?'
                            
                            setShowAlert(true);
                            setIsDod(false);
                        }
                    }, 1000);
                }else{
                    setIsAvailable(false);
                    alarm.current.innerHTML = '유효하지 않은 링크에요!'
                    setShowAlert(true);
                    setIsAvailable(false);
                }
            })
        }else{
            setOnLoad(false);
            setShowAlert(false);
            setIsDod(true);
        }
    }
    function onClickStartDod(){
        history.push('/create');
    }
    return (
        <div>
            <LogoBar/>
            <Navbar pageNum={6} onClickBack={onClickBack}/>
            <p className='create-post-big-text'>구글 설문지 링크를<br/>입력해주세요!</p>
            <p ref={alarm} className={showAlert?'create-post-alert-msg':'create-post-alert-msg hidden'}>유효하지 않은 링크에요!</p>
            <div className='create-post-input-box'>
                <input ref={linkinput} className='create-post-link-input' type='text' placeholder='게시할 구글 설문 주소' onChange={onHandleChange}></input>
                {
                    getComponent(onLoad,isAvailable)
                }
            </div>
            {
                (isAvailable&&(!isDod))?
                    <div className='create-post-addDod-plz-container'>
                        <p className='create-post-text'>
                            설문지에 실시간 추첨 링크를 연결하고<br/>
                            더 많은 응답을 받아보세요!
                        </p>
                        <div className='want-more-response-innerbox'>
                            <p className='want-more-response-btn' onClick={onClickStartDod}>지금 시작해보기</p>
                            <img className='want-more-arrow' alt='' src={process.env.PUBLIC_URL + '/arrow-right-white.png'}/>
                        </div>
                        <img className='start-with-img' alt='' src={process.env.PUBLIC_URL + '/together.png'}/>
                    </div>
                :<></>
            }
        </div>
    )
}
