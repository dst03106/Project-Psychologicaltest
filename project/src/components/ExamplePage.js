import React, { useState, useEfect } from 'react';
import Progress from './subComponents/Progress';
import TestList from './subComponents/TestList';
import TestNav from './subComponents/TestNav';

function ExamplePage(){
    return (
        <div>
            <h1>검사예시</h1>
            <Progress/>
            <p>
                직업과 관련된 두개의 가치 중에서
                자기에게 더 중요한 가치에 표시하세요.
            </p>
            <p>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
            </p>
            <TestList/>
            <TestNav/>
        </div>
    );
}

export default ExamplePage;