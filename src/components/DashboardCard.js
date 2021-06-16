import React from 'react'
import './DashboardCard.css'
import StatusTag from './StatusTag';
import DashboardCardBtn from './DashboardCardBtn'

export default function DashboardCard(props) {
    const {item, index, deleteProject} = props;
    const products = item.products;
    function deleteItem(){
        fetch(`http://3.36.156.224:8000/api/v1/project/${item.id}/`,{
            method:'POST',
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8',
                'Authorization' : 'Token ' + sessionStorage.getItem('DODtoken')
            }
        }).then(res => {
            if(res.ok){
                deleteProject(index);
            }else{
                console.log(res);
            }
        })
    }
    return (
        <div className={(item.project_status > 100) ? 'dashboard-card-container disabled' :'dashboard-card-container'}>
            <div className='dashboard-card-title'>
                <p className='dashboard-card-title-text'><img className='dashboard-icon' src={process.env.PUBLIC_URL + 'dod-icon.png'}/>{item.name}</p>
                <StatusTag status={item.project_status}/>
            </div>
            <div className='dashboard-card-content-container'>
                <div className='dashboard-card-content-innercontainer border'>
                    <div className='dashboard-card-content-duedate'>
                        <p className='dashboard-card-content-text'>설문기간</p>
                        <p className={(item.project_status > 100)?'dashboard-card-content disabled':'dashboard-card-content'}>{item.start_at}~{item.dead_at}</p>
                    </div>
                    <div className='dashboard-card-content-candidates'>
                        <p className='dashboard-card-content-text'>응모자 수</p>
                        <p className={(item.project_status > 100)?'dashboard-card-content disabled':'dashboard-card-content'}>{item.total_respondent}명</p>
                    </div>
                </div>
                <div className='dashboard-card-content-innercontainer'>
                    <div className='dashboard-card-content-gift'>
                        <p className='dashboard-card-content-text'>기프티콘</p>
                        <div className='dashboard-card-content-itemlist'>
                            {
                                products.map((productItem) => 
                                <div key={productItem.id} className='dashboard-card-content-products'>
                                    <img className='dashboard-card-content-giftimg' src={productItem.item_thumbnail}/>
                                    <p className={(item.project_status > 100)?'dashboard-card-content-giftnum disabled':'dashboard-card-content-giftnum'}>{productItem.winner_count}/{productItem.winner_count+productItem.remain_winner_count}</p>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <DashboardCardBtn status={item.project_status} projectId={item} deleteProject={deleteItem}/>
        </div>
    )
}
