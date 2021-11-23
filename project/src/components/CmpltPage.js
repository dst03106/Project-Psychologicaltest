import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
function QuestionPage({result}){
    const handleChange = (e) => {
        console.log(result)
        window.location.assign(result)
        getHtml();
    }
    async function getHtml() {
        try {
            const response = await axios.get(result,{
                
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>검사가 완료되었습니다.</h1>
            <p>
                검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 
                중요하게 생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는
                직업에 대해 생각해 볼 기회를 제공합니다.
            </p>
            {/* <Link to ="/result"> */}
            {result}
            {typeof result}
            <button disabled={false} onClick={handleChange}>결과보기</button>
            {/* </Link>   */}
        </div>
    );
}

export default QuestionPage;