import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = 'https://www.career.go.kr/inspct/openapi/test/questions?';
const APIKEY = '22b308e00e924ac13272794919934f05'; // 인증키 
const Q = '6'

function ExamplePage(){
    const [data, setData] = useState([]);

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

    const qList = data.map((item,index) => (
        <li key={index}>
            {item.question}<br/>
            <input type="radio" name="answer"/>{item.answer01}
            <input type="radio" name="answer"/>{item.answer02}
        </li>   
    ));

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
            {qList[0]}
            <Link to ="/question">
                <button type="submit" disabled={false}>검사시작</button>
            </Link>  
        </div>
    );
}

export default ExamplePage;