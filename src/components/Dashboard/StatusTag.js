import React from 'react'
import './StatusTag.css'

export default function StatusTag(props) {
    const {status} = props;

    let component = null;
    switch(status){
        case 100:
            component = (<p className='dashboard-card-status onprocess'>추첨 중</p>)
            break;
        case 200:
            component = (<p className='dashboard-card-status checking'>활성화 전</p>)
            break;
        case 300:
            component = (<p className='dashboard-card-status hold'>시작 전</p>)
            break;
        case 400:
            component = (<p className='dashboard-card-status test'>테스트</p>)
            break;
        case 999:
            component = (<p className='dashboard-card-status complete'>종료</p>)
            break;
        default :
            component = (<p className='dashboard-card-status onprocess'>추첨 중</p>)
            break;
    }
    return(
        <>
            {component}
        </>
    )
}

