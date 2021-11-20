import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = 'https://www.career.go.kr/inspct/openapi/test/questions?';
const APIKEY = '22b308e00e924ac13272794919934f05'; // 인증키 
const Q = '6'

function QuestionPage(){
    const [data, setData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    // answer를 배열안의 객체로 설정할지, 그냥 객체로 설정할지.. 
    const [answers, setAnswers] = useState({});
    // const inputRef = useRef(null);
    const pageLimit = 5;
    const pageLen = parseInt(data.length/pageLimit) + 1;

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
                console.log(e)
            }
        };

        fetchData();
    },[])

    // const onChange = (e) => {
    //     if (inputRef.current) {
    //         inputRef.current.value = e.target.value;
    //     }
    // }
    
    useEffect(()=>{       
        console.log('useEffect');
        console.log(answers);
        console.log(Object.keys(answers).length);
    },[answers])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // const newAnswer = {
        //     [name] : value
        // };
        // setAnswers(answers.concat(newAnswer));
        setAnswers({
            ...answers,
            [name]:value
        });
        console.log('handleChange');
        // console.log(answers);
        // console.log(answers.length);
    };

    
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
                <li key={item.qitemNo}>
                    {item.qitemNo}번.
                    {item.question}<br/>
                    <input type="radio" name={item.qitemNo} value = {item.answerScore01} onChange={handleChange} 
                    checked = {answers[item.qitemNo]==item.answerScore01? true:false}/>{item.answer01}
                    <input type="radio" name={item.qitemNo} value = {item.answerScore02} onChange={handleChange} 
                    checked = {answers[item.qitemNo]==item.answerScore02? true:false}/>{item.answer02}
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
            <h2>{(100/(pageLen-1)) * (curPage-1)}%</h2>
            <ul>
                {qList}
            </ul>
            {curPage != 1 && <button onClick={gotoPrevPage}>이전</button>}
            {curPage != pageLen && <button onClick={gotoNextPage}>다음</button>}
            {curPage == pageLen && <Link to ="/completion"><button  disabled={ Object.keys(answers).length == data.length? false:true  }>다음</button></Link>}
        </>
    );
}

export default QuestionPage;