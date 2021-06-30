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
    const [priceInfo, setPriceInfo] = useState({
        price:0,
        origin_price:0,
    });
    
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
        var tempPriceInfo = {
            price:0,
            origin_price:0,
        }
        newArray.map(function(item){
            num += item.num
            tempPriceInfo.price += item.num * item.price;
            tempPriceInfo.origin_price += item.num * item.origin_price;
        });
        setTotalProductNum(num);
        setPriceInfo(tempPriceInfo);
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
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function getDiscountRate(origin, temp){
        return parseInt(((origin - temp) * 100) / origin);
    }
    return (
        <>
            {(pageNum === 0)?
                <div className='createproject-container'>
                    <p className='createproject-text'>
                        2가지만 설정하면<br/>추첨 링크가 생성됩니다.
                    </p>
                    <div id='select-date-btn' className={dueDateOpen?'create-project-selectBox open':'create-project-selectBox'} onClick={onClickDueDate}>
                        <div className='create-project-card'>
                            <p className='create-project-card-text'>1. 설문 기간 설정</p>
                            <p className={!dueDateOpen?'create-project-dueDate':'create-project-dueDate hide'}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'}/>
                                {startDate.getMonth() + 1}-{startDate.getDate()} ~ {endDate.getMonth() + 1}-{endDate.getDate()}
                            </p>
                        </div>
                        <div id='select-date-btn' className={dueDateOpen?'create-project-descriptionBox':'create-project-descriptionBox hide'}>
                            <p className='create-project-dueDate-description'>
                                설문 시작일과 종료일을 설정해주세요.<br/>
                                시작일 00:00부터 종료일 24:00까지 <br/>추첨이 활성화돼요.
                            </p>
                            <div className='create-project-box2'>
                                <p id='select-start-date-btn' className='create-project-dueDate-inline' onClick={openStartModal}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'}/>{startDate.getMonth()+1}-{startDate.getDate()}</p>
                                 ~ 
                                <p id='select-end-date-btn' className='create-project-dueDate-inline' onClick={openEndModal}><img className='create-project-icon' src={process.env.PUBLIC_URL + 'icon-calendar.png'} />{endDate.getMonth()+1}-{endDate.getDate()}</p>
                            </div>
                            <CalenderModal isStart={true} closeModal={closeStartModal} isModalOpen={startDayModalOpen} value={startDate} onChange={setStartDate}/>
                            <CalenderModal isStart={false} closeModal={closeEndModal} isModalOpen={endDayModalOpen} value={endDate} onChange={setEndDate}/>
                            </div>
                        <img className={dueDateOpen? 'create-project-arrow hide':'create-project-arrow'} src={process.env.PUBLIC_URL + 'arrow-down.png'}/>
                    </div>
                    <div id='select-gift-btn' className={giftOpen?'create-project-selectBox open':'create-project-selectBox'} onClick={onClickGift}>
                        <div className='create-project-card'>
                            <p className='create-project-card-text'>2. 기프티콘 선택</p>
                            <p className={!giftOpen?'create-project-dueDate':'create-project-dueDate hide'}>
                                {totalProductNum}개
                            </p>
                        </div>
                        <div className={giftOpen?'create-project-descriptionBox':'create-project-descriptionBox hide'}>
                            <p className='create-project-gift-description'>
                                당첨자에게 지급할 <br/>기프티콘을 선택해주세요.
                            </p>
                            {
                                productList.map((item, index) => <ProductCard key={index} item={item} index = {index} onChange={onChangeProductNum}/>)
                            }
                        </div>
                        <img className={giftOpen? 'create-project-arrow hide':'create-project-arrow'} src={process.env.PUBLIC_URL + 'arrow-down.png'}/>
                    </div>
                    <div className='contour-16margin'/>
                    <div className={readyToPay?'create-project-totalprice-box':'create-project-totalprice-box hide'}>
                        <p className='create-project-totalprice-text'>기존 기프티콘보다<br/><span className='create-project-totaldiscount-price'>{numberWithCommas(priceInfo.origin_price - priceInfo.price)}원</span> 절약할 수 있어요</p>
                        <div className='create-project-totalprice-innerbox'>
                            <p className='create-project-totaloriginprice'><del>{numberWithCommas(priceInfo.origin_price)}원</del> <span className='create-project-totaldiscountrate'>{getDiscountRate(priceInfo.origin_price, priceInfo.price)}%</span></p>
                            <p className='create-project-totalprice'>총 결제금액: {numberWithCommas(priceInfo.price)}원</p>
                        </div>
                    </div>
                    <button className={readyToPay?'create-project-pay-btn':'create-project-pay-btn disabled'} onClick={readyToPay?onClickPay:null}>결제하기</button>
                </div>
            :
            <></>
            }
        
        </>
        
    )
}

export default CreateProject
