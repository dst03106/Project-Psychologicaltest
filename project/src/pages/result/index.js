import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";
import Chart from "./Chart";

export default function Result() {
  const [report, setReport] = useState({});
  const location = useLocation();
  const { seq } = location?.state?.seq ? location.state : "";

  const reportScores = useMemo(() => {
    if (report?.result?.wonScore) {
      const scores = report.result.wonScore
        .split(" ")
        .filter((val) => val.indexOf("=") !== -1)
        .map((val) => Number(val.substr(val.indexOf("=") + 1)));
      console.log(scores);
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

  const jobsByEdu = useMemo(async () => {
    if (Array.isArray(sortedScoresIndex) && sortedScoresIndex.length === 2) {
      const [no1, no2] = sortedScoresIndex;
      if (no1 && no2) {
        const res = await api.result.getJobsByEdu({ no1, no2 });
        if (res) {
          console.log(res);
          return res;
        }
      }
    }
  }, [sortedScoresIndex]);

  const jobsByMajor = useMemo(async () => {
    if (Array.isArray(sortedScoresIndex) && sortedScoresIndex.length === 2) {
      const [no1, no2] = sortedScoresIndex;
      if (no1 && no2) {
        const res = await api.result.getJobsByMajor({ no1, no2 });
        if (res) {
          console.log(res);
          return res;
        }
      }
    }
  }, [sortedScoresIndex]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <div>
      <h1>직업가치관검사 결과표</h1>
      <Chart scores={reportScores} />
      <Link to="/">
        <button>다시검사하기</button>
      </Link>
    </div>
  );
}
