import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function QuestionPage(){
    // const client_key = '22b308e00e924ac13272794919934f05'; // 인증키 
    // const num = '6'; // 직업가치관검사(일반)
    const [questions, setQuestions] = useState([]);
    // axios
    //     .get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=22b308e00e924ac13272794919934f05&q=6')
    //     .then(res => res.data.RESULT)
    //     .then(setQuestions)

    useEffect(()=>{
        const fetchQuestions = async() => {
            const client_key = '22b308e00e924ac13272794919934f05'; // 인증키 
            const num = '6'; // 직업가치관검사(일반)

            try{
                const response = await axios.get(
                    'https://www.career.go.kr/inspct/openapi/test/questions?apikey=22b308e00e924ac13272794919934f05&q=6'
                );
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