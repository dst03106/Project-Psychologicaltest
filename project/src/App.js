import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import StartPage from './components/StartPage';
import CmpltPage from './components/CmpltPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ExamplePage from './components/ExamplePage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import axios from 'axios';


const URL = 'https://www.career.go.kr/inspct/openapi/test/questions?';
const APIKEY = '22b308e00e924ac13272794919934f05'; // 인증키 
const Q = '6'

const initalState = {
  inputs : {
    apikey: "22b308e00e924ac13272794919934f05",
    qestrnSeq: "6",
    trgetSe: "100210",
    name: "",
    gender: "",
    school: "율도중학교",
    grade: "2",
    email: "",
    startDtm: 1550466291034,
    answers: ""
    // answers: "B1=1 B2=3 B3=5 B4=1 B5=1 B6=1 B7=1 B8=1 B9=1 B10=1 B11=1 B12=1 B13=5 B14=4 B15=4 B16=4 B17=4 B18=5 B19=1 B20=1 B21=1 B22=5 B23=3 B24=6 B25=3 B26=2 B27=2 B28=6"
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INIT':
      console.log(state);
      return {
        ...state,
        inputs : {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}



function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { name, gender, answers } = state.inputs;
  const [data, setData] = useState([]);
  const [result, setResult] = useState();

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    console.log('onChange')
    console.log({name, value})
    dispatch({
      type: 'CHANGE_INIT',
      name,
      value
    });
  },);
  
  useEffect(() => {
    console.log("answers가 입력됐다!")
    console.log(state)
    const inputs = state.inputs
    console.log(inputs)
    const PostData = async() => {
      try {
        const res = await axios.post('https://www.career.go.kr/inspct/openapi/test/report',
        inputs);
        // (Q) 객체를 input로 바꿨는데 되네 왜 그럴까... 
        setResult(res.data.RESULT.url);
      } catch(e){
        console.log(e);
      }
      // try {
      //   const res = await axios.post('https://www.career.go.kr/inspct/openapi/test/report', {
      //   apikey: "22b308e00e924ac13272794919934f05",
      //   qestrnSeq: "6",
      //   trgetSe: "100210",
      //   name: "",
      //   gender: "",
      //   school: "율도중학교",
      //   grade: "2",
      //   email: "",
      //   startDtm: 1550466291034,
      //   answers: state.answers
      //   });
      //   setResult(res.data.RESULT.url);
      // } catch(e){
      //   console.log(e);
      // }
    }
    PostData();
  },[state])
  //오 state.answers 하면 인식 못하고 state하면 인식되는구나 
  
  useEffect(()=>{
    const fetchData = async() => {
      try{
          const res = await axios.get(URL, {
              params : {
                  apikey : APIKEY,
                  q : Q
              }
          });
          setData(res.data.RESULT);
      } catch(e){
          console.log(e);
      }
    };
    fetchData();
  },[])
  
    
  // useEffect(()=>{
  //   const Post = async() => {
  //     try{
  //       const res = await axios.post('https://www.career.go.kr/inspct/openapi/test/report', {
  //       apikey: "22b308e00e924ac13272794919934f05",
  //       qestrnSeq: "6",
  //       trgetSe: "100210",
  //       name: "",
  //       gender: "",
  //       school: "율도중학교",
  //       grade: "2",
  //       email: "",
  //       startDtm: 1550466291034,
  //       answers: {answers}
  //       });
  //       setResult(res.data.RESULT.url);
  //     } catch(e){
  //       console.log(e);
  //     }
  //   };
  //   Post();
  // },[answers])
  
  return (
    <BrowserRouter>
      <Switch>       
        <Route exact path = "/">
          <StartPage username={name} gender = {gender} onChange={onChange}/>
        </Route>

        <Route path = "/example">
          <ExamplePage data = {data} />
        </Route>

        <Route path = "/question">
          <QuestionPage data = {data} onChange={onChange} />
        </Route>
        
        <Route path = "/completion">
          <CmpltPage result = {result}/> 
        </Route>

        <Route path ="/result">
          <ResultPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
