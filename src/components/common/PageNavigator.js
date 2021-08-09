import React,{useState, useEffect} from 'react'
import './PageNavigator.css'

export default function PageNavigator(props) {
    const {currentPageNum, totalPageNum,pagenums,onClickNavigator, onClickRight, onClickLeft} = props;
    function checkLeftImg(firstNum){
        if(firstNum === 1){
            return false;  
        }else{
            return true;
        }
    }
    function checkRightImg(lastNum){
        if(lastNum === totalPageNum){
            return false;  
        }else{
            return true;
        }
    }
    return (
        <div className='page-navi-container'>
            <img className='page-navi-arrow' 
            src={checkLeftImg(pagenums[0])? process.env.PUBLIC_URL + '/navi-arrow-left.png' : process.env.PUBLIC_URL + '/arrow-empty.png'} 
            alt="" 
            onClick={checkLeftImg(pagenums[0])? onClickLeft : null}/>
            <div className='page-navi-number-container'>
                {
                    pagenums.map((item,index) => {
                        return <p 
                            className={(item === currentPageNum)?'page-navi-number abled':'page-navi-number'}
                            onClick={(item === currentPageNum)?null:(()=>onClickNavigator(item))}//
                            key={index}
                        >{item}</p>
                    })
                }
            </div>
            <img className='page-navi-arrow' 
            src={checkRightImg(pagenums[pagenums.length - 1])? process.env.PUBLIC_URL + '/navi-arrow-right.png' : process.env.PUBLIC_URL + '/arrow-empty.png'} 
            alt=""
            onClick={checkRightImg(pagenums[pagenums.length - 1])? onClickRight : null}/>
        </div>
    )
}
