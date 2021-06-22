import React,{useState, useEffect} from 'react'
import DescriptionCard from './DescriptionCard';

import baseUrl from '../network/network';

function MainpageDescription() {
    const [descriptionList, setDescriptionList] =useState([]);
    
    useEffect(()=>{
        fetch(`${baseUrl}/api/v1/dod-explanation/`,{
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'}
        }).then(
            res => res.json()
        ).then(res => {
            console.log(res);
            setDescriptionList(res);
        })
    }, [])

    return (
        <>
          {descriptionList.map(item => <DescriptionCard key={item.id} item={item}/>)}  
        </>
    )
}

export default MainpageDescription
