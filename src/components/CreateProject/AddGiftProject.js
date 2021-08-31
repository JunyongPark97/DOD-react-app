import React,{useState, useRef} from 'react'
import CalenderModal from './CalendarModal'
import ProductCard from './ProductCard';
import {dodPayContact} from '../../network/network'

export default function AddGiftProject(props) {
    const {onClickPay, onClickFinish, customUploadList, setCustomUploadList, fileList, setFileList, productList, setProductList, setTotalProductNum} = props;
    
    const [useOwnGift, setUseOwnGift] = useState(true);
    const [priceInfo, setPriceInfo] = useState({
        
        price:0,
        origin_price:0,
    });
    
    const [readyToPay, setReadyToPay] = useState(false);
    const [readyToFinish, setReadyToFinish] = useState(false);
    const inputFile = useRef(null) 

    const [emptyFiles, setEmptyFiles] = useState([]);
    function onClickPayContact(){
        const a = document.createElement('a');
        a.setAttribute('href', dodPayContact);
        a.setAttribute('target', '_blank');
        a.click();
    }

    function onClickSelectFile(){
        inputFile.current.click();
    }
    function onChangeFileList(){
        var imageList = customUploadList;
        var newFileList = fileList;
        var list = [];
        Array.from(inputFile.current.files).forEach(file => { 
            if(file && file.type.substring(0,5) === 'image'){
                list.push(file);
            }
        });
        if((imageList.length + list.length)%3 === 1){
            setEmptyFiles(['']);
        }else if((imageList.length + list.length)%3 === 0){
            setEmptyFiles(['','']);
        }else{
            setEmptyFiles([]);
        }
        if(imageList.length + list.length >0){
            setReadyToFinish(true);
        }else{
            setReadyToFinish(false);
        }
        list.map((item, index)=>{
            newFileList.push(item);
            let reader = new FileReader();
            reader.onload = (e) => {
                var image = new Image();
                image.onload = function (imageEvent) {
    
                    // Resize the image
                    var canvas = document.createElement('canvas'),
                    max_size = 210,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                    var shift = 0;
                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                        shift = (width - height)/2
                        canvas.width = max_size;
                        canvas.height = max_size;
                        canvas.getContext('2d').fillStyle = '#ffffff'
                        canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
                        canvas.getContext('2d').drawImage(image, 0, shift, width, height);
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                        shift = (height - width)/2
                        canvas.width = max_size;
                        canvas.height = max_size;
                        canvas.getContext('2d').fillStyle = '#ffffff'
                        canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
                        canvas.getContext('2d').drawImage(image, shift, 0, width, height);
                    }
                    
                    var dataUrl = canvas.toDataURL('image/jpeg');
                    // var resizedImage = dataURLToBlob(dataUrl);
                    
                    imageList.push(dataUrl);
                    setCustomUploadList([...imageList]);
                }
                image.src = e.target.result;
                /////

                
            };
            reader.readAsDataURL(item);
        })
        setFileList([...newFileList]);
        inputFile.current.value = "";
    }
    function removeCustomItem(e){
        var index = e.target.getAttribute('index');
        var newList = customUploadList;
        newList.splice(index,1);
        var newFileList = fileList;
        newFileList.splice(index, 1);

        if((newList.length)%3 === 1){
            setEmptyFiles(['']);
        }else if((newList.length)%3 === 0){
            setEmptyFiles(['','']);
        }else{
            setEmptyFiles([]);
        }
        if(newList.length >0){
            setReadyToFinish(true);
        }else{
            setReadyToFinish(false);
        }
        setCustomUploadList([...newList]);
        setFileList([...newFileList]);
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
        <div className='createproject-container'>
            <p className='createproject-text'>
                여기만 끝내면<br/>추첨 링크가 만들어져요!
            </p>
            <div className='contour'/>
            <div id='select-gift-btn' className='create-project-selectBox' >
                <div className='create-project-card'>
                    <img className='create-project-title-img' src={process.env.PUBLIC_URL + '/create-page-image2.png'}/>
                    <div className='create-project-title-text'>
                        <p className='create-project-card-text'>기프티콘</p>
                        <p className='create-project-card-subtext'>어떤 걸 쓰시겠어요?</p>
                    </div>
                </div>
                <div className='create-project-selectOwn-slide'>
                    <p id='create-project-myown-btn' 
                        className={useOwnGift?'create-project-selectOwn-text-selected':'create-project-selectOwn-text'}
                        onClick={useOwnGift?(null):(function(){
                            setUseOwnGift(true);
                        })}
                    >내 기프티콘 쓰기</p>
                    <p id='create-project-buygift-btn' 
                        className={useOwnGift?'create-project-selectOwn-text':'create-project-selectOwn-text-selected'}
                        onClick={useOwnGift?(function(){
                            setUseOwnGift(false);
                        }):(null)}
                    >여기서 구매하기</p>
                </div>
                <div className='create-project-descriptionBox-grey'>
                    <p className='create-project-description'>
                        {
                            useOwnGift? (
                                <>
                                    <span className='create-project-description-small'>
                                        내 기프티콘을 쓸 경우, 여기서 따로 구매하지 못해요.
                                    </span><br/>
                                    기프티콘 종류에 상관없이<br/>랜덤으로 추첨돼요!
                                </>
                            ):(
                                <>
                                    <span className='create-project-description-small'>
                                        제휴된 기프티콘을 저렴하게 구매하세요.
                                    </span><br/>
                                    과금없이 당첨자에게<br/>지급할 기프티콘만 결제하면 돼요!
                                </>
                            )
                        }
                    </p>
                </div>
            </div>
            {
                useOwnGift?(
                    <>
                        <div className='create-project-dropbox'>
                            <input type='file' id='file' ref={inputFile} accept="image/png, image/jpeg, image/jpg" style={{display: 'none'}} multiple={true} onChange={onChangeFileList}/>
                            <div className='create-project-custom-product-card'>
                                <img onClick={onClickSelectFile} className='create-project-custom-product-img' src={process.env.PUBLIC_URL + '/upload-img.png'} />
                            </div>
                            {
                                customUploadList.map((item,index)=>(
                                    <div key={index} className='create-project-custom-product-card' >
                                        <img className='create-project-custom-product-img' src={item} />
                                        <img index={index} className='create-project-custom-remove-btn' src={process.env.PUBLIC_URL + '/remove-image-icon.png'} onClick={removeCustomItem}/>
                                    </div>
                                ))
                            }
                            {
                                emptyFiles.map((item,index)=>(
                                    <div key={index} className='create-project-custom-product-card'>
                                        
                                    </div>
                                ))
                            }
                        </div>
                        <div className='contour-16margin-both'/>
                        <p className='create-project-totalprice-text' style={{'marginTop':'0px', 'marginBottom':'16px'}}>· 유효기간 만료 및 이용약관 위반 이미지는 임의 삭제, 서비스 이용이 제한될 수 있습니다.</p>
                        <button id='create-project-finish-btn' className={readyToFinish?'btn-bottom-big':'btn-bottom-big disabled'} onClick={readyToFinish?onClickFinish:null}>완료하기</button>
                    </>
                ):(
                    <>
                        <div>
                            {
                                productList.map((item, index) => <ProductCard key={index} item={item} index = {index} onChange={onChangeProductNum}/>)
                            }
                        </div>
                        <div className='contour-16margin-both'/>
                        <div className={readyToPay?'create-project-totalprice-box':'create-project-totalprice-box hide'}>
                            <p className='create-project-totalprice-text'>기존 기프티콘보다<br/><span className='create-project-totaldiscount-price'>{numberWithCommas(priceInfo.origin_price - priceInfo.price)}원</span> 저렴해요!</p>
                            <div className='create-project-totalprice-innerbox'>
                                <p className='create-project-totaloriginprice'><del>{numberWithCommas(priceInfo.origin_price)}원</del> <span className='create-project-totaldiscountrate'>{getDiscountRate(priceInfo.origin_price, priceInfo.price)}%</span></p>
                                <p className='create-project-totalprice'>총 결제금액: {numberWithCommas(priceInfo.price)}원</p>
                            </div>
                        </div>
                        <p style={{'marginBottom':'0px'}} className='create-project-totalprice-text'>· 첫 추첨자가 생긴 이후에는 환불이 불가합니다.</p>
                        <p style={{'marginTop':'0px', 'marginBottom':'16px'}} className='create-project-totalprice-text'>· <u onClick={onClickPayContact}>결제 조건 확인 및 개인정보 제공</u>에 동의합니다.</p>
                        
                        <button id='create-project-pay-btn' className={readyToPay?'btn-bottom-big':'btn-bottom-big disabled'} onClick={readyToPay?onClickPay:null}>기프티콘 결제하기</button>
                    </>
                )
            }
        </div>
    )
}