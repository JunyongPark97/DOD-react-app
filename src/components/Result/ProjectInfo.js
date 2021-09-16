import React, { useEffect, useState } from 'react'
import './ProjectInfo.css'
import {dodLotteryItems} from '../../network/network';

export default function ProjectInfo(props) {
    const {projectInfoObj} = props;
    console.log(projectInfoObj)
    function onClickMore(){
        const a = document.createElement('a');
        a.setAttribute('href', dodLotteryItems);
        a.setAttribute('target', '_blank');
        a.click();
    }
    return (
        <>
        {
            (projectInfoObj === null)?<></>:<>
                <div className=''>
                    <div className='project-info-container'>
                        <div className='project-info-card'>
                            <p className='project-info-card-title'>
                                누적 응모자
                            </p>
                            <p className='project-info-card-content'>
                                {projectInfoObj.total_respondents_count}
                            </p>
                        </div>
                        <div className='project-info-card' style={{marginLeft:'8px', marginRight:'8px'}}>
                            <p className='project-info-card-title'>
                                남은 상품 개수
                            </p>
                            <p className='project-info-card-content'>
                                {projectInfoObj.left_count}
                            </p>
                        </div>
                        <div className='project-info-card'>
                            <p className='project-info-card-title'>
                                추첨 종료일
                            </p>
                            <p className='project-info-card-content'>
                                {projectInfoObj.due_date}
                            </p>
                        </div>
                    </div>
                    <div className='project-info-left-gift project-info-card' style={{marginTop:'16px', marginBottom:'16px'}}>
                        <p style={{color:'#020203', fontFamily:'noto-medium', fontSize:'18px', margin:'0px', width:'fill', textAlign:'start', marginBottom:'4px'}}>남은 상품 개수</p>
                        {
                            projectInfoObj.product_info.map((item, index) => {
                                return <ItemCard item={item} key={index}/>
                            })
                        }
                    </div>
                    {
                        (projectInfoObj.left_count !== '0개')?<></>:(
                            <div className='project-info-nomore-gift project-info-card'>
                                <p style={{color:'#020203', fontFamily:'noto-medium', fontSize:'18px', margin:'0px', width:'fill', textAlign:'start'}}>상품이 다 떨어졌는데 어떡하죠?</p>
                                <p style={{color:'#6C7681', fontFamily:'noto-medium', fontSize:'12px', margin:'0px', marginTop:'12px', marginBottom:'18px', width:'fill', textAlign:'start'}}>괜찮아요. 디오디에서 추첨이 끝날때까지 자체적으로
상품을 채워놓고 있어요.</p>
                                <p onClick={onClickMore} style={{padding:'8px', width:'fill', backgroundColor:'#7C44F9', borderRadius:'8px',color:'#fff', fontFamily:'noto-medium', fontSize:'14px', textAlign:'center', cursor:'pointer'}}>자세히 볼래요</p>
                            </div>
                        )
                    }
                    
                    <div className='project-info-winners project-info-card' style={{marginTop:'16px'}}>
                        <p style={{color:'#020203', fontFamily:'noto-medium', fontSize:'18px', margin:'0px', width:'fill', textAlign:'start', marginBottom:'4px'}}>당첨을 축하합니다!</p>
                    
                    {
                        (projectInfoObj.winner_list.length === 0)?(
                            <p style={{color:'#6C7681', fontFamily:'noto-medium', fontSize:'12px', margin:'0px', marginTop:'12px', marginBottom:'18px', width:'fill', textAlign:'start'}}>응모하시고 첫 당첨자가 되어보세요!</p>
                        ):(
                            projectInfoObj.winner_list.map((item, index) => {
                                return <Winner item={item} key={index}/>
                            })
                        )
                    }
                    </div>
                </div>
            </>
        }
        </>
    )
}

function ItemCard(props){
    const {item} = props;
    return(
        <div className='project-info-item-container'>
            <img src={item.thumbnail} alt='' style={{width:'54px', height:'54px', margin:'0px', marginRight:'16px'}}/>
            <div style={{display:'flex', flexDirection:'column', alignItems:'start', justifyContent:'start', flexGrow:'1'}}>
                <p style={{fontFamily:'noto-medium', fontSize:'10px', color:'#B9B9B9', margin:'0px'}}>
                    {item.brand}
                </p>
                <p style={{fontFamily:'noto-medium', fontSize:'14px', color:'#020203', margin:'0px'}}>
                    {item.name}
                </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'end', justifyContent:'start'}}>
                <p style={{fontFamily:'noto-medium', fontSize:'10px', color:'#B9B9B9', margin:'0px', textAlign:'end'}}>
                    {item.total_count}개 중
                </p>
                <p style={{fontFamily:'noto-medium', fontSize:'14px', color:'#020203', margin:'0px', textAlign:'end'}}>
                    {item.left_count}개 남음
                </p>
            </div>
        </div>
    )
}
function Winner(props){
    const {item} = props;
    return(
        <div className='project-info-winner-container'>
            <p className='project-info-winner-name' style={{fontFamily:'noto-medium', fontSize:'12px', textAlign:'start', color:'#020203', margin:'0px', marginRight:'16px'}}>
                {item.phone}
            </p>
            <p className='project-info-winner-item'  style={{fontFamily:'noto-medium', fontSize:'12px', textAlign:'start', color:'#020203', margin:'0px', marginRight:'16px', flexGrow:'1'}}>
                {item.name}
            </p>
            <p className='project-info-winner-date' style={{fontFamily:'noto-medium', fontSize:'12px', textAlign:'end', color:'#B1B1B1', margin:'0px'}}>
                {item.time}
            </p>
        </div>
    )
}
