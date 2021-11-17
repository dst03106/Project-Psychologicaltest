import React, { useState, useEfect } from 'react';
import Progress from './subComponents/Progress';
import TestList from './subComponents/TestList';
import TestNav from './subComponents/TestNav';

function QuestionPage(){
    return (
        <>
            <h1>검사진행</h1>
            <Progress/>
            <TestList/>
            <TestNav/> 
        </>
    );
}

export default QuestionPage;