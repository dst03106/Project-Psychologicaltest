import React, { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {Link} from 'react-router-dom';
// 추후 할 일 : 너무 쓸데없는 리렌더링 방지하기 - 5개 다받으면 렌더링되게?? Ref이용할까 말까 


function QuestionPage({data, onChange}){
    // const [data, setData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    // answer를 배열안의 객체로 설정할지, 그냥 객체로 설정할지.. 
    const [answers, setAnswers] = useState([]);
    const [checked, setChecked] = useState([]);
    // const inputRef = useRef(null);
    const pageLimit = 5;
    const pageLen = parseInt(data.length/pageLimit) + 1;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newAns = [...answers];
        const newChecked = [...checked];
        newAns[name-1] = `B${name}=${value}`;
        newChecked[name-1] = true;
        setAnswers(newAns);
        setChecked(newChecked)
        console.log('handleChange');      
    };

    
    
    useEffect(()=>{       
        console.log('useEffect');
        console.log(answers);
        console.log(data.length)
        // 왜 Object로 나올까 
        console.log(typeof answers);
        console.log(answers.join(' '));
        console.log(Object.keys(answers).length);
    },[answers])

    const handleChecked = (e)=>{
        const name = e.target.name
        return (
            answers[name-1]? true:false
        )
    };

    let qList = new Array();
    qList[curPage-1] = data
        .filter((item) => {       
            // console.log('(1)'+ item.qitemNo)
            // console.log('(2)'+ item.qitemNo-1) // NaN 출력..?
            // console.log(parseInt(item.qitemNo-1/pageLimit) + 1);
            return item.qitemNo>pageLimit*(curPage-1) && item.qitemNo<=pageLimit*curPage;
            // return parseInt(item.qitemNo-1/pageLimit) + 1 == curPage;
        })
        .map((item) => {
            return (
                <li key={item.qitemNo}>
                    {item.qitemNo}번.
                    {item.question}<br/>
                    <input type="radio" name={item.qitemNo} value = {item.answerScore01} onChange={handleChange} 
                    defaultchecked = {checked[item.qtemNo-1]}/>{item.answer01}
                    <input type="radio" name={item.qitemNo} value = {item.answerScore02} onChange={handleChange} 
                    defaultchecked = {checked[item.qtemNo-1]}/>{item.answer02}
                    {/* <input type="radio" name={item.qitemNo} value = {item.answerScore01} onChange={handleChange} 
                    defaultchecked = {answers[item.qtemNo-1]? true:false}/>{item.answer01}
                    <input type="radio" name={item.qitemNo} value = {item.answerScore02} onChange={handleChange} 
                    defaultchecked = {answers[item.qtemNo-1]? true:false}/>{item.answer02} */}
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
            {curPage == pageLen && <Link to ="/completion"><button  name="answers" value={answers.join(' ')} disabled={ Object.keys(answers).length == data.length? false:true  } onClick={onChange}>다음</button></Link>}
        </>
    );
}

export default QuestionPage;