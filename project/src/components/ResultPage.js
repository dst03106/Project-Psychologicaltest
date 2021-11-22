import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ResultPage(){
    const [result, setResult] = useState();
    
    useEffect(()=>{
        const Post = async() => {
            try{
                const res = await axios.post('https://www.career.go.kr/inspct/openapi/test/report', {
                apikey: "22b308e00e924ac13272794919934f05",
                qestrnSeq: "6",
                trgetSe: "100210",
                name: "",
                gender: "",
                school: "율도중학교",
                grade: "2",
                email: "",
                startDtm: 1550466291034,
                answers: "B1=1 B2=3 B3=5 B4=1 B5=1 B6=1 B7=1 B8=1 B9=1 B10=1 B11=1 B12=1 B13=5 B14=4 B15=4 B16=4 B17=4 B18=5 B19=1 B20=1 B21=1 B22=5 B23=3 B24=6 B25=3 B26=2 B27=2 B28=6"
                });
                setResult(res.data.RESULT);
            } catch(e){
                console.log(e);
            }
        };
        Post();
    },[])

    useEffect(()=> {

    },[result])

    return (
        <div>
            <h1>직업가치관검사 결과표</h1>
            {result && console.log(result)}
            <Link to ="/">
                <button disabled={false}>다시검사하기</button>
            </Link> 
        </div>
    )
}

export default ResultPage;