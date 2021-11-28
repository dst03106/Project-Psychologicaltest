import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";
import Chart from "./Chart";
import Table from "./Table";
import styled from "styled-components";
import { userState } from "../../state/userState";
import { useRecoilState } from "recoil";

const Container = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: auto;
  box-sizing: border-box;
  padding: 28px 24px;
  position: relative;
  margin: 50px auto;
`;

const ChartContainer = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

const TableContainer = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

export default function Result() {
  const [user, setUser] = useRecoilState(userState);
  const [report, setReport] = useState({});
  const [jobsByEdu, setJobsByEdu] = useState();
  const [jobsByMajor, setJobsByMajor] = useState();
  const location = useLocation();
  const { seq } = location?.state?.seq ? location.state : "";
  let today = new Date();
  let todayDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;
  console.log(user);
  const reportScores = useMemo(() => {
    if (report?.result?.wonScore) {
      const scores = report.result.wonScore
        .split(" ")
        .filter((val) => val.indexOf("=") !== -1)
        .map((val) => Number(val.substr(val.indexOf("=") + 1)));
      return scores;
    }
    return [];
  }, [report]);

  const sortedScoresIndex = useMemo(() => {
    let scoresIndex = [];
    if (Array.isArray(reportScores)) {
      let temp = [...reportScores];
      for (let i = 0; i < 2; i++) {
        let max = Math.max.apply(null, temp);
        let maxidx = temp.indexOf(max);
        temp.splice(temp.indexOf(max), 1, null);
        scoresIndex.push(maxidx + 1);
      }
    }
    console.log(scoresIndex);
    return scoresIndex;
  }, [reportScores]);

  const fetchReport = useCallback(async () => {
    const res = await api.result.getReport({ seq });
    console.log(res);
    res && setReport(res);
  }, [seq]);

  const fetchJobsByEdu = useCallback(async () => {
    if (Array.isArray(sortedScoresIndex) && sortedScoresIndex.length === 2) {
      const [no1, no2] = sortedScoresIndex;
      if (no1 && no2) {
        const res = await api.result.getJobsByEdu({ no1, no2 });
        if (res) {
          const field = ["고졸", "대졸", "대학원졸"];
          const fieldSeq = [[1, 2], [3, 4], [5]];
          let temp = [];
          field.forEach((item) => temp.push({ field: item, job: [] }));
          res.forEach((item) => {
            for (let i = 0; i < fieldSeq.length; i++) {
              if (fieldSeq[i].includes(item[2])) {
                temp[i].job.push(item[1]);
              }
            }
          });
          temp = temp.filter((item) => item.job.length);
          temp.forEach((item) => (item.job = item.job.join(" ")));
          setJobsByEdu(temp);
        }
      }
    }
  }, [sortedScoresIndex]);

  const fetchJobsByMajor = useCallback(async () => {
    if (Array.isArray(sortedScoresIndex) && sortedScoresIndex.length === 2) {
      const [no1, no2] = sortedScoresIndex;
      if (no1 && no2) {
        const res = await api.result.getJobsByMajor({ no1, no2 });
        if (res) {
          const field = [
            "계열무관",
            "인문",
            "사회",
            "교육",
            "공학",
            "자연",
            "의학",
            "예체능",
          ];
          const fieldSeq = [...Array(8).keys()];
          let temp = [];
          field.forEach((item) => temp.push({ field: item, job: [] }));
          console.log(temp);
          console.log(res);
          res.forEach((item) => {
            for (let i = 0; i < fieldSeq.length; i++) {
              if (fieldSeq[i] === item[2]) {
                temp[i].job.push(item[1]);
              }
            }
          });
          temp = temp.filter((item) => item.job.length);
          temp.forEach((item) => (item.job = item.job.join(" ")));
          console.log(temp);
          setJobsByMajor(temp);
          console.log(jobsByMajor);
        }
      }
    }
  }, [sortedScoresIndex]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    fetchJobsByEdu();
  }, [fetchJobsByEdu]);

  useEffect(() => {
    fetchJobsByMajor();
  }, [fetchJobsByMajor]);

  const columnData = [
    {
      Header: "분야",
      accessor: "field",
    },
    {
      Header: "직업",
      accessor: "job",
    },
  ];

  const userColumnsData = [
    {
      Header: "이름",
      accessor: "username",
    },
    {
      Header: "성별",
      accessor: "gender",
    },
    {
      Header: "검사일",
      accessor: "date",
    },
  ];
  const userData = useMemo(
    () => [
      {
        username: user.username,
        gender: user.gender,
        today: todayDate,
      },
    ],
    [user]
  );

  const userColumns = useMemo(() => userColumnsData, []);
  const columns = useMemo(() => columnData, [columnData]);
  return (
    <Container>
      <div className="text-center">
        <h1>직업가치관검사 결과표</h1>
        <hr />
        <TableContainer>
          {/* {user && <Table columns={userColumns} data={userData} />} */}
        </TableContainer>
        <ChartContainer>
          <h2>직업가치관결과</h2>
          <Chart scores={reportScores} />
        </ChartContainer>
        <h2>가치관과 관련이 높은 직업</h2>
        <TableContainer>
          <h3>종사자 평균 학력별</h3>
          {jobsByEdu && <Table columns={columns} data={jobsByEdu} />}
          <h3>종사자 평균 전공별</h3>
          {jobsByMajor && <Table columns={columns} data={jobsByMajor} />}
        </TableContainer>
        <Link to="/">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              window.localStorage.removeItem("selectedVal");
              setUser();
            }}
          >
            다시검사하기
          </button>
        </Link>
      </div>
    </Container>
  );
}
