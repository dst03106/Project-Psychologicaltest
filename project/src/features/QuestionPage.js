import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = 'https://www.career.go.kr/inspct/openapi/test/questions?';
const APIKEY = '22b308e00e924ac13272794919934f05'; // 인증키 
const Q = '6'

function QuestionPage(){

    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        const fetchQuestions = async() => {
            
            const num = '6'; // 직업가치관검사(일반)

            try{
                const response = await axios.get(URL, {
                    params : {
                        apikey : APIKEY,
                        q : Q
                    }
                });
                setQuestions(response.data.RESULT);
            } catch(e){
                console.log(e);
            }
        };

        fetchQuestions();
    },[])
    
    return (
        <>
            <h1>검사진행</h1>
            {questions && questions.length}
            <ul>
                {questions && questions.map((item,index) => (
                    <li key={index}>
                        {item.question}
                        {item.answer01}
                        {item.answer02}
                    </li>
                ))}
            </ul>
            <Link to ="/question">
                <button disabled={false}>이전</button>
            </Link> 
            <Link to ="/question">
                <button disabled={false}>다음</button>
            </Link> 
        </>
    );
}

export default QuestionPage;