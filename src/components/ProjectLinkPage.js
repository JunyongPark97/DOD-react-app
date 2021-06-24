import { isTemplateElement } from '@babel/types';
import React,{useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar'
import './ProjectLinkPage.css'
import baseUrl from '../network/network';

function ProjectLinkPage() {
    const projectId = sessionStorage.getItem('getLinkProjectId');
    const history = useHistory();
    const [content, setContent] = useState('');
    const [linkItem, setLinkItem] = useState({
        url:'',
        image_url:''
    })
    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') === null){
            history.push('/');
        }else{
            fetch(`${baseUrl}/api/v1/project/${projectId}/link_notice/`,{
                method:'GET',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                }
            }).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    console.log(res);
                }
            }).then(res => {
                console.log(res);
                setLinkItem(res);
                setContent(`기프티콘 추첨 결과는 디오디에서!
아래 링크에서 당첨 여부를 즉시 확인해보세요!
${res.url}`)
            })
        }
    }, [])
    function onClickGoHome(){
        sessionStorage.removeItem('getLinkProjectId');
        history.push('/');
    }
    function copyText(){
        var tempElem = document.createElement('textarea');
        tempElem.value = content;
        document.body.appendChild(tempElem);
        tempElem.select();
        tempElem.addEventListener('keydown', function(e){
            e.preventDefault();
        })
        document.execCommand("copy");
        document.body.removeChild(tempElem);
        window.alert("복사되었습니다.");
    }
    function onClickBack(){
        sessionStorage.removeItem('getLinkProjectId');
        history.push('/dashboard');
    }
    return (
        <div>
            <Navbar pageNum={2} onClickBack={onClickBack}/>
            <div className='project-link-container'>
                <p className='project-link-title'><span className='project-link-title-strong'>추첨 링크</span>를 첨부해 주세요!</p>
                <p className='project-link-subtitle'>응답자가 추첨 링크에서 당첨 여부를 그 즉시 확인할 수 있도록!</p>
                <p className='project-link-content'>
                    {content}
                </p>
                <button className='project-link-copy-btn' onClick={copyText}>복사하기</button>
                <p className='project-link-small'>위 문구를 아래와 같이 첨부해주세요</p>
                <img className='project-link-img-pc' src={linkItem.pc_url}/>
                <img className='project-link-img-mobile' src={linkItem.mobile_url}/>
                <button className='project-link-gohome' onClick={onClickGoHome}>확인</button>
            </div>
        </div>
    )
}

export default ProjectLinkPage
