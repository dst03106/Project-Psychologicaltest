import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";
import Chart from "./Chart";
import Table from "./Table";
import styled from "styled-components";
import { userState, userAnswer, userReport } from "../../state";
import { useRecoilState, useRecoilValue } from "recoil";

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
  const answer = useRecoilValue(userAnswer);
  const report = useRecoilValue(userReport);
  const [jobsByEdu, setJobsByEdu] = useState();
  const [jobsByMajor, setJobsByMajor] = useState();
  const location = useLocation();
  const { seq } = location?.state?.seq ? location.state : "";
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
    return scoresIndex;
  }, [reportScores]);

  const fetchJobsByEdu = useCallback(async () => {
    if (Array.isArray(sortedScoresIndex) && sortedScoresIndex.length === 2) {
      const [no1, no2] = sortedScoresIndex;
      if (no1 && no2) {
        const res = await api.result.getJobsByEdu({ no1, no2 });
        if (res) {
          const field = ["??????", "??????", "????????????"];
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
            "????????????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "?????????",
          ];
          const fieldSeq = [...Array(8).keys()];
          let temp = [];
          field.forEach((item) => temp.push({ field: item, job: [] }));
          res.forEach((item) => {
            for (let i = 0; i < fieldSeq.length; i++) {
              if (fieldSeq[i] === item[2]) {
                temp[i].job.push(item[1]);
              }
            }
          });
          temp = temp.filter((item) => item.job.length);
          temp.forEach((item) => (item.job = item.job.join(" ")));
          setJobsByMajor(temp);
        }
      }
    }
  }, [sortedScoresIndex]);

  useEffect(() => {
    fetchJobsByEdu();
  }, [fetchJobsByEdu]);

  useEffect(() => {
    fetchJobsByMajor();
  }, [fetchJobsByMajor]);

  const columnData = [
    {
      Header: "??????",
      accessor: "field",
    },
    {
      Header: "??????",
      accessor: "job",
    },
  ];

  const userColumnsData = [
    {
      Header: "??????",
      accessor: "username",
    },
    {
      Header: "??????",
      accessor: "gender",
    },
    {
      Header: "?????????",
      accessor: "date",
    },
  ];
  const userData = useMemo(
    (date) => [
      {
        username: answer.username,
        gender: answer.gender,
        date: answer.startDtm,
      },
    ],
    [answer.username, answer.gender, answer.startDtm]
  );

  const userColumns = useMemo(() => userColumnsData, [userColumnsData]);
  const columns = useMemo(() => columnData, [columnData]);
  return (
    <Container>
      <div className="text-center">
        <h1>????????????????????? ?????????</h1>
        <hr />
        <TableContainer>
          {user && <Table columns={userColumns} data={userData} />}
        </TableContainer>
        <ChartContainer>
          <h2>?????????????????????</h2>
          <Chart scores={reportScores} />
        </ChartContainer>
        <h2>???????????? ????????? ?????? ??????</h2>
        <TableContainer>
          <h3>????????? ?????? ?????????</h3>
          {jobsByEdu && <Table columns={columns} data={jobsByEdu} />}
          <h3>????????? ?????? ?????????</h3>
          {jobsByMajor && <Table columns={columns} data={jobsByMajor} />}
        </TableContainer>
        <Link to="/">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              window.localStorage.removeItem("selectedVal");
              setUser({
                username: "",
                gender: "",
                startDtm: new Date().getTime(),
              });
            }}
          >
            ??????????????????
          </button>
        </Link>
      </div>
    </Container>
  );
}
