import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = 'https://www.career.go.kr/inspct/openapi/test/questions?';
const APIKEY = '22b308e00e924ac13272794919934f05'; // 인증키 
const Q = '6'

function QuestionPage(){
    const [data, setData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const pageLimit = 5;

    useEffect(()=>{
        const fetchData = async() => {

            try{
                const response = await axios.get(URL, {
                    params : {
                        apikey : APIKEY,
                        q : Q
                    }
                });
                setData(response.data.RESULT);
            } catch(e){
                console.log(e);
            }
        };

        fetchData();
    },[])
    let qList = data
        .filter((item) => {
            // console.log('(1)'+ item.qitemNo)
            // console.log('(2)'+ item.qitemNo-1) // NaN 출력..?
            // console.log(parseInt(item.qitemNo-1/pageLimit) + 1);
            return item.qitemNo>pageLimit*(curPage-1) && item.qitemNo<=pageLimit*curPage;
            // return parseInt(item.qitemNo-1/pageLimit) + 1 == curPage;
        })
        .map((item,index) => {
            return (
                <li key={index}>
                    {item.qitemNo}번.
                    {item.question}<br/>
                    <input type="radio" name={item.qitemNo}/>{item.answer01}
                    <input type="radio" name={item.qitemNo}/>{item.answer02}
                </li>   
            )
        });
    
    function gotoPrevPage() {
        setCurPage((cur) => cur - 1)
    }

    function gotoNextPage() {
        setCurPage((cur) => cur + 1)
    }

    return (
        <>
            <h1>검사진행</h1>
            <ul>
                {qList}
            </ul>
            {curPage != 1 && <button onClick={gotoPrevPage}>이전</button>}
            {curPage != parseInt(data.length/pageLimit) + 1  && <button onClick={gotoNextPage}>다음</button>}
        </>
    );
}

export default QuestionPage;