import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar'
import Payment from './Payment';

export default function CheckPaymentPage() {
    const history = useHistory();
    const projectId = sessionStorage.getItem('checkPaymentProjectId');
    const [name, setName] = useState(sessionStorage.getItem('checkPaymentName'));
    const price = sessionStorage.getItem('checkPaymentPrice');
    function onClickBack(){
        sessionStorage.removeItem('checkPaymentProjectId');
        sessionStorage.removeItem('checkPaymentName');
        sessionStorage.removeItem('checkPaymentPrice');
        history.goBack();
    }
    function onClickSetName(name){
        setName(name);
        sessionStorage.setItem('checkPaymentName', name);
    }
    return (
        <div>
            <Navbar pageNum={1} onClickBack={onClickBack}/>
            <Payment projectId={projectId} name={name} setName={onClickSetName} pageNum={1} price={price}/>
        </div>
    )
}
