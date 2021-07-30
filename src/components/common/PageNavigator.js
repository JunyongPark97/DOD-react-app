import React,{useState, useEffect} from 'react'
import './PageNavigator.css'

export default function PageNavigator(props) {
    const {currentPageNum, totalPageNum,pagenums,onClickNavigator, onClickRight, onClickLeft} = props;
    const [min ,setMin] = useState(1);
    function onClickPage(){
        console.log(totalPageNum);
    }
    return (
        <div className='page-navi-container'>
            <img className='page-navi-arrow' src={process.env.PUBLIC_URL + '/navi-arrow-left.png'} alt="" onClick={onClickLeft}/>
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
            <img className='page-navi-arrow' src={process.env.PUBLIC_URL + '/navi-arrow-right.png'} alt="" onClick={onClickRight}/>
        </div>
    )
}
