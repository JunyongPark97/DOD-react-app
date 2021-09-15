import React, { useState, useEffect } from 'react'
import InactiveResultPage from './InactiveResultPage';
import LotteryPage from './LotteryPage'
import ResultPage from './ResultPage'
import TestResultPage from './TestResultPage';
import baseUrl from '../../network/network';

function Result(props) {
    const path = props.location.pathname;
    const queryString = require('query-string');
    const params = queryString.parse(props.location.search);
    const [projectKey, setProjectId] = useState(params.p);
    const [projectInfo, setProjectInfo] = useState(null);
    useEffect(() => {
        fetch(`${baseUrl}/api/v1/announce/${projectKey}/`,{
            headers:{
                'accept' : 'application/json',
                'content-type' : 'application/json;charset=UTF-8'}
        }).then(res => {
            return res.json();
        }).then(res =>{
            console.log(res);
            setProjectInfo(res);
        })
    }, [projectKey])
    function getComponent(path){
        if(path === "/link"){
            return (<LotteryPage innerComponent={<ResultPage location={props.location.search}/>}  projectInfoObj={projectInfo}/>)
        }else if(path === '/testlink'){
            return (<LotteryPage innerComponent={<TestResultPage location={props.location.search}/>}  projectInfoObj={projectInfo}/>)
        }else{
            return (<LotteryPage innerComponent={<InactiveResultPage location={props.location.search}/>}  projectInfoObj={projectInfo}/>)
        }
    }
    return (
        <>
            {
                getComponent(path)
            }
        </>
    )
}

export default Result
