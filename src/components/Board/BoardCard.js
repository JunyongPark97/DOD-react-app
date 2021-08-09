import React from 'react'
import { useHistory } from 'react-router-dom';
import './BoardCard.css'

function BoardCard(props) {
    var history = useHistory();
    const {item, id} = props;
    function getStatusTag(){
        switch(item.project_status){
            case 1:{
                return (<p className='board-card-status-tag available'>실시간 추첨 중</p>)
            }
            case -1:{
                return (<p className='board-card-status-tag notyet'>추첨 시작 전</p>)
            }
            case -2:{
                return (<p className='board-card-status-tag end'>추첨 종료</p>)
            }
            case 0:{
                return (<p className='board-card-status-tag notdod'>일반 설문</p>)
            }
        }
    }
    var component = getStatusTag();
    function onClickItem(){
        const currentPage = window.sessionStorage.getItem('boardCurrentPageNum');
        setTimeout(function (){
            window.sessionStorage.setItem('boardCurrentPageNum', currentPage);
        }, 100);
        history.push(`/post?postid=${item.id}`);
    }
    return (
        <>
            <div className='board-card-container' id={id} onClick={onClickItem}>
                <div className='board-card-text-container'>
                    <p className='board-card-title'>{item.title}</p>
                    <p className='board-card-info-text'><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/period-icon.png'}/>{
                        (item.period === null)?'내용에서 확인':item.period
                    }</p>
                    <p className='board-card-info-text' style={{'marginTop':'0px'}}><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/gift-icon.png'}/>{
                        (item.reward_text === null)?'내용에서 확인':item.reward_text
                    }</p>
                </div>
                <div className='board-card-status-container'>
                    {
                        component
                    }
                    {
                        (item.is_dod)?(<p className='board-card-num'><img className='board-card-info-icon' src={process.env.PUBLIC_URL + '/person-icon.png'} alt=''/>{item.total_respondent}</p>) : (<></>)
                    }
                </div>
            </div>
        <div className='contour'/>
        </>
        
    )
}

export default BoardCard
