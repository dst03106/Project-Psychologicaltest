import React, { useState, useEfect } from 'react';
import {Link} from 'react-router-dom';
function ResultPage(){
    return (
        <div>
            <h1>직업가치관검사 결과표</h1>
            <Link to ="/">
                <button disabled={false}>다시검사하기</button>
            </Link> 
        </div>
    )
}

export default ResultPage;