import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
function ExamplePage(){
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
            <Link to ="/question">
                <button type="submit" disabled={false}>검사시작</button>
            </Link>  
        </div>
    );
}

export default ExamplePage;