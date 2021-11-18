import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ExamplePage(){
    const [questions, setQuestions] = useState([]);
    useEffect(()=>{
        const fetchQuestions = async() => {
            try{
                const response = await axios.get(
                    'https://www.career.go.kr/inspct/openapi/test/questions?apikey=22b308e00e924ac13272794919934f05&q=6'
                );
                setQuestions(response.data.RESULT);
                console.log(questions);
            } catch(e){
                console.log(e);
            }
        };

        fetchQuestions();
    },[])     

    const question0= questions[0];
    return (
        <div>
            <h1>검사예시</h1>
            <p>
                직업과 관련된 두개의 가치 중에서
                자기에게 더 중요한 가치에 표시하세요.
            </p>
            <p>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
            </p>
            {questions && questions.length}
            {questions && question0.question}
            {/* {questions && questions[0].question}
            {questions && questions[0].answer01}
            {questions && questions[0].answer02} */}
            <Link to ="/question">
                <button type="submit" disabled={false}>검사시작</button>
            </Link>  
        </div>
    );
}

export default ExamplePage;