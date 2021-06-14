import React,{useState} from 'react'
import './CreateProject.css'
import CalenderModal from './CalendarModal'
import ProductCard from './ProductCard';

function CreateProject(props) {
    const {pageNum, onClickPay, setPrice, productList, setProductList, totalProductNum, setTotalProductNum, startDate, endDate, setStartDate, setEndDate} = props;
    const [dueDateOpen, setDueDateOpen] = useState(true);
    const [giftOpen, setGiftOpen] = useState(false);
    
    const [startDayModalOpen , setStartDayModalOpen] = useState(false);
    const [endDayModalOpen , setEndDayModalOpen] = useState(false);
    
    const [readyToPay, setReadyToPay] = useState(false);

    function onClickDueDate(){
        setDueDateOpen(true);
        setGiftOpen(false);
    }
    function onClickGift(){
        setDueDateOpen(false);
        setGiftOpen(true);
    }
    function closeStartModal(){
        setStartDayModalOpen(false);
    }
    function openStartModal(){
        setStartDayModalOpen(true);
    }
    function closeEndModal(){
        setEndDayModalOpen(false);
    }
    function openEndModal(){
        setEndDayModalOpen(true);
    }

    function countTotalProductNum(newArray){
        var num = 0;
        newArray.map(item => num += item.num);
        setTotalProductNum(num);
        if(num === 0){
            setReadyToPay(false);
        }else{
            setReadyToPay(true);
        }
    }
    function onChangeProductNum(index, newNum){
        var newArray = productList;
        newArray[index].num = newNum;
        setProductList(newArray);
        countTotalProductNum(newArray);
    }
    return (
        <>
            {(pageNum === 0)?
                <div className='createproject-container'>
                    <p className='createproject-text'>
                        2가지만 설정하면<br/>프로젝트가 생성됩니다.
                    </p>
                    <div className={dueDateOpen?'create-project-selectBox open':'create-project-selectBox'} onClick={onClickDueDate}>
                        <div className='create-project-card'>
                            <p className='create-project-card-text'>1. 설문 기간 설정</p>
                            <p className={!dueDateOpen?'create-project-dueDate':'create-project-dueDate hide'}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'}/>
                                {startDate.getMonth() + 1}-{startDate.getDate()} ~ {endDate.getMonth() + 1}-{endDate.getDate()}
                            </p>
                        </div>
                        <div className={dueDateOpen?'create-project-descriptionBox':'create-project-descriptionBox hide'}>
                            <p className='create-project-dueDate-description'>
                                설문 시작일과 종료일을 설정해주세요.<br/>
                                시작일 00:00부터 종료일 24:00까지 프로젝트가 활성화돼요.
                            </p>
                            <div className='create-project-box2'>
                                <p className='create-project-dueDate-inline' onClick={openStartModal}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'}/>{startDate.getMonth()+1}-{startDate.getDate()}</p>
                                 ~ 
                                <p className='create-project-dueDate-inline' onClick={openEndModal}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'} />{endDate.getMonth()+1}-{endDate.getDate()}</p>
                            </div>
                            <CalenderModal closeModal={closeStartModal} isModalOpen={startDayModalOpen} value={startDate} onChange={setStartDate}/>
                            <CalenderModal closeModal={closeEndModal} isModalOpen={endDayModalOpen} value={endDate} onChange={setEndDate}/>
                            </div>
                        <img className='create-project-arrow' src={dueDateOpen? process.env.PUBLIC_URL + 'arrow-up.png' : process.env.PUBLIC_URL + 'arrow-down.png'}/>
                    </div>
                    <div className={giftOpen?'create-project-selectBox open':'create-project-selectBox'} onClick={onClickGift}>
                        <div className='create-project-card'>
                            <p className='create-project-card-text'>2. 기프티콘 선택</p>
                            <p className={!giftOpen?'create-project-dueDate':'create-project-dueDate hide'}>
                                {totalProductNum}개
                            </p>
                        </div>
                        <div className={giftOpen?'create-project-descriptionBox':'create-project-descriptionBox hide'}>
                            <p className='create-project-gift-description'>
                                당첨자에게 지급할 기프티콘을 선택해주세요.<br/>
                                기프티콘은 종류와 상관없이 랜덤하게 지급돼요.
                            </p>
                            {
                                productList.map((item, index) => <ProductCard key={index} item={item} index = {index} onChange={onChangeProductNum}/>)
                            }
                        </div>
                        <img className='create-project-arrow' src={giftOpen? process.env.PUBLIC_URL + 'arrow-up.png' : process.env.PUBLIC_URL + 'arrow-down.png'}/>
                    </div>
                    <div className='contour-16margin'/>
                    <button className={readyToPay?'create-project-pay-btn':'create-project-pay-btn disabled'} onClick={readyToPay?onClickPay:null}>결제하기</button>
                </div>
            :
            <></>
            }
        
        </>
        
    )
}

export default CreateProject
