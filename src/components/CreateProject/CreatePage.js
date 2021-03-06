import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import CreateProject from './CreateProject';
import Navbar from '../common/Navbar'
import BootPay from 'bootpay-js'
import baseUrl from '../../network/network';
import LogoBar from '../common/LogoBar';
import './CreatePage.css'
import { data } from 'jquery';

function CreatePage() {
    const history = useHistory();
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState(initStartDate());
    const [endDate, setEndDate] = useState(initEndDate());
    const [productList, setProductList] = useState([]);
    const [customUploadList, setCustomUploadList] = useState([]);
    const [totalProductNum, setTotalProductNum] = useState(0);
    const [projectId, setProjectId] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(()=>{
        if(sessionStorage.getItem('DODtoken') == null){
            window.location.assign('/');
        }
        fetch(`${baseUrl}/api/v1/products/`,{
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
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        
    }, [])

    function initEndDate(){
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        endDate.setHours(0, 0, 0, 0);
        return endDate;
    }
    function initStartDate(){
        var startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        return startDate;
    }
    function onClickBack(){
        history.goBack();
    }
    function dataURLtoFile(dataurl, fileName){
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, {type:mime});
    }
    function getTimeString(date){
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    }
    function onClickFinish(){
        if(customUploadList.length >0){
            setLoading(true);
            var data = new FormData();
            for(var i = 0; i < customUploadList.length; i++ ){
                data.append("custom_upload", fileList[i]);
            }
            data.append("start_at", getTimeString(startDate));
            data.append("dead_at", getTimeString(endDate));

            fetch(`${baseUrl}/api/v1/project/`,{
                method:'POST',
                headers:{
                    'accept' : 'application/json',
                    // 'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:data
                
            }).then(function(res){
                if(res.ok){
                    return res.json()
                }else if(res.status === 401){
                    window.location.assign('/');
                }else{
                    console.log(res);
                }
            }).then(res =>{
                sessionStorage.setItem('getLinkProjectId', res.id);
                window.location.assign('/projectlink');
                setLoading(false);
            })

        }
    }
    function createProjectWithoutGift(){
        fetch(`${baseUrl}/api/v1/project/`,{
            method:'POST',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            },
            body:JSON.stringify({
                start_at:getTimeString(startDate),
                dead_at:getTimeString(endDate)
            })
            
        }).then(function(res){
            if(res.ok){
                return res.json()
            }else if(res.status === 401){
                window.location.assign('/');
            }else{
                console.log(res);
            }
        }).then(res =>{
            sessionStorage.setItem('getLinkProjectId', res.id);
            window.location.assign('/projectlink');
            setLoading(false);
        })
    }
    function onClickPay(){
        setLoading(true);
        var itemList = []
        productList.map(function(item, index){
            if(item.num > 0){
                itemList.push({
                    'item':item.id,
                    'count':item.num
                })
            }
        })
        if(projectId === undefined){
            fetch(`${baseUrl}/api/v1/project/`,{
                method:'POST',
                headers:{
                    'accept' : 'application/json',
                    'content-type' : 'application/json;charset=UTF-8',
                    'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:JSON.stringify({
                    start_at:getTimeString(startDate),
                    dead_at:getTimeString(endDate),
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
                sendBootPay(res.id, res.total_price);
            }).catch(error=>console.log(error))
        }else{
            fetch(`${baseUrl}/api/v1/project/${projectId}/`,{
                method:'PUT',
                headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                },
                body:JSON.stringify({
                    start_at:getTimeString(startDate),
                    dead_at:getTimeString(endDate),
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
                sendBootPay(res.id, res.total_price);
            }).catch(error=>console.log(error))
        }
    }
    function sendBootPay(projectId, totalprice){
        fetch(`${baseUrl}/api/v1/payment/`, {
            method:'POST',
            headers:{
            'accept' : 'application/json',
            'content-type' : 'application/json;charset=UTF-8',
            'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            },
            body:JSON.stringify({
                project:projectId,
                price:totalprice
            })
        }).then(res => res.json())
        .then(data => {
            var order_id = data.results.order_id;
            var daa = data.results;
            BootPay.request(data.results
            ).error(function (data) {
                //?????? ????????? ????????? ???????????? ???????????????.
                setLoading(false);
            }).cancel(function (data) {
                setLoading(false);
            }).ready(function (data) {
                // ???????????? ?????? ??????????????? ???????????? ???????????? ???????????????.
            }).confirm(function (data) {
                //????????? ???????????? ?????? ????????????, ?????? ????????? ???????????? ????????? ???????????????.
                //?????? - ?????? ??????????????? ?????? ??? ????????? ???????????? ????????????.
                fetch(`${baseUrl}/api/v1/payment/confirm/`,{
                    method:'POST',
                    headers:{
                        'accept' : 'application/json',
                        'content-type' : 'application/json;charset=UTF-8',
                        'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                    },
                    body:JSON.stringify({
                        'order_id':order_id,
                        'receipt_id':data['receipt_id']
                    })
                }).then(res => {
                    var enable = true;
                    if(res.ok){
                        enable = true;
                    }else{
                        enable = false;
                    }
                    if (enable) {
                        BootPay.transactionConfirm(data); // ????????? ????????? ?????? ????????? ??????. ?????? ??????!
                    } else {
                        BootPay.removePaymentWindow(); // ????????? ?????? ????????? ?????? ?????? ?????? ????????? ???????????? ?????????.
                    }
                })
            }).close(function (data) {
                // ???????????? ????????? ???????????????. (??????,??????,????????? ???????????? ?????? ?????????)
            }).done(function (data) { // listener
                // ????????? ??????????????? ???????????? ???????????????
                // ???????????? ????????? ???????????? ?????? ?????? ????????? ????????? ????????? ???????????????.
                fetch(`${baseUrl}/api/v1/payment/done/`,{
                    method:'POST',
                    headers:{
                        'accept' : 'application/json',
                        'content-type' : 'application/json;charset=UTF-8',
                        'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
                    },
                    body:JSON.stringify({
                        'order_id':data['order_id'],
                        'receipt_id':data['receipt_id']
                    })
                }).then(res => {
                    if(res.ok){
                        sessionStorage.setItem('getLinkProjectId', projectId);
                        window.location.assign('/projectlink');
                    }
                    setLoading(false);
                })
            })
        })
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
            <div className={loading ? 'modal' : 'modal hide'}></div>
            <LogoBar/>
            <Navbar pageNum={0} onClickBack={onClickBack}/>
            <CreateProject fileList={fileList} setFileList={setFileList} createProjectWithoutGift={createProjectWithoutGift} customUploadList={customUploadList} setCustomUploadList={setCustomUploadList} productList = {productList} setProductList={setProductList} setTotalProductNum={setTotalProductNum} startDate={startDate} endDate={endDate} setStartDate = {setStartDate} setEndDate={setEndDate} onClickPay={onClickPay} onClickFinish={onClickFinish}/>
        </div>
    )
}

export default CreatePage