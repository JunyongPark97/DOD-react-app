import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import './Navigation.css'
import Progress from 'react-progressbar'

function Navigation(props) {
    const history = useHistory();
    const {location, isLoggedIn, openModal} = props;
    const [scrollPercentage, setScrollPercentage] = useState(0);
    
    useEffect(() => {
        if(location === 0){
            window.addEventListener('scroll', listenToScroll);
            document.getElementsByClassName('progressbar-container')[0].style.background = '#EBEBF0'
        }
    }, [])
    function listenToScroll(){
        const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

        const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

        const scrolled = parseInt((winScroll / height)*100);
        setScrollPercentage(scrolled);
    }
    var component = (location === 0)?(<Progress color='#7E47FF' height='2px' completed={scrollPercentage}/>):(<div className='contour'/>)
    function onClickTab(e){
        const goal = e.target.getAttribute('index');
        console.log(goal);
        console.log(location);
        if(goal !== location){
            console.log('in');
            switch(goal){
                case '0':{
                    history.push('/');
                    break;
                }
                case '1':{
                    if(isLoggedIn){
                        history.push('/dashboard');
                    }else{
                        openModal();
                    }
                    break;
                }
                case '2':{
                    history.push('/board');
                    break;
                }
            }
        }else{
            console.log("????");
        }
    }
    return (
        <div className='navigation-container'>
            <div className='navigation-innercontainer'>
                <p id='navigation-title-home' className={
                    (location === 0)? ('navigation-title selected'):('navigation-title')
                }
                index={0}
                onClick={onClickTab}
                >홈</p>
                <p id='navigation-title-dashboard' className={
                    (location === 1)? ('navigation-title selected'):('navigation-title')
                }
                index={1}
                onClick={onClickTab}
                >내 추첨</p>
                <p id='navigation-title-board' className={
                    (location === 2)? ('navigation-title selected'):('navigation-title')
                }
                index={2}
                onClick={onClickTab}
                >설문 게시판</p>
            </div>
            <>
                {
                    component
                }
            </>
        </div>
    )
}

export default Navigation
