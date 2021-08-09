import React from 'react'
import './ProductCard.css'

export default function ProductCard(props) {
    const {item, index, onChange} = props;
    function onClickAdd(){
        onChange(index, item.num + 1);
    }
    function onClickSubtract() {
        if(item.num !== 0){
            onChange(index, item.num -1);
        }
    }
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className='product-card-container'>
            <div className='product-card-innercontainer'>
                <img className='product-card-img' src ={item.thumbnail_image}/>
                <div className='product-card-name-box'>
                    <p className='product-card-name'>{item.name}</p>
                    <p className='product-card-originprice'><span className='product-card-discount_rate'>{item.discount_rate}%</span> <del>{numberWithCommas(item.origin_price)}원</del></p>
                    <p className='product-card-price'>{numberWithCommas(item.price)}원</p>
                    <img className='product-card-brandlogo' src={item.logo_image} alt=''/>
                </div>
                <div className='product-card-num-box'>
                    <img className='product-card-subtract' src={process.env.PUBLIC_URL + 'subtract-product-count.png'} onClick={onClickSubtract}/>
                    <p className='product-card-product-count'>{item.num}</p>
                    <img className='product-card-add' src={process.env.PUBLIC_URL + 'add-product-count.png'} onClick={onClickAdd}/>
                </div>
            </div>
        </div>
    )
}
