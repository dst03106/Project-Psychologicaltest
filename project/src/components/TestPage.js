// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";
// function Question({
//   qitemNo,
//   question,
//   answer01,
//   answer02,
//   answerScore01,
//   answerScore02,
//   onChange: handleChange,
//   initalValue,
// }) {
//   return (
//     <>
//       {data
//         .filter((item) => {
//           return (
//             item.qitemNo > pageLimit * (curPage - 1) &&
//             item.qitemNo <= pageLimit * curPage
//           );
//           // return parseInt(item.qitemNo-1/pageLimit) + 1 == curPage;
//         })
//         .map((item) => {
//           return (
//             <li key={item.qitemNo}>
//               {item.qitemNo}번.
//               {item.question}
//               <br />
//               <input
//                 type="radio"
//                 id={item.answerScore01}
//                 name={item.qitemNo}
//                 value={item.answerScore01}
//                 onChange={handleChange}
//                 defaultChecked={answers[item.qtemNo - 1]}
//               />
//               <label htmlFor={item.answerScore01}>{item.answer01}</label>
//               <input
//                 type="radio"
//                 id={item.answerScore02}
//                 name={item.qitemNo}
//                 value={item.answerScore02}
//                 onChange={handleChange}
//                 checked={answers[item.qtemNo - 1]}
//               />
//               <label htmlFor={item.answerScore02}>{item.answer02}</label>
//             </li>
//           );
//         })}
//     </>
//   );
// }
// function TestPage() {
//   const [questions, setQuestions] = useState([]);
//   // const [data, setData] = useState([]);
//   const [curPage, setCurPage] = useState(1);
//   // answer를 배열안의 객체로 설정할지, 그냥 객체로 설정할지..
//   const [answers, setAnswers] = useState([
//     {
//       answer: "",
//       checked1: false,
//       checked2: false,
//     },
//   ]);
//   // const inputRef = useRef(null);
//   const pageLimit = 5;
//   const pageLen = parseInt(data.length / pageLimit) + 1;

//   useEffect(() => {
//     console.log("TestPage.js에서 리렌더링");
//   });

//   const fetchQuestions = useCallback(async () => {
//     const res = await api.test.getQuestions();
//     setQuestions(res);
//   },[]);

//   useEffect(fetchQuestions,[]);
//   useEffect(console.log(questions),[questions]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newAns = [...answers];
//     newAns[name - 1].answer = `B${name}=${value}`;
//     if (value % 2 == 0) {
//       newAns[name - 1].checked2 = true;
//     } else {
//       newAns[name - 1].checked1 = true;
//     }
//     setAnswers(newAns);
//     window.localStorage.setItem(JSON.stringify(name), JSON.stringify(value));
//     console.log("handleChange");
//   };

//   useEffect(() => {
//     console.log("useEffect");
//     console.log(answers);
//     console.log(data.length);
//     // 왜 Object로 나올까
//     console.log(typeof answers);
//     console.log(answers.join(" "));
//     console.log(Object.keys(answers).length);
//   }, [answers]);

//   //   useEffect(
//   //     (e) => {
//   //       const { name, value } = e.target;
//   //       const saved = window.localStorage.getItem(JSON.stringify(name));
//   //       const initialValue = JSON.parse(saved);
//   //       console.log("handleChecked");
//   //       initialValue && console.log(initialValue);
//   //       return saved && initialValue == value ? true : false;
//   //     },
//   //     [temps]
//   //   );

//   function gotoPrevPage() {
//     setCurPage((cur) => cur - 1);
//   }

//   function gotoNextPage() {
//     setCurPage((cur) => cur + 1);
//   }

//   return (
//     <>
//       <h1>검사진행</h1>
//       <h2>{(100 / (pageLen - 1)) * (curPage - 1)}%</h2>

//       {curPage != 1 && <button onClick={gotoPrevPage}>이전</button>}
//       {curPage != pageLen && <button onClick={gotoNextPage}>다음</button>}
//       {curPage == pageLen && (
//         <Link to="/completion">
//           <button
//             name="answers"
//             value={answers.join(" ")}
//             disabled={Object.keys(answers).length == data.length ? false : true}
//             onClick={onChange}
//           >
//             다음
//           </button>
//         </Link>
//       )}
//     </>
//   );
// }

// export default TestPage;
