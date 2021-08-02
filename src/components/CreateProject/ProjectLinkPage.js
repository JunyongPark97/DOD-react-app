import { isTemplateElement } from '@babel/types';
import React,{useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from '../common/Navbar'
import './ProjectLinkPage.css'
import baseUrl from '../../network/network';
import LogoBar from '../common/LogoBar';
import WantMoreResponseCard from '../common/WantMoreResponseCard';

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
                setLinkItem(res);
                setContent(`기프티콘 추첨 결과는 디오디에서!
아래 링크에서 당첨 여부를 즉시 확인해보세요!
${res.url}`)
            })
        }
    }, [])
    function onClickGoHome(){
        sessionStorage.removeItem('getLinkProjectId');
        history.push('/dashboard');
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
            <LogoBar/>
            <Navbar pageNum={2} onClickBack={onClickBack}/>
            <p className='createproject-text'>
                추첨링크가 만들어졌어요<br/>단 30초면 내 설문에 연결!
            </p>
            <div className='contour'/>
            <div className='project-link-title-box'>
                <img src={process.env.PUBLIC_URL + './link-page-img.png'} alt='' className='project-link-img'/>
                <div className='project-link-innercontainer'>
                    <p className='project-link-title'>링크 연결</p>
                    <p className='project-link-subtitle'>dod - Google Forms</p>
                </div>
            </div>
            <div className='project-link-box' >
                <p className='project-link-big-text'>만든 추첨 링크를 복사하세요</p>
                <p className='project-link-small-text'>복사된 추첨 링크는 구글 설문지에 붙여넣을 거에요.</p>
                <p className='project-link-copy-btn' onClick={copyText}><img src={process.env.PUBLIC_URL + '/icon-copy.png'} alt='' className='project-link-copy-img'/>링크 복사하기</p>
                <img src={process.env.PUBLIC_URL + '/link-dod.png'} alt='' className='project-link-dod-img'/>
                <img src={process.env.PUBLIC_URL + '/link-link.png'} alt='' className='project-link-link-img'/>
            </div>
            <div className='project-link-manual-box'>
                <img src={process.env.PUBLIC_URL + '/link-google.png'} alt='' className='project-link-google-img'/>
                <p className='project-link-big-text'>꼭 아래와 같이 설문지에 붙여 넣으세요</p>
                <p className='project-link-small-text'>아래 3steps를 따라하시면 링크 연결 끝!</p>
                <img src={process.env.PUBLIC_URL + '/manual-pc.png'} alt='' className='project-link-manual-img-pc'/>
                <img src={process.env.PUBLIC_URL + '/manual-mobile.png'} alt='' className='project-link-manual-img-mobile'/>
            </div>
            <div className='contour-16margin-both'/>
            <WantMoreResponseCard/>
            <p id='project-link-gohome' className='btn-bottom-big' onClick={onClickGoHome}>내 추첨으로 돌아가기</p>
        </div>
    )
}

export default ProjectLinkPage
