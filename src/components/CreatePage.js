import React,{useState, useEffect} from 'react'
import CreateProject from './CreateProject';
import Navbar from './Navbar'
import Payment from './Payment'

function CreatePage() {
    const [pageNum, setPageNum] = useState(0);
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(initEndDate());
    const [productList, setProductList] = useState([]);
    const [totalProductNum, setTotalProductNum] = useState(0);
    const [name , setName] = useState('');
    const [projectId, setProjectId] = useState(undefined);

    useEffect(()=>{
        if(totalProductNum === 0){
            setPageNum(0);
        }
        if(sessionStorage.getItem('DODtoken') == null){
            window.location.assign('/');
        }
        fetch('http://3.36.156.224:8000/api/v1/products/',{
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'}
        }).then(
            res => res.json()
        ).then(res => {
            var newArray =[];
            res.map(function(item){
                item.num = 0;
                newArray.push(item);
            })
            setProductList(newArray);
        })
    }, [])

    function initEndDate(){
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        return endDate
    }
    function onClickBack(){
        if(pageNum === 1){
            setPageNum(0)
        }else{
            window.location.assign('/');
        }
    }
    function onClickPay(){
        var itemList = []
        console.log(sessionStorage.getItem('DODtoken'));
        productList.map(function(item, index){
            if(item.num > 0){
                itemList.push({
                    'item':item.id,
                    'count':item.num
                })
            }
        })
        console.log(itemList);
        if(projectId === undefined){
            fetch('http://3.36.156.224:8000/api/v1/project/',{
                method:'POST',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:JSON.stringify({
                    start_at:startDate,
                    dead_at:endDate,
                    items:itemList
                })
            }).then(function(res){
                if(res.ok){
                    return res.json()
                }else if(res.status === 401){
                    window.location.assign('/');
                }else{
                    console.log(res);
                }
            }).then(res => {
                setProjectId(res.id);
                getTotalPrice();
                setPageNum(1);
            }).catch(error=>console.log(error))
        }else{
            fetch(`http://3.36.156.224:8000/api/v1/project/${projectId}/`,{
                method:'PUT',
                headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:JSON.stringify({
                    start_at:startDate,
                    dead_at:endDate,
                    items:itemList
                })
            }).then(function(res){
                if(res.ok){
                    return res.json()
                }else{
                    console.log(res);
                }
            }).then(res => {
                setProjectId(res.id);
                getTotalPrice();
                setPageNum(1);
            }).catch(error=>console.log(error))
        }
    }
    function getTotalPrice(){
        var totalPrice = 0;
        productList.map(function(item){
            totalPrice += item.price * item.num;
        })
        setPrice(totalPrice);
    }
    
    
    return (
        <div>
            <Navbar pageNum={pageNum} onClickBack={onClickBack}/>
            <CreateProject productList = {productList} setProductList={setProductList} totalProductNum={totalProductNum} setTotalProductNum={setTotalProductNum} startDate={startDate} endDate={endDate} setStartDate = {setStartDate} setEndDate={setEndDate} pageNum={pageNum} onClickPay={onClickPay}/>
            <Payment projectId={projectId} name={name} setName={setName} pageNum={pageNum} price={price} />
        </div>
    )
}

export default CreatePage