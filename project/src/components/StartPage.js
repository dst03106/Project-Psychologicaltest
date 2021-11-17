import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
function StartPage(){
    // user 정보를 useState 로 관리? 
    // 아니면 url에 user정보를 나타나게 해서 searchParams, useRef로 관리? 
    const [user, setUser] = useState({
        name: "",
        gender: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]:value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();      
    };
    return(
        <form onSubmit = {handleSubmit}>
            <h1>직업가치관검사</h1>
            <p>이름</p>
            <input name = "name" value={user.name} onChange={handleChange} />
            <p>성별</p>
            <input type="radio"  name='gender' value='남자' onChange={handleChange}/>남자<br/>
            <input type="radio"  name='gender' value='여자' onChange={handleChange}/>여자<br/>
            <Link to ="/example">
                <button type="submit" disabled={user.name.length==0 || user.gender.length==0}>검사시작</button>
            </Link>           
        </form>
    );
}

export default StartPage;