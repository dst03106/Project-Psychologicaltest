import React, { useState, useEfect } from 'react';

function StartPage(){
    const [user, setUser] = useState({
        name: "",
        gender: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newUser = {...user};
        newUser[name] = value;
        setUser(newUser);
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
            <button type="submit" disabled={user.name.length==0 || user.gender.length==0}>검사시작</button>
        </form>
    );
}

export default StartPage;